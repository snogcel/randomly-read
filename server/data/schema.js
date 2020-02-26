const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;
const resolvers = require('./resolvers');

const typeDefs = `
type Query {
  words(vowel: [String], consonant: [String], type: [String], subtype: [String], syllables: [Int], position: String, age: String, limit: Int): Word
  sentences(templates: [String], vowel: [String], consonant: [String], syllables: [Int], position: String, age: String, limit: Int): Sentence
}

type Word {
  id: String
  cmudict_id: Int
  wordid: Int
  lexeme: String
  consonant: String
  vowel: String
  type: String
  subtype: String
  stress: Int
  syllables: Int
  wordsXsensesXsynsets: [definitions]
  score: Int
  votes: [votes]
}

type votes {
  user: String
  vote: Int
}

type Sentence {  
  words: [Word]
}

type Sentence_old {
  result: String
  formatted: String
  template: String
}

type definitions {
  synsetid: Int
  wordid: Int
  lemma: String
  casedwordid: Int
  senseid: Int
  sensenum: Int
  lexid: Int
  tagcount: Int
  sensekey: String
  pos: String
  lexdomainid: Int
  definition: String
}`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
