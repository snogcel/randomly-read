const Sequelize = require('sequelize');
const Sentencer = require('sentencer');
const Word = require('./connectors');
const Lexeme = require('./lexeme');

const whitelist = {
  initial: ["CH", "TH", "Y", "Z", "ZH", "DH"],
  medial: ["CH", "HH", "JH", "SH", "TH", "ZH", "DH"],
  final: ["B", "CH", "G", "HH", "JH", "SH", "TH", "W", "Y", "ZH", "DH"]
};

const resolvers = {
    Query: {
        words(_, args, req) {
            let filter = {
              syllables: [1,2,3,4,5]
            };

            // type: ["noun", "verb", "adj", "adv"]

            let typeLimit = 5; // return more obscure results if less than 5 found
            let limit = 1; // default
            let location = "initial"; // default

            const id = req.user.id; // get user id

            // Parse Parameters
            if (typeof args.vowel !== 'undefined' && Array.isArray(args.vowel)) filter.vowel = args.vowel;
            if (typeof args.consonant !== 'undefined' && Array.isArray(args.consonant)) filter.consonant = args.consonant;
            if (typeof args.syllables !== 'undefined' && Array.isArray(args.syllables) && args.syllables.length !== 0) filter.syllables = args.syllables;
            if (typeof args.limit !== 'undefined' && typeof args.limit === 'number') limit = parseInt(args.limit);
            if (typeof args.type !== 'undefined' && Array.isArray(args.type)) filter.type = args.type;
            if (typeof args.subtype !== 'undefined' && Array.isArray(args.subtype)) filter.subtype = args.subtype;

            // Assign Data Source to Query
            if (typeof args.position !== 'undefined' && typeof args.position === 'string') {
                if (args.position === 'initial') location = 'initial'; // maps to 'wordlist_initial'
                if (args.position === 'medial') location = 'medial'; // maps to 'wordlist_medial'
                if (args.position === 'final') location = 'final'; // maps to 'wordlist_final'
            }

            // Randomly select consonant if none provided (prevents massive queries) -- or is this even needed?!?
            if (typeof filter.consonant === "undefined") {
              let defaultConsonants = ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]; // removing "DH" and "ZH" until full blacklist functionality is applied here
              filter.consonant = [defaultConsonants[Math.floor(Math.random()*defaultConsonants.length)]];
            }

            // for cases where a very specific vowel + consonant is being searched
            if (filter.consonant.length === 1 && (typeof filter.vowel !== "undefined" && filter.vowel.length === 1)) {

              // apply filter if whitelist criteria is not met and single consonant is being searched
              if (whitelist[location].indexOf(filter.consonant[0]) === -1) { // if consonant is not in whitelist
                filter.type = ["noun", "verb", "adj", "adv"];
              }

            } else {
              filter.type = ["noun", "verb", "adj", "adv"]; // default filter (returns better words overall)
            }

            // Fetch Query Data
            let fetchData = () => {
              return new Promise((resolve, reject) => {
                  Word[location].findAll({ where: filter, order: Sequelize.literal('rand()'), limit: limit }).then(function(data) {

                      let wordsWithType = [];
                      let queryResult = [];

                      for (let i = 0; i < data.length; i++) {
                        if (data[i].dataValues.type === "noun" || data[i].dataValues.type === "verb" || data[i].dataValues.type === "adv" || data[i].dataValues.type === "adj") {
                          wordsWithType.push(data[i]);
                        }
                      }

                      if (wordsWithType.length >= typeLimit) {
                        queryResult.push(wordsWithType[Math.floor(Math.random()*wordsWithType.length)]);
                      } else {
                        queryResult.push(data[Math.floor(Math.random()*data.length)]);
                      }

                      console.log(wordsWithType.length + " typed results found (" + data.length + " total)");
                      let lexeme = new Lexeme(queryResult, location, id);

                      lexeme.submitPost().then(function(doc) {

                        lexeme.submitViewHistory(doc._id);

                        // TODO - handle empty doc
                        queryResult[0].dataValues.id = doc._id; // mongo id of post
                        queryResult[0].votes = doc.votes;
                        queryResult[0].score = doc.score;

                        lexeme.id = doc._id;
                        lexeme.votes = doc.votes;
                        lexeme.score = doc.score;

                        // console.log(queryResult);

                        console.log(lexeme);

                        resolve(lexeme);

                      }, function(err) { reject(err); });

                  }).catch(function(err) {

                    console.log(err);

                  });

              });
            };

            return fetchData();
        },
        sentences(_, args, req) {
            let filter = {
              syllables: [1,2,3,4,5]
            };
            let limit = 1; // default
            let dataLimit = 250; // fixed to 250 for querying words
            let location = "initial"; // default

            const id = req.user.id; // get user id

            // Default Templates
          /*

              "the {{ noun }} is {{ adjective }}",
              "{{ adjective }} {{ noun }}",
              "{{ an_adjective }} {{ noun }}",
              "{{ an_adjective }} {{ noun_animal }}",


              "the {{ adjective }} {{ noun_artifact }}",
              "the {{ noun }} in {{ noun_location }}",

           */


            let templates = [
              "{{ noun }} is {{ adjective }}",
              "{{ adjective }} {{ noun }}",
              "{{ an_adjective }} {{ noun }}",
            ];


            let templateAnimal = ["{{ an_adjective }} {{ noun_animal }}"];
            let templateArtifact = ["the {{ adjective }} {{ noun_artifact }}", "{{ an_adjective }} {{ noun_artifact }}"];
            let templateLocation = ["{{ noun_location }} is {{ adjective }}"];

            let templateFood = ["the {{ noun_food }} is {{ adjective }}", "{{ an_adjective }} {{ noun_food }}"];
            let templatePerson = ["the {{ noun_person }} is {{ adjective }}", "{{ an_adjective }} {{ noun_person }}"];

            let templateFoodAndPerson = ["{{ noun_person }} with a {{ noun_food }}"]; // find other examples of this?

            // Parse Parameters
            if (typeof args.vowel !== 'undefined' && Array.isArray(args.vowel)) filter.vowel = args.vowel;
            if (typeof args.consonant !== 'undefined' && Array.isArray(args.consonant)) filter.consonant = args.consonant;
            if (typeof args.syllables !== 'undefined' && Array.isArray(args.syllables) && args.syllables.length !== 0) filter.syllables = args.syllables;
            if (typeof args.limit !== 'undefined' && typeof args.limit === 'number') limit = parseInt(args.limit);

            // Apply Default Filter
            filter.type = ["adj", "noun"];
            filter.subtype = ["animal","location","person","food","artifact","all"]; // "artifact","pert"

            // Override Default Templates
            if (typeof args.templates !== 'undefined' && Array.isArray(args.templates)) templates = args.templates;

            // Assign Data Source to Query
            if (typeof args.position !== 'undefined' && typeof args.position === 'string') {
                if (args.position === 'initial') location = 'initial'; // maps to 'wordlist_initial'
                if (args.position === 'medial') location = 'medial'; // maps to 'wordlist_medial'
                if (args.position === 'final') location = 'final'; // maps to 'wordlist_final'
            }

            // Fetch Query Data and Build Sentences
            let buildSentence = () => {
              return new Promise((resolve, reject) => {
                  Word[location].findAll({ where: filter, order: Sequelize.literal('rand()'), limit: dataLimit }).then(function(data) {

                      // TODO - check for empty result

                      let nounData = [];
                      let adjData = [];

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

                          if (data[i].type === 'noun') { // sort nouns
                            noun.push(data[i].lexeme);
                            nounData.push(data[i]); // create parallel nounStack for Lexeme creation
                          }

                          // TODO - remove and return to default Sentencer? leaving out of Lexeme parsing for now.
                          if (filteredNouns.hasOwnProperty(data[i].subtype)) {
                            filteredNouns[data[i].subtype].push(data[i].lexeme);
                          } // sort nouns into subtype

                          // console.log(filteredNounsData);

                          if (data[i].type === 'adj') { // sort adjectives
                            adj.push(data[i].lexeme);
                            adjData.push(data[i]); // create parallel adjStack for Lexeme creation
                          }
                      }

                      console.log("Noun List Length: ", noun.length);
                      console.log("Adjective List Length: ", adj.length);
                      console.log("Filtered animal Length: ", filteredNouns["animal"].length);
                      console.log("Filtered location Length: ", filteredNouns["location"].length);
                      console.log("Filtered person Length: ", filteredNouns["person"].length);
                      console.log("Filtered food Length: ", filteredNouns["food"].length);
                      console.log("Filtered artifact Length: ", filteredNouns["artifact"].length);

                      if (noun.length <= 0 || adj.length <= 0) reject("insufficient nouns and adjectives");

                      if (filteredNouns["food"].length > 0 && filteredNouns["person"].length > 0) templates = templates.concat(templateFoodAndPerson);

                      if (filteredNouns["animal"].length > 0) templates = templates.concat(templateAnimal);
                      if (filteredNouns["location"].length > 0) templates = templates.concat(templateLocation);
                      if (filteredNouns["artifact"].length > 0) templates = templates.concat(templateArtifact);
                      if (filteredNouns["food"].length > 0) templates = templates.concat(templateFood);
                      if (filteredNouns["person"].length > 0 ) templates = templates.concat(templatePerson);

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
                      let queryResult = []; // used for parsing noun / adj data
                      let result = []; // array for holding generated sentence
                      let lexemes = [];
                      let promises = [];

                      for (let i = 0; i < limit; i++) {
                          let template = templates[Math.floor(Math.random()*templates.length)];
                          let sentence = _sentencer.make(template);

                          // format text
                          let text = sentence.split(" ");
                          let textLength = text.length;
                          let formatted = "";

                          for (let i = 0; i < textLength; i++) {

                              let nounIndex = noun.indexOf(text[i]);
                              let adjIndex = adj.indexOf(text[i]);

                              if (nounIndex > -1 || adjIndex > -1) { // if word is in our filtered noun or adjective list...

                                  // create new lexeme
                                  if (nounIndex > -1) queryResult[0] = nounData[nounIndex];
                                  if (adjIndex > -1) queryResult[0] = adjData[adjIndex];

                                  lexemes[i] = new Lexeme(queryResult, location, id);

                                  promises.push(new Promise((resolve, reject) => { lexemes[i].submitPost().then(function (doc) {

                                    lexemes[i].submitViewHistory(doc._id);

                                    lexemes[i].id = doc._id;
                                    lexemes[i].votes = doc.votes;
                                    lexemes[i].score = doc.score;

                                    result[i] = lexemes[i];
                                    resolve();

                                  }, function (err) {

                                    reject(err);

                                  })}));

                                  // submit new post

                                  // add to formatted data array

                                  formatted += '<span>'+text[i]+'</span>';

                              } else {

                                  // format into basic JSON Object

                                  promises.push(new Promise((resolve, reject) => {

                                    let id = text[i] + "_" + Date.now();

                                    let obj = { id: id, lexeme: text[i] };

                                    result[i] = obj;
                                    resolve();

                                  }));

                                  // add to formatted data array

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

                    Promise.all(promises)
                      .then(() => {

                        let obj = { words: result };

                        resolve(obj);

                      })
                      .catch((e) => {
                        // handle errors here
                        console.log(e);
                        reject(e);

                      });

                  }).catch(function(err) {

                    console.log(err);

                  });
              });
            };

            return buildSentence();
        }
    }
};

module.exports = resolvers;
