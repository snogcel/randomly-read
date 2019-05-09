const Sequelize = require('sequelize');
const Sentencer = require('sentencer');

const Post = require('../models/post');

const Word = require('./connectors');

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

                      // TODO - reject if no match found?

                      let category = data[0].dataValues.type;

                      if (data[0].dataValues.type === 'noun') category = 'nouns';
                      if (data[0].dataValues.type === 'verb') category = 'verbs';
                      if (data[0].dataValues.type === 'adj') category = 'adjectives';
                      if (data[0].dataValues.type === 'adv') category = 'adverbs';

                      let title = data[0].dataValues.lexeme;

                      let url = '';

                      let text = '';

                      for (let i = 0; i < data[0].dataValues.wordsXsensesXsynsets.length; i++) {

                        if (category === 'nouns' && data[0].dataValues.wordsXsensesXsynsets[i].dataValues.pos === 'n') {
                          text += data[0].dataValues.wordsXsensesXsynsets[i].dataValues.definition+'. ';
                        }

                        if (category === 'verbs' && data[0].dataValues.wordsXsensesXsynsets[i].dataValues.pos === 'v') {
                          text += data[0].dataValues.wordsXsensesXsynsets[i].dataValues.definition+'. ';
                        }

                        if (category === 'adjectives' && (data[0].dataValues.wordsXsensesXsynsets[i].dataValues.pos === 'a' || data[0].dataValues.wordsXsensesXsynsets[i].dataValues.pos === 's')) {
                          text += data[0].dataValues.wordsXsensesXsynsets[i].dataValues.definition+'. ';
                        }

                        if (category === 'adverbs' && data[0].dataValues.wordsXsensesXsynsets[i].dataValues.pos === 'r') {
                          text += data[0].dataValues.wordsXsensesXsynsets[i].dataValues.definition+'. ';
                        }

                      }

                      let type = 'text';

                      // TODO - get authenticated user ID
                      const author = '5ccf8c65debb7576d5bdd451';

                      Post.create({
                        title,
                        url,
                        author,
                        category,
                        type,
                        text
                      });

                      resolve(data);

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
