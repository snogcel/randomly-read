import initial_7_word from './initial_7_word.json';
import initial_8_word from './initial_8_word.json';
import initial_9_word from './initial_9_word.json';
import initial_10_word from './initial_10_word.json';
import initial_11_word from './initial_11_word.json';
import initial_12_word from './initial_12_word.json';
import initial_13_word from './initial_13_word.json';
import initial_14_word from './initial_14_word.json';
import initial_15_word from './initial_15_word.json';
import initial_16_word from './initial_16_word.json';
import initial_17_word from './initial_17_word.json';
import initial_18_word from './initial_18_word.json';
import initial_19_word from './initial_19_word.json';
import initial_20_word from './initial_20_word.json';
import initial_21_word from './initial_21_word.json';
import initial_22_word from './initial_22_word.json';

import medial_7_word from './medial_7_word.json';
import medial_8_word from './medial_8_word.json';
import medial_9_word from './medial_9_word.json';
import medial_10_word from './medial_10_word.json';
import medial_11_word from './medial_11_word.json';
import medial_12_word from './medial_12_word.json';
import medial_13_word from './medial_13_word.json';
import medial_14_word from './medial_14_word.json';
import medial_15_word from './medial_15_word.json';
import medial_16_word from './medial_16_word.json';
import medial_17_word from './medial_17_word.json';
import medial_18_word from './medial_18_word.json';
import medial_19_word from './medial_19_word.json';
import medial_20_word from './medial_20_word.json';
import medial_21_word from './medial_21_word.json';
import medial_22_word from './medial_22_word.json';

import final_7_word from './final_7_word.json';
import final_8_word from './final_8_word.json';
import final_9_word from './final_9_word.json';
import final_10_word from './final_10_word.json';
import final_11_word from './final_11_word.json';
import final_12_word from './final_12_word.json';
import final_13_word from './final_13_word.json';
import final_14_word from './final_14_word.json';
import final_15_word from './final_15_word.json';
import final_16_word from './final_16_word.json';
import final_17_word from './final_17_word.json';
import final_18_word from './final_18_word.json';
import final_19_word from './final_19_word.json';
import final_20_word from './final_20_word.json';
import final_21_word from './final_21_word.json';
import final_22_word from './final_22_word.json';

import initial_7_sentence from './initial_7_sentence.json';
import initial_8_sentence from './initial_8_sentence.json';
import initial_9_sentence from './initial_9_sentence.json';
import initial_10_sentence from './initial_10_sentence.json';
import initial_11_sentence from './initial_11_sentence.json';
import initial_12_sentence from './initial_12_sentence.json';
import initial_13_sentence from './initial_13_sentence.json';
import initial_14_sentence from './initial_14_sentence.json';
import initial_15_sentence from './initial_15_sentence.json';
import initial_16_sentence from './initial_16_sentence.json';
import initial_17_sentence from './initial_17_sentence.json';
import initial_18_sentence from './initial_18_sentence.json';
import initial_19_sentence from './initial_19_sentence.json';
import initial_20_sentence from './initial_20_sentence.json';
import initial_21_sentence from './initial_21_sentence.json';
import initial_22_sentence from './initial_22_sentence.json';

import medial_7_sentence from './medial_7_sentence.json';
import medial_8_sentence from './medial_8_sentence.json';
import medial_9_sentence from './medial_9_sentence.json';
import medial_10_sentence from './medial_10_sentence.json';
import medial_11_sentence from './medial_11_sentence.json';
import medial_12_sentence from './medial_12_sentence.json';
import medial_13_sentence from './medial_13_sentence.json';
import medial_14_sentence from './medial_14_sentence.json';
import medial_15_sentence from './medial_15_sentence.json';
import medial_16_sentence from './medial_16_sentence.json';
import medial_17_sentence from './medial_17_sentence.json';
import medial_18_sentence from './medial_18_sentence.json';
import medial_19_sentence from './medial_19_sentence.json';
import medial_20_sentence from './medial_20_sentence.json';
import medial_21_sentence from './medial_21_sentence.json';
import medial_22_sentence from './medial_22_sentence.json';

import final_7_sentence from './final_7_sentence.json';
import final_8_sentence from './final_8_sentence.json';
import final_9_sentence from './final_9_sentence.json';
import final_10_sentence from './final_10_sentence.json';
import final_11_sentence from './final_11_sentence.json';
import final_12_sentence from './final_12_sentence.json';
import final_13_sentence from './final_13_sentence.json';
import final_14_sentence from './final_14_sentence.json';
import final_15_sentence from './final_15_sentence.json';
import final_16_sentence from './final_16_sentence.json';
import final_17_sentence from './final_17_sentence.json';
import final_18_sentence from './final_18_sentence.json';
import final_19_sentence from './final_19_sentence.json';
import final_20_sentence from './final_20_sentence.json';
import final_21_sentence from './final_21_sentence.json';
import final_22_sentence from './final_22_sentence.json';

