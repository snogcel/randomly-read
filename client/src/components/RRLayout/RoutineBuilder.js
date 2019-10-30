import Blacklist from './Blacklist';

const RoutineBuilder = function() {

};

RoutineBuilder.prototype._verifyBlacklist = function(vowel, consonant, syllables) {

  let depth = Math.min(...syllables);

  let vowelBlacklist = Blacklist[vowel].consonants[depth - 1];

  if (vowelBlacklist.indexOf(consonant) > -1) {
    return false;
  }

  return true;
};

RoutineBuilder.prototype._buildActionBase = function(exerciseConfig) {
  let actionBase = {
    mode: exerciseConfig.mode,
    vowel: [],
    consonant: [],
    templates: exerciseConfig.templates,
    syllables: exerciseConfig.syllables,
    limit: exerciseConfig.limit
  };

  if (exerciseConfig.intermissionText) actionBase.intermissionText = exerciseConfig.intermissionText;

  return actionBase;
};

RoutineBuilder.prototype._buildCheckpoints = function(exerciseConfig) {
  let checkpoints = [];
  let i = 0;

  while (i < exerciseConfig.duration) {
    checkpoints.push(i);
    i = i + exerciseConfig.rangeVal;
  }

  return checkpoints;
};

RoutineBuilder.prototype.buildIntermission = function(exerciseConfig) {
  let routine = new Map();

  // Generate Action Base
  let actionBase = this._buildActionBase(exerciseConfig);

  // Set Default Action
  let action = JSON.parse(JSON.stringify(actionBase));

  routine.set(0, action);

  return routine;
};

RoutineBuilder.prototype.buildRandomly = function(exerciseConfig) {
  let routine = new Map();

  // Generate Action Base
  let actionBase = this._buildActionBase(exerciseConfig);

  // Define Exercise Checkpoints
  let checkpoints = this._buildCheckpoints(exerciseConfig);

  // Iterate Through Checkpoints
  let j = 0; // vowel iterator
  let k = 0; // consonant iterator

  console.log("building randomly...");

  for (let i = 0; i < checkpoints.length; i++) {

    // Set Default Action
    let action = JSON.parse(JSON.stringify(actionBase));

    // Generate Random Number
    let rand = Math.floor(Math.random() * (exerciseConfig.consonants.length));
    let randVowel = Math.floor(Math.random() * (exerciseConfig.vowels.length));

    let verified = false;

    let consonant = exerciseConfig.consonants[rand]; // Use Random Number
    let vowel = exerciseConfig.vowels[randVowel];

    if (typeof vowel !== "undefined") {

      verified = this._verifyBlacklist(vowel, consonant, exerciseConfig.syllables); // set and verify initial matched word

      while (!verified) {
        rand = Math.floor(Math.random() * (exerciseConfig.consonants.length));
        randVowel = Math.floor(Math.random() * (exerciseConfig.vowels.length));
        consonant = exerciseConfig.consonants[rand];
        vowel = exerciseConfig.vowels[randVowel];
        verified = this._verifyBlacklist(vowel, consonant, exerciseConfig.syllables);
        if (verified) console.log('Word replaced with: ' + consonant + " and " + vowel);
      }

    }

    console.log('Word added with: ' + consonant + " and " + vowel);

    // Set Parameters
    if (typeof consonant !== "undefined") {
      action.consonant.unshift(consonant); // add consonant to array
    } else { action.consonant = []; }

    if (typeof vowel !== "undefined") {
      action.vowel.unshift(vowel); // add vowel to array
    } else { action.vowel = []; }

    // Iterate Vowels and Consonants
    if (k < exerciseConfig.consonants.length - 1) {

      // Logic Applied if Random Selection is active
      if (k < (exerciseConfig.repetitions - 1)) {

        k++; // increment consonant

      } else {

        k = 0; // reset consonant

        // Iterate Vowels
        if (j < exerciseConfig.vowels.length - 1) { j++; } else { j = 0; }

      }

    } else {

      k = 0; // reset consonant

      // Iterate Vowels
      if (j < exerciseConfig.vowels.length - 1) { j++; } else { j = 0; }
    }

    routine.set(checkpoints[i], action);
  }

  return routine;

};

RoutineBuilder.prototype.build = function(exerciseConfig) {
  let routine = new Map();

  // Generate Action Base
  let actionBase = this._buildActionBase(exerciseConfig);

  // Define Exercise Checkpoints
  let checkpoints = this._buildCheckpoints(exerciseConfig);

  // Iterate Through Checkpoints
  let j = 0; // vowel iterator
  let k = 0; // consonant iterator

  for (let i = 0; i < checkpoints.length; i++) {

    // Set Default Action
    let action = JSON.parse(JSON.stringify(actionBase));

    // Set Parameters
    action.consonant = exerciseConfig.consonants; // add all consonants to array
    action.vowel = exerciseConfig.vowels; // add all vowels to array

    routine.set(checkpoints[i], action);
  }

  return routine;

};

export default RoutineBuilder;
