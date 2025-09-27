import request from 'supertest';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from '../../src/graphql/schema';
import { resolvers } from '../../src/graphql/resolvers';
import { createMockContext, getTestUser, getTestWord, getTestRoutine } from '../setup/testSetup';
import { DatabaseManager } from '../../src/config/database';

describe('API Integration Tests - Easy Onset Speech Therapy Platform', () => {
  let app: express.Application;
  let server: ApolloServer;
  let authToken: string;

  beforeAll(async () => {
    // Setup Express app
    app = express();
    app.use(express.json());

    // Setup Apollo Server
    server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => ({
        user: req.user,
        req,
        res: null
      })
    });

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    // Setup database
    const dbManager = DatabaseManager.getInstance();
    await dbManager.connect();

    // Get auth token for testing
    const testUser = await getTestUser('therapist');
    authToken = `Bearer mock-jwt-token-${testUser?.username}`;
  });

  afterAll(async () => {
    await server.stop();
  });

  describe('GraphQL API Integration', () => {
    describe('Word Queries', () => {
      it('should fetch words with phonetic filtering', async () => {
        const query = `
          query GetWords($input: WordQueryInput!) {
            words(input: $input) {
              words {
                id
                lexeme
                consonant
                vowel
                syllables
                position
                type
                score
                upvotePercentage
              }
              totalCount
              hasMore
              queryStats {
                executionTimeMs
                docsExamined
                indexUsed
              }
            }
          }
        `;

        const variables = {
          input: {
            vowel: ['AE'],
            consonant: ['P'],
            syllables: [1, 2],
            position: 'initial',
            limit: 10
          }
        };

        const response = await request(app)
          .post('/graphql')
          .set('Authorization', authToken)
          .send({ query, variables })
          .expect(200);

        expect(response.body.data).toBeDefined();
        expect(response.body.data.words).toBeDefined();
        expect(response.body.data.words.words).toBeInstanceOf(Array);
        expect(response.body.data.words.totalCount).toBeGreaterThanOrEqual(0);
        expect(response.body.data.words.queryStats).toBeDefined();
        expect(response.body.data.words.queryStats.executionTimeMs).toBeGreaterThan(0);
      });

      it('should handle invalid phonetic parameters', async () => {
        const query = `
          query GetWords($input: WordQueryInput!) {
            words(input: $input) {
              words {
                id
                lexeme
              }
            }
          }
        `;

        const variables = {
          input: {
            vowel: ['INVALID_VOWEL'],
            consonant: ['INVALID_CONSONANT']
          }
        };

        const response = await request(app)
          .post('/graphql')
          .set('Authorization', authToken)
          .send({ query, variables });

        expect(response.body.errors).toBeDefined();
        expect(response.body.errors[0].message).toContain('Invalid');
      });

      it('should fetch single word by ID', async () => {
        const testWord = await getTestWord('apple');
        
        const query = `
          query GetWord($id: ID!) {
            word(id: $id) {
              id
              lexeme
              consonant
              vowel
              syllables
              type
              wordsXsensesXsynsets {
                definition
                pos
                lemma
              }
            }
          }
        `;

        const variables = {
          id: testWord?._id.toString()
        };

        const response = await request(app)
          .post('/graphql')
          .set('Authorization', authToken)
          .send({ query, variables })
          .expect(200);

        expect(response.body.data.word).toBeDefined();
        expect(response.body.data.word.lexeme).toBe('apple');
        expect(response.body.data.word.wordsXsensesXsynsets).toBeInstanceOf(Array);
      });

      it('should get random word with filters', async () => {
        const query = `
          query GetRandomWord($input: WordQueryInput!) {
            randomWord(input: $input) {
              id
              lexeme
              consonant
              vowel
              syllables
            }
          }
        `;

        const variables = {
          input: {
            consonant: ['B'],
            syllables: [1],
            type: ['noun']
          }
        };

        const response = await request(app)
          .post('/graphql')
          .set('Authorization', authToken)
          .send({ query, variables })
          .expect(200);

        if (response.body.data.randomWord) {
          expect(response.body.data.randomWord.consonant).toBe('B');
          expect(response.body.data.randomWord.syllables).toBe(1);
        }
      });
    });

    describe('Routine Queries', () => {
      it('should fetch user routines', async () => {
        const query = `
          query GetUserRoutines {
            userRoutines {
              id
              name
              description
              gradeLevel
              isActive
              totalDuration
              stepCount
              subroutine {
                id
                type
                duration
                repetitions
                phoneticConfig {
                  vowels
                  consonants
                  position
                  syllables
                  gradeLevel
                }
                intermissionText
              }
              createdAt
              updatedAt
            }
          }
        `;

        const response = await request(app)
          .post('/graphql')
          .set('Authorization', authToken)
          .send({ query })
          .expect(200);

        expect(response.body.data.userRoutines).toBeInstanceOf(Array);
        
        if (response.body.data.userRoutines.length > 0) {
          const routine = response.body.data.userRoutines[0];
          expect(routine.name).toBeDefined();
          expect(routine.subroutine).toBeInstanceOf(Array);
          expect(routine.totalDuration).toBeGreaterThan(0);
          expect(routine.stepCount).toBeGreaterThan(0);
        }
      });

      it('should create new routine', async () => {
        const mutation = `
          mutation CreateRoutine($input: CreateRoutineInput!) {
            createRoutine(input: $input) {
              id
              name
              description
              gradeLevel
              subroutine {
                type
                duration
                repetitions
                phoneticConfig {
                  vowels
                  consonants
                  position
                  syllables
                  gradeLevel
                }
              }
              isActive
              totalDuration
              stepCount
            }
          }
        `;

        const variables = {
          input: {
            name: 'Test Integration Routine',
            description: 'Created during integration testing',
            gradeLevel: '3-5',
            subroutine: [
              {
                type: 'word_practice',
                duration: 300,
                repetitions: 15,
                phoneticConfig: {
                  vowels: ['AE', 'IY'],
                  consonants: ['B', 'T'],
                  position: 'initial',
                  syllables: [1, 2],
                  gradeLevel: '3-5'
                }
              },
              {
                type: 'sentence_practice',
                duration: 600,
                repetitions: 8,
                phoneticConfig: {
                  vowels: ['AE'],
                  consonants: ['B'],
                  position: 'initial',
                  syllables: [1],
                  gradeLevel: '3-5'
                },
                intermissionText: 'Take a deep breath and relax'
              }
            ],
            assignedUsers: []
          }
        };

        const response = await request(app)
          .post('/graphql')
          .set('Authorization', authToken)
          .send({ mutation, variables })
          .expect(200);

        expect(response.body.data.createRoutine).toBeDefined();
        expect(response.body.data.createRoutine.name).toBe('Test Integration Routine');
        expect(response.body.data.createRoutine.subroutine).toHaveLength(2);
        expect(response.body.data.createRoutine.totalDuration).toBe(900); // 15 minutes total
        expect(response.body.data.createRoutine.stepCount).toBe(2);
      });

      it('should update existing routine', async () => {
        const testRoutine = await getTestRoutine('Beginner Easy Onset');
        
        const mutation = `
          mutation UpdateRoutine($id: ID!, $input: UpdateRoutineInput!) {
            updateRoutine(id: $id, input: $input) {
              id
              name
              description
              isActive
            }
          }
        `;

        const variables = {
          id: testRoutine?._id.toString(),
          input: {
            name: 'Updated Beginner Easy Onset',
            description: 'Updated during integration testing',
            isActive: true
          }
        };

        const response = await request(app)
          .post('/graphql')
          .set('Authorization', authToken)
          .send({ mutation, variables })
          .expect(200);

        expect(response.body.data.updateRoutine).toBeDefined();
        expect(response.body.data.updateRoutine.name).toBe('Updated Beginner Easy Onset');
        expect(response.body.data.updateRoutine.description).toBe('Updated during integration testing');
      });
    });

    describe('Progress Tracking', () => {
      it('should create exercise session', async () => {
        const testRoutine = await getTestRoutine('Beginner Easy Onset');
        
        const mutation = `
          mutation CreateExerciseSession($input: CreateExerciseSessionInput!) {
            createExerciseSession(input: $input) {
              id
              routineId
              sessionId
              totalWords
              completedWords
              accuracy
              completionRate
              duration
              startTime
              notes
            }
          }
        `;

        const variables = {
          input: {
            routineId: testRoutine?._id.toString(),
            sessionId: `integration_test_${Date.now()}`,
            totalWords: 25,
            notes: 'Integration test session'
          }
        };

        const response = await request(app)
          .post('/graphql')
          .set('Authorization', authToken)
          .send({ mutation, variables })
          .expect(200);

        expect(response.body.data.createExerciseSession).toBeDefined();
        expect(response.body.data.createExerciseSession.routineId).toBe(testRoutine?._id.toString());
        expect(response.body.data.createExerciseSession.totalWords).toBe(25);
        expect(response.body.data.createExerciseSession.completedWords).toBe(0);
        expect(response.body.data.createExerciseSession.accuracy).toBe(0);
      });

      it('should add word attempts to session', async () => {
        // First create a session
        const testRoutine = await getTestRoutine('Beginner Easy Onset');
        const createSessionMutation = `
          mutation CreateExerciseSession($input: CreateExerciseSessionInput!) {
            createExerciseSession(input: $input) {
              id
            }
          }
        `;

        const createSessionResponse = await request(app)
          .post('/graphql')
          .set('Authorization', authToken)
          .send({
            query: createSessionMutation,
            variables: {
              input: {
                routineId: testRoutine?._id.toString(),
                sessionId: `word_attempt_test_${Date.now()}`,
                totalWords: 10
              }
            }
          });

        const sessionId = createSessionResponse.body.data.createExerciseSession.id;

        // Then add word attempts
        const addAttemptMutation = `
          mutation AddWordAttempt($sessionId: ID!, $attempt: WordAttemptInput!) {
            addWordAttempt(sessionId: $sessionId, attempt: $attempt) {
              id
              wordsAttempted {
                wordId
                word
                accuracy
                timeSpent
                difficulty
              }
              completedWords
              accuracy
            }
          }
        `;

        const testWord = await getTestWord('apple');
        const variables = {
          sessionId,
          attempt: {
            wordId: testWord?._id.toString(),
            word: 'apple',
            accuracy: 85,
            timeSpent: 3000, // 3 seconds
            difficulty: 2,
            position: 'medial',
            consonant: 'P',
            vowel: 'AE'
          }
        };

        const response = await request(app)
          .post('/graphql')
          .set('Authorization', authToken)
          .send({ mutation: addAttemptMutation, variables })
          .expect(200);

        expect(response.body.data.addWordAttempt).toBeDefined();
        expect(response.body.data.addWordAttempt.wordsAttempted).toHaveLength(1);
        expect(response.body.data.addWordAttempt.wordsAttempted[0].word).toBe('apple');
        expect(response.body.data.addWordAttempt.wordsAttempted[0].accuracy).toBe(85);
        expect(response.body.data.addWordAttempt.completedWords).toBe(1);
      });

      it('should generate fluency report', async () => {
        const testUser = await getTestUser('patient');
        const testRoutine = await getTestRoutine('Beginner Easy Onset');
        
        const query = `
          query GenerateFluencyReport($userId: ID!, $routineId: ID!, $startDate: Date!, $endDate: Date!) {
            fluencyReport(userId: $userId, routineId: $routineId, startDate: $startDate, endDate: $endDate) {
              id
              userId
              routineId
              reportDate
              dateRange {
                start
                end
              }
              totalSessions
              totalWords
              averageAccuracy
              averageSessionDuration
              improvementTrend
              difficultPhonemes {
                consonant
                vowel
                position
                accuracy
                frequency
              }
              recommendations
            }
          }
        `;

        const variables = {
          userId: testUser?._id.toString(),
          routineId: testRoutine?._id.toString(),
          startDate: '2024-01-01T00:00:00.000Z',
          endDate: '2024-01-31T23:59:59.999Z'
        };

        const response = await request(app)
          .post('/graphql')
          .set('Authorization', authToken)
          .send({ query, variables })
          .expect(200);

        expect(response.body.data.fluencyReport).toBeDefined();
        expect(response.body.data.fluencyReport.userId).toBe(testUser?._id.toString());
        expect(response.body.data.fluencyReport.routineId).toBe(testRoutine?._id.toString());
        expect(response.body.data.fluencyReport.dateRange).toBeDefined();
        expect(response.body.data.fluencyReport.recommendations).toBeInstanceOf(Array);
      });
    });

    describe('Word Voting and Interaction', () => {
      it('should allow voting on words', async () => {
        const testWord = await getTestWord('apple');
        
        const mutation = `
          mutation VoteWord($wordId: ID!, $vote: Int!) {
            voteWord(wordId: $wordId, vote: $vote) {
              id
              lexeme
              score
              votes {
                vote
              }
              upvotePercentage
            }
          }
        `;

        const variables = {
          wordId: testWord?._id.toString(),
          vote: 1 // Upvote
        };

        const response = await request(app)
          .post('/graphql')
          .set('Authorization', authToken)
          .send({ mutation, variables })
          .expect(200);

        expect(response.body.data.voteWord).toBeDefined();
        expect(response.body.data.voteWord.lexeme).toBe('apple');
        expect(response.body.data.voteWord.score).toBeGreaterThan(0);
        expect(response.body.data.voteWord.votes).toBeInstanceOf(Array);
      });

      it('should handle vote changes', async () => {
        const testWord = await getTestWord('ball');
        
        const mutation = `
          mutation VoteWord($wordId: ID!, $vote: Int!) {
            voteWord(wordId: $wordId, vote: $vote) {
              id
              score
              votes {
                vote
              }
            }
          }
        `;

        // First vote (upvote)
        let response = await request(app)
          .post('/graphql')
          .set('Authorization', authToken)
          .send({
            mutation,
            variables: { wordId: testWord?._id.toString(), vote: 1 }
          });

        const scoreAfterUpvote = response.body.data.voteWord.score;

        // Change vote (downvote)
        response = await request(app)
          .post('/graphql')
          .set('Authorization', authToken)
          .send({
            mutation,
            variables: { wordId: testWord?._id.toString(), vote: -1 }
          });

        const scoreAfterDownvote = response.body.data.voteWord.score;

        expect(scoreAfterDownvote).toBeLessThan(scoreAfterUpvote);
      });
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle authentication errors', async () => {
      const query = `
        query GetUserRoutines {
          userRoutines {
            id
            name
          }
        }
      `;

      const response = await request(app)
        .post('/graphql')
        .send({ query }); // No auth token

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toContain('Authentication required');
    });

    it('should handle invalid GraphQL syntax', async () => {
      const invalidQuery = `
        query {
          words(input: {
            vowel: ["AE"
          }) {
            words {
              lexeme
            }
          }
        }
      `; // Missing closing bracket

      const response = await request(app)
        .post('/graphql')
        .set('Authorization', authToken)
        .send({ query: invalidQuery });

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toContain('Syntax Error');
    });

    it('should handle non-existent resource queries', async () => {
      const query = `
        query GetWord($id: ID!) {
          word(id: $id) {
            id
            lexeme
          }
        }
      `;

      const variables = {
        id: '507f1f77bcf86cd799999999' // Non-existent ID
      };

      const response = await request(app)
        .post('/graphql')
        .set('Authorization', authToken)
        .send({ query, variables });

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0].message).toContain('not found');
    });

    it('should handle malformed input data', async () => {
      const mutation = `
        mutation CreateRoutine($input: CreateRoutineInput!) {
          createRoutine(input: $input) {
            id
            name
          }
        }
      `;

      const variables = {
        input: {
          // Missing required fields
          description: 'Incomplete routine'
        }
      };

      const response = await request(app)
        .post('/graphql')
        .set('Authorization', authToken)
        .send({ mutation, variables });

      expect(response.body.errors).toBeDefined();
    });
  });

  describe('Performance and Load Testing', () => {
    it('should handle concurrent word queries efficiently', async () => {
      const query = `
        query GetWords($input: WordQueryInput!) {
          words(input: $input) {
            words {
              id
              lexeme
            }
            queryStats {
              executionTimeMs
            }
          }
        }
      `;

      const requests = Array(10).fill(null).map((_, i) => {
        const consonant = String.fromCharCode(65 + (i % 5)); // A, B, C, D, E
        return request(app)
          .post('/graphql')
          .set('Authorization', authToken)
          .send({
            query,
            variables: {
              input: {
                consonant: [consonant],
                limit: 5
              }
            }
          });
      });

      const responses = await Promise.all(requests);

      responses.forEach(response => {
        expect(response.status).toBe(200);
        expect(response.body.data.words).toBeDefined();
        // Each query should complete reasonably quickly
        if (response.body.data.words.queryStats) {
          expect(response.body.data.words.queryStats.executionTimeMs).toBeLessThan(1000);
        }
      });
    });

    it('should handle large result sets with pagination', async () => {
      const query = `
        query GetWords($input: WordQueryInput!) {
          words(input: $input) {
            words {
              id
              lexeme
            }
            totalCount
            hasMore
          }
        }
      `;

      // Request a large number of words
      const response = await request(app)
        .post('/graphql')
        .set('Authorization', authToken)
        .send({
          query,
          variables: {
            input: {
              syllables: [1, 2, 3],
              limit: 100
            }
          }
        })
        .expect(200);

      expect(response.body.data.words).toBeDefined();
      expect(response.body.data.words.totalCount).toBeGreaterThanOrEqual(0);
      
      if (response.body.data.words.totalCount > 100) {
        expect(response.body.data.words.hasMore).toBe(true);
      }
    });
  });

  describe('Data Consistency and Validation', () => {
    it('should maintain data consistency across operations', async () => {
      // Create a routine
      const createMutation = `
        mutation CreateRoutine($input: CreateRoutineInput!) {
          createRoutine(input: $input) {
            id
            name
            stepCount
          }
        }
      `;

      const createResponse = await request(app)
        .post('/graphql')
        .set('Authorization', authToken)
        .send({
          mutation: createMutation,
          variables: {
            input: {
              name: 'Consistency Test Routine',
              subroutine: [
                {
                  type: 'word_practice',
                  duration: 300,
                  repetitions: 10,
                  phoneticConfig: {
                    vowels: ['AE'],
                    consonants: ['B'],
                    position: 'initial',
                    syllables: [1],
                    gradeLevel: 'K-2'
                  }
                }
              ]
            }
          }
        });

      const routineId = createResponse.body.data.createRoutine.id;
      expect(createResponse.body.data.createRoutine.stepCount).toBe(1);

      // Update the routine
      const updateMutation = `
        mutation UpdateRoutine($id: ID!, $input: UpdateRoutineInput!) {
          updateRoutine(id: $id, input: $input) {
            id
            name
            stepCount
          }
        }
      `;

      const updateResponse = await request(app)
        .post('/graphql')
        .set('Authorization', authToken)
        .send({
          mutation: updateMutation,
          variables: {
            id: routineId,
            input: {
              name: 'Updated Consistency Test Routine',
              subroutine: [
                {
                  type: 'word_practice',
                  duration: 300,
                  repetitions: 10,
                  phoneticConfig: {
                    vowels: ['AE'],
                    consonants: ['B'],
                    position: 'initial',
                    syllables: [1],
                    gradeLevel: 'K-2'
                  }
                },
                {
                  type: 'sentence_practice',
                  duration: 600,
                  repetitions: 5,
                  phoneticConfig: {
                    vowels: ['AE'],
                    consonants: ['B'],
                    position: 'initial',
                    syllables: [1],
                    gradeLevel: 'K-2'
                  }
                }
              ]
            }
          }
        });

      expect(updateResponse.body.data.updateRoutine.name).toBe('Updated Consistency Test Routine');
      expect(updateResponse.body.data.updateRoutine.stepCount).toBe(2);

      // Verify the changes persisted
      const fetchQuery = `
        query GetRoutine($id: ID!) {
          routine(id: $id) {
            id
            name
            stepCount
          }
        }
      `;

      const fetchResponse = await request(app)
        .post('/graphql')
        .set('Authorization', authToken)
        .send({
          query: fetchQuery,
          variables: { id: routineId }
        });

      expect(fetchResponse.body.data.routine.name).toBe('Updated Consistency Test Routine');
      expect(fetchResponse.body.data.routine.stepCount).toBe(2);
    });
  });
});