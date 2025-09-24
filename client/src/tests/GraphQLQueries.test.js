import { buildQuery } from '../util/api';
import { gql } from '@apollo/client';

describe('GraphQL Query Builder', () => {
  const baseProps = {
    vowel: ['A', 'E'],
    consonant: ['B', 'C'],
    syllables: [1, 2],
    limit: 5,
    position: 'initial',
    age: 'adult'
  };

  describe('Word Queries', () => {
    it('builds word query with vowel and consonant', () => {
      const props = { ...baseProps, mode: 'Word' };
      const query = buildQuery(props);
      
      expect(query).toBeDefined();
      expect(query.kind).toBe('Document');
      
      // Convert query to string to check content
      const queryString = query.loc.source.body;
      expect(queryString).toContain('words');
      expect(queryString).toContain('vowel:');
      expect(queryString).toContain('consonant:');
      expect(queryString).toContain('syllables:');
      expect(queryString).toContain('limit:');
      expect(queryString).toContain('position:');
      expect(queryString).toContain('age:');
      expect(queryString).toContain('lexeme');
    });

    it('builds word query with consonant only', () => {
      const props = { 
        ...baseProps, 
        mode: 'Word',
        vowel: [] 
      };
      const query = buildQuery(props);
      
      expect(query).toBeDefined();
      const queryString = query.loc.source.body;
      expect(queryString).toContain('words');
      expect(queryString).toContain('consonant:');
      expect(queryString).toContain('vowel: []'); // Empty array is still included
    });

    it('builds word query with vowel only', () => {
      const props = { 
        ...baseProps, 
        mode: 'Word',
        consonant: [] 
      };
      const query = buildQuery(props);
      
      expect(query).toBeDefined();
      const queryString = query.loc.source.body;
      expect(queryString).toContain('words');
      expect(queryString).toContain('vowel:');
      expect(queryString).toContain('consonant: []'); // Empty array is still included
    });

    it('builds word query with neither vowel nor consonant', () => {
      const props = { 
        ...baseProps, 
        mode: 'Word',
        vowel: [],
        consonant: [] 
      };
      const query = buildQuery(props);
      
      expect(query).toBeDefined();
      const queryString = query.loc.source.body;
      expect(queryString).toContain('words');
      expect(queryString).toContain('vowel: []'); // Empty arrays are still included
      expect(queryString).toContain('consonant: []');
    });
  });

  describe('Sentence Queries', () => {
    it('builds sentence query with vowel and consonant', () => {
      const props = { ...baseProps, mode: 'Sentence' };
      const query = buildQuery(props);
      
      expect(query).toBeDefined();
      const queryString = query.loc.source.body;
      expect(queryString).toContain('sentences');
      expect(queryString).toContain('words {');
      expect(queryString).toContain('lexeme');
    });

    it('builds sentence query with consonant only', () => {
      const props = { 
        ...baseProps, 
        mode: 'Sentence',
        vowel: [] 
      };
      const query = buildQuery(props);
      
      expect(query).toBeDefined();
      const queryString = query.loc.source.body;
      expect(queryString).toContain('sentences');
      expect(queryString).toContain('consonant:');
      expect(queryString).toContain('vowel: []'); // Empty array is still included
    });

    it('builds sentence query with vowel only', () => {
      const props = { 
        ...baseProps, 
        mode: 'Sentence',
        consonant: [] 
      };
      const query = buildQuery(props);
      
      expect(query).toBeDefined();
      const queryString = query.loc.source.body;
      expect(queryString).toContain('sentences');
      expect(queryString).toContain('vowel:');
      expect(queryString).toContain('consonant: []'); // Empty array is still included
    });

    it('builds sentence query with neither vowel nor consonant', () => {
      const props = { 
        ...baseProps, 
        mode: 'Sentence',
        vowel: [],
        consonant: [] 
      };
      const query = buildQuery(props);
      
      expect(query).toBeDefined();
      const queryString = query.loc.source.body;
      expect(queryString).toContain('sentences');
      expect(queryString).toContain('vowel: []'); // Empty arrays are still included
      expect(queryString).toContain('consonant: []');
    });
  });

  describe('Invalid Modes', () => {
    it('returns null for invalid mode', () => {
      const props = { ...baseProps, mode: 'InvalidMode' };
      const query = buildQuery(props);
      
      expect(query).toBeNull();
    });

    it('returns null for undefined mode', () => {
      const props = { ...baseProps, mode: undefined };
      const query = buildQuery(props);
      
      expect(query).toBeNull();
    });
  });

  describe('Parameter Validation', () => {
    it('handles string arrays correctly', () => {
      const props = {
        vowel: ['A', 'E', 'I'],
        consonant: ['B', 'C', 'D'],
        syllables: [1, 2, 3],
        limit: 10,
        position: 'final',
        age: 'child',
        mode: 'Word'
      };
      
      const query = buildQuery(props);
      expect(query).toBeDefined();
      
      const queryString = query.loc.source.body;
      expect(queryString).toContain('["A","E","I"]');
      expect(queryString).toContain('["B","C","D"]');
      expect(queryString).toContain('[1,2,3]');
      expect(queryString).toContain('limit: 10');
      expect(queryString).toContain('"final"');
      expect(queryString).toContain('"child"');
    });

    it('handles numeric limit parameter', () => {
      const props = { ...baseProps, mode: 'Word', limit: '15' };
      const query = buildQuery(props);
      
      expect(query).toBeDefined();
      const queryString = query.loc.source.body;
      expect(queryString).toContain('limit: 15');
    });
  });
});