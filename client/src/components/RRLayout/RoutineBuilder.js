import getBlacklist from '../../util/blacklists'

const RoutineBuilder = function() {

};

RoutineBuilder.prototype._verifyBlacklist = function(vowel, consonant, exerciseConfig) {

  let age = exerciseConfig.age;
  let syllables = exerciseConfig.syllables;
  let mode = exerciseConfig.mode;
  let position = exerciseConfig.position;
  // let vowels = exerciseConfig.vowels;

  let result = [];

  if (exerciseConfig.vowels.indexOf(consonant) > -1) { // if consonant is a vowel...
    if (consonant !== vowel) return false; // if consonant and vowel are not the same, return false
  }

  let blacklist = getBlacklist(age, mode, position);

  if (syllables.length === 0) syllables = [1, 2, 3, 4, 5];

  // determine overlap
  for (let j = 0; j < syllables.length; j++) {

    if (j === 0) { // for first iteration, include full array
      result = blacklist[vowel].consonants[(syllables[j] - 1)];
    } else { // find intersection of arrays
      result = result.filter(function(value) {
        return blacklist[vowel].consonants[(syllables[j] - 1)].indexOf(value) > -1;
      });
    }
  }

  if (result.indexOf(consonant) > -1) {
    return false;
  }

  return true;
};

RoutineBuilder.prototype._buildActionBase = function(exerciseConfig) {
  let actionBase = {
    age: exerciseConfig.age,
    mode: exerciseConfig.mode,
    vowel: [],
    consonant: [],
    templates: exerciseConfig.templates,
    syllables: exerciseConfig.syllables,
    limit: exerciseConfig.limit,
    position: exerciseConfig.position
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

  // console.log("Exercise Config: ", exerciseConfig);

  // Generate Action Base
  let actionBase = this._buildActionBase(exerciseConfig);

  // Define Exercise Checkpoints
  let checkpoints = this._buildCheckpoints(exerciseConfig);

  // Iterate Through Checkpoints
  let j = 0; // vowel iterator
  let k = 0; // consonant iterator

  // console.log("building randomly...");

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

      if ((exerciseConfig.consonants.length === 1 && exerciseConfig.vowels.length === 1)) {
        // console.log("-blacklist bypassed-");
        verified = true; // bypass blacklist if one vowel and one consonant have been provided (assumes system generated routine)
      } else {
        verified = this._verifyBlacklist(vowel, consonant, exerciseConfig); // set and verify initial matched word
      }

      while (!verified) {
        rand = Math.floor(Math.random() * (exerciseConfig.consonants.length));
        randVowel = Math.floor(Math.random() * (exerciseConfig.vowels.length));
        consonant = exerciseConfig.consonants[rand];
        vowel = exerciseConfig.vowels[randVowel];
        verified = this._verifyBlacklist(vowel, consonant, exerciseConfig);

        // if (verified) console.log('Word replaced with: ' + consonant + " and " + vowel);
      }

    }

    // console.log('Word added with: ' + consonant + " and " + vowel);

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