function getBlacklist(age, mode, position) {

  if (position === "initial") {

    if (mode === "Word") {

      switch (age) {

        case "0":
          return initial_22_word; // consider best blacklist for this...
        case "7":
          return initial_7_word;
        case "8":
          return initial_8_word;
        case "9":
          return initial_9_word;
        case "10":
          return initial_10_word;
        case "11":
          return initial_11_word;
        case "12":
          return initial_12_word;
        case "13":
          return initial_13_word;
        case "14":
          return initial_14_word;
        case "15":
          return initial_15_word;
        case "16":
          return initial_16_word;
        case "17":
          return initial_17_word;
        case "18":
          return initial_18_word;
        case "19":
          return initial_19_word;
        case "20":
          return initial_20_word;
        case "21":
          return initial_21_word;
        case "22":
          return initial_22_word;
        default:
          return initial_22_word; // consider best blacklist for this...

      }

    }
    if (mode === "Sentence") {

      switch (age) {

        case "0":
          return initial_22_sentence; // consider best blacklist for this...
        case "7":
          return initial_7_sentence;
        case "8":
          return initial_8_sentence;
        case "9":
          return initial_9_sentence;
        case "10":
          return initial_10_sentence;
        case "11":
          return initial_11_sentence;
        case "12":
          return initial_12_sentence;
        case "13":
          return initial_13_sentence;
        case "14":
          return initial_14_sentence;
        case "15":
          return initial_15_sentence;
        case "16":
          return initial_16_sentence;
        case "17":
          return initial_17_sentence;
        case "18":
          return initial_18_sentence;
        case "19":
          return initial_19_sentence;
        case "20":
          return initial_20_sentence;
        case "21":
          return initial_21_sentence;
        case "22":
          return initial_22_sentence;
        default:
          return initial_22_sentence; // consider best blacklist for this...

      }

    }

  } else if (position === "medial") {

    if (mode === "Word") {

      switch (age) {

        case "0":
          return medial_22_word; // consider best blacklist for this...
        case "7":
          return medial_7_word;
        case "8":
          return medial_8_word;
        case "9":
          return medial_9_word;
        case "10":
          return medial_10_word;
        case "11":
          return medial_11_word;
        case "12":
          return medial_12_word;
        case "13":
          return medial_13_word;
        case "14":
          return medial_14_word;
        case "15":
          return medial_15_word;
        case "16":
          return medial_16_word;
        case "17":
          return medial_17_word;
        case "18":
          return medial_18_word;
        case "19":
          return medial_19_word;
        case "20":
          return medial_20_word;
        case "21":
          return medial_21_word;
        case "22":
          return medial_22_word;
        default:
          return medial_22_word; // consider best blacklist for this...

      }

    }
    if (mode === "Sentence") {

      switch (age) {

        case "0":
          return medial_22_sentence; // consider best blacklist for this...
        case "7":
          return medial_7_sentence;
        case "8":
          return medial_8_sentence;
        case "9":
          return medial_9_sentence;
        case "10":
          return medial_10_sentence;
        case "11":
          return medial_11_sentence;
        case "12":
          return medial_12_sentence;
        case "13":
          return medial_13_sentence;
        case "14":
          return medial_14_sentence;
        case "15":
          return medial_15_sentence;
        case "16":
          return medial_16_sentence;
        case "17":
          return medial_17_sentence;
        case "18":
          return medial_18_sentence;
        case "19":
          return medial_19_sentence;
        case "20":
          return medial_20_sentence;
        case "21":
          return medial_21_sentence;
        case "22":
          return medial_22_sentence;
        default:
          return medial_22_sentence; // consider best blacklist for this...

      }

    }

  } else if (position === "final") {

    if (mode === "Word") {

      switch (age) {

        case "0":
          return final_22_word; // consider best blacklist for this...
        case "7":
          return final_7_word;
        case "8":
          return final_8_word;
        case "9":
          return final_9_word;
        case "10":
          return final_10_word;
        case "11":
          return final_11_word;
        case "12":
          return final_12_word;
        case "13":
          return final_13_word;
        case "14":
          return final_14_word;
        case "15":
          return final_15_word;
        case "16":
          return final_16_word;
        case "17":
          return final_17_word;
        case "18":
          return final_18_word;
        case "19":
          return final_19_word;
        case "20":
          return final_20_word;
        case "21":
          return final_21_word;
        case "22":
          return final_22_word;
        default:
          return final_22_word; // consider best blacklist for this...

      }

    }
    if (mode === "Sentence") {

      switch (age) {

        case "0":
          return final_22_sentence; // consider best blacklist for this...
        case "7":
          return final_7_sentence;
        case "8":
          return final_8_sentence;
        case "9":
          return final_9_sentence;
        case "10":
          return final_10_sentence;
        case "11":
          return final_11_sentence;
        case "12":
          return final_12_sentence;
        case "13":
          return final_13_sentence;
        case "14":
          return final_14_sentence;
        case "15":
          return final_15_sentence;
        case "16":
          return final_16_sentence;
        case "17":
          return final_17_sentence;
        case "18":
          return final_18_sentence;
        case "19":
          return final_19_sentence;
        case "20":
          return final_20_sentence;
        case "21":
          return final_21_sentence;
        case "22":
          return final_22_sentence;
        default:
          return final_22_sentence; // consider best blacklist for this...

      }

    }

  } else {
    return null;
  }


}

export default getBlacklist;
