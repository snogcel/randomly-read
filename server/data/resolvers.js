const Sequelize = require('sequelize');
const Sentencer = require('sentencer');
const Word = require('./connectors');
const Lexeme = require('./lexeme');

const resolvers = {
    Query: {
        words(_, args) {
            let filter = {};
            let limit = 1; // default
            let location = "initial"; // default

            // Parse Parameters
            if (typeof args.vowel !== 'undefined' && Array.isArray(args.vowel)) filter.vowel = args.vowel;
            if (typeof args.consonant !== 'undefined' && Array.isArray(args.consonant)) filter.consonant = args.consonant;
            if (typeof args.syllables !== 'undefined' && Array.isArray(args.syllables)) filter.syllables = args.syllables;
            if (typeof args.limit !== 'undefined' && typeof args.limit === 'number') limit = parseInt(args.limit);
            if (typeof args.type !== 'undefined' && Array.isArray(args.type)) filter.type = args.type;
            if (typeof args.subtype !== 'undefined' && Array.isArray(args.subtype)) filter.subtype = args.subtype;

            // Assign Data Source to Query
            if (typeof args.location !== 'undefined' && typeof args.location === 'string') {
                if (args.location === 'initial') location = 'initial'; // maps to 'wordlist_initial'
                if (args.location === 'medial') location = 'medial'; // maps to 'wordlist_medial'
                if (args.location === 'final') location = 'final'; // maps to 'wordlist_final'
            }

            // Fetch Query Data
            let fetchData = () => {
              return new Promise((resolve, reject) => {
                  Word[location].findAll({ where: filter, order: Sequelize.literal('rand()'), limit: limit, include: [{ model: Word['wordsXsensesXsynsets'], as: 'wordsXsensesXsynsets'}]}).then(function(data) {

                      let queryResult = data;

                      let lexeme = new Lexeme(queryResult);

                      lexeme.submitPost().then(function(doc) {
                        console.log(doc);
                        resolve(queryResult);
                      }, function(err) { reject(err); });

                  });
              });
            };

            return fetchData();
        },
        sentences(_, args) {
            let filter = {};
            let limit = 1; // default
            let dataLimit = 250; // fixed to 250 for querying words
            let location = "initial"; // default

            // Default Templates
            let templates = [
                "{{ adjective }} {{ noun }} has {{ an_adjective }} {{ noun }}",
                "{{ noun }} goes to {{ an_adjective }} {{ noun }}",
                "{{ an_adjective }} {{ noun }} is {{ adjective }}",
                "{{ noun }} is {{ an_adjective }} {{ noun }}",
            ];

            // Parse Parameters
            if (typeof args.vowel !== 'undefined' && Array.isArray(args.vowel)) filter.vowel = args.vowel;
            if (typeof args.consonant !== 'undefined' && Array.isArray(args.consonant)) filter.consonant = args.consonant;
            if (typeof args.syllables !== 'undefined' && Array.isArray(args.syllables)) filter.syllables = args.syllables;
            if (typeof args.limit !== 'undefined' && typeof args.limit === 'number') limit = parseInt(args.limit);

            // Apply Default Filter
            filter.type = ["adj", "noun"];
            filter.subtype = ["animal","location","person","food","artifact","all"]; // "artifact","pert"

            // Override Default Templates
            if (typeof args.templates !== 'undefined' && Array.isArray(args.templates)) templates = args.templates;

            // Assign Data Source to Query
            if (typeof args.location !== 'undefined' && typeof args.location === 'string') {
                if (args.location === 'initial') location = 'initial'; // maps to 'wordlist_initial'
                if (args.location === 'medial') location = 'medial'; // maps to 'wordlist_medial'
                if (args.location === 'final') location = 'final'; // maps to 'wordlist_final'
            }

            // Fetch Query Data and Build Sentences
            let buildSentence = () => {
              return new Promise((resolve, reject) => {

                  Word[location].findAll({ where: filter, order: Sequelize.literal('rand()'), limit: dataLimit }).then(function(data) {

                      let noun = [];
                      let filteredNouns = {
                          animal: [],
                          location: [],
                          person: [],
                          food: [],
                          artifact: []
                      };
                      let adj = [];

                      // populate noun and adjective arrays for Sentencer
                      for (let i = 0; i < data.length; i++) {
                          if (data[i].type === 'noun') noun.push(data[i].lexeme); // sort nouns
                          if (filteredNouns.hasOwnProperty(data[i].subtype)) filteredNouns[data[i].subtype].push(data[i].lexeme); // sort nouns into subtype
                          if (data[i].type === 'adj') adj.push(data[i].lexeme);
                      }

                      // create new instance of Sentencer
                      let _sentencer = Sentencer;

                      // apply filtered nouns and adjectives
                      _sentencer.configure({
                          nounList: noun,
                          filteredNounList: filteredNouns,
                          adjectiveList: adj
                      });

                      // generate sentences
                      let sentences = [];

                      for (let i = 0; i < limit; i++) {
                          let template = templates[Math.floor(Math.random()*templates.length)];
                          let sentence = _sentencer.make(template);

                          // format text
                          let text = sentence.split(" ");
                          let textLength = text.length;
                          let formatted = "";
                          for (let i = 0; i < textLength; i++) {
                              if (noun.indexOf(text[i]) > -1 || adj.indexOf(text[i]) > -1) { // if word is in our filtered noun or adjective list...
                                  formatted += '<span>'+text[i]+'</span>';
                              } else {
                                  formatted += text[i];
                              }
                              if (i !== (textLength-1)) formatted += ' ';
                          }

                          sentences.push({
                              result: sentence,
                              formatted: formatted,
                              template: template
                          });
                      }

                      resolve(sentences);

                  });
              });
            };

            return buildSentence();
        }
    }
};

module.exports = resolvers;
