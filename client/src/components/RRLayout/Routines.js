const routines = [
  {
    name: "New Custom Routine",
    subroutine: [
      {
        rangeVal:5,
        consonants: null
      }
    ]
  },
  {
    name: "Vowel Specific - ɪ",
    subroutine: [
      {
        rangeVal: 5,
        map: "randomly",
        mode: "Word",
        limit: 1,
        vowels: ["IH"],
        consonants: ["B","D","G","P","T","K"],
        syllables: ["1","2","3","4","5"],
        repetitions: 10
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        rangeVal: 5,
        map: "randomly",
        mode: "Word",
        limit: 1,
        vowels: ["IH"],
        consonants: ["B","D","G","P","T","K"],
        syllables: ["1","2","3","4","5"],
        repetitions: 10
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "Exercise Complete!",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      }
    ]
  },
  {
    name: "Humdronian Exercise",
    subroutine: [
      {
        duration: 25,
        rangeVal: 5,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["EY"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["1"],
        repetitions: 5
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 25,
        rangeVal: 5,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["AO"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["1"],
        repetitions: 5
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 25,
        rangeVal: 5,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["AW"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["1"],
        repetitions: 5
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 25,
        rangeVal: 5,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["AY"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["1"],
        repetitions: 5
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 25,
        rangeVal: 5,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["IH"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["1"],
        repetitions: 5
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 25,
        rangeVal: 5,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["IY"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["1"],
        repetitions: 5
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 25,
        rangeVal: 5,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["OW"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["1"],
        repetitions: 5
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 25,
        rangeVal: 5,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["OY"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["1"],
        repetitions: 5
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 25,
        rangeVal: 5,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["UH"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["1"],
        repetitions: 5
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 25,
        rangeVal: 5,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["UW"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["1"],
        repetitions: 5
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 25,
        rangeVal: 5,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["AA"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["1"],
        repetitions: 5
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 25,
        rangeVal: 5,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["AE"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["1"],
        repetitions: 5
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 25,
        rangeVal: 5,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["AH"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["1"],
        repetitions: 5
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 25,
        rangeVal: 5,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["EH"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["1"],
        repetitions: 5
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 25,
        rangeVal: 5,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["ER"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["1"],
        repetitions: 5
      },
    ]
  },
  {
    name: "Humdronian / Valsalva Transfer Exercise",
    subroutine: [
      {
        duration: 39,
        rangeVal: 13,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["EY"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 39,
        rangeVal: 13,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["AO"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 39,
        rangeVal: 13,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["AW"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 39,
        rangeVal: 13,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["AY"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 39,
        rangeVal: 13,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["IH"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 39,
        rangeVal: 13,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["IY"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 39,
        rangeVal: 13,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["OW"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 39,
        rangeVal: 13,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["OY"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 39,
        rangeVal: 13,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["UH"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 39,
        rangeVal: 13,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["UW"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 39,
        rangeVal: 13,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["AA"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 39,
        rangeVal: 13,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["AE"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 39,
        rangeVal: 13,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["AH"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 39,
        rangeVal: 13,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["EH"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 39,
        rangeVal: 13,
        map: 'randomly',
        mode: 'Word',
        limit: 1,
        vowels: ["ER"],
        consonants: [
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
          ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"]
        ],
        templates: [],
        syllables: ["2"],
        repetitions: 3
      },
    ]
  },
  {
    name: "Modified Humdronian Exercise",
    subroutine: [
      {
        duration: 21,
        rangeVal: 7,
        map: 'default',
        mode: 'Sentence',
        limit: 1,
        vowels: ["EY"],
        consonants: [
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["AA", "AE", "AH", "AO", "AW", "AY", "EH", "ER", "EY", "IH", "IY", "OW", "OY", "UH", "UW"],
        ],
        templates: [],
        syllables: ["1","2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 21,
        rangeVal: 7,
        map: 'default',
        mode: 'Sentence',
        limit: 1,
        vowels: ["AO"],
        consonants: [
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["AA", "AE", "AH", "AO", "AW", "AY", "EH", "ER", "EY", "IH", "IY", "OW", "OY", "UH", "UW"],
        ],
        templates: [],
        syllables: ["1","2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 21,
        rangeVal: 7,
        map: 'default',
        mode: 'Sentence',
        limit: 1,
        vowels: ["AW"],
        consonants: [
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["AA", "AE", "AH", "AO", "AW", "AY", "EH", "ER", "EY", "IH", "IY", "OW", "OY", "UH", "UW"],
        ],
        templates: [],
        syllables: ["1","2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 21,
        rangeVal: 7,
        map: 'default',
        mode: 'Sentence',
        limit: 1,
        vowels: ["AY"],
        consonants: [
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["AA", "AE", "AH", "AO", "AW", "AY", "EH", "ER", "EY", "IH", "IY", "OW", "OY", "UH", "UW"],
        ],
        templates: [],
        syllables: ["1","2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 21,
        rangeVal: 7,
        map: 'default',
        mode: 'Sentence',
        limit: 1,
        vowels: ["IH"],
        consonants: [
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["AA", "AE", "AH", "AO", "AW", "AY", "EH", "ER", "EY", "IH", "IY", "OW", "OY", "UH", "UW"],
        ],
        templates: [],
        syllables: ["1","2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 21,
        rangeVal: 7,
        map: 'default',
        mode: 'Sentence',
        limit: 1,
        vowels: ["IY"],
        consonants: [
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["AA", "AE", "AH", "AO", "AW", "AY", "EH", "ER", "EY", "IH", "IY", "OW", "OY", "UH", "UW"],
        ],
        templates: [],
        syllables: ["1","2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 21,
        rangeVal: 7,
        map: 'default',
        mode: 'Sentence',
        limit: 1,
        vowels: ["OW"],
        consonants: [
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["AA", "AE", "AH", "AO", "AW", "AY", "EH", "ER", "EY", "IH", "IY", "OW", "OY", "UH", "UW"],
        ],
        templates: [],
        syllables: ["1","2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 21,
        rangeVal: 7,
        map: 'default',
        mode: 'Sentence',
        limit: 1,
        vowels: ["OY"],
        consonants: [
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["AA", "AE", "AH", "AO", "AW", "AY", "EH", "ER", "EY", "IH", "IY", "OW", "OY", "UH", "UW"],
        ],
        templates: [],
        syllables: ["1","2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 21,
        rangeVal: 7,
        map: 'default',
        mode: 'Sentence',
        limit: 1,
        vowels: ["UH"],
        consonants: [
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["AA", "AE", "AH", "AO", "AW", "AY", "EH", "ER", "EY", "IH", "IY", "OW", "OY", "UH", "UW"],
        ],
        templates: [],
        syllables: ["1","2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 21,
        rangeVal: 7,
        map: 'default',
        mode: 'Sentence',
        limit: 1,
        vowels: ["UW"],
        consonants: [
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["AA", "AE", "AH", "AO", "AW", "AY", "EH", "ER", "EY", "IH", "IY", "OW", "OY", "UH", "UW"],
        ],
        templates: [],
        syllables: ["1","2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 21,
        rangeVal: 7,
        map: 'default',
        mode: 'Sentence',
        limit: 1,
        vowels: ["AA"],
        consonants: [
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["AA", "AE", "AH", "AO", "AW", "AY", "EH", "ER", "EY", "IH", "IY", "OW", "OY", "UH", "UW"],
        ],
        templates: [],
        syllables: ["1","2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 21,
        rangeVal: 7,
        map: 'default',
        mode: 'Sentence',
        limit: 1,
        vowels: ["AE"],
        consonants: [
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["AA", "AE", "AH", "AO", "AW", "AY", "EH", "ER", "EY", "IH", "IY", "OW", "OY", "UH", "UW"],
        ],
        templates: [],
        syllables: ["1","2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 21,
        rangeVal: 7,
        map: 'default',
        mode: 'Sentence',
        limit: 1,
        vowels: ["AH"],
        consonants: [
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["AA", "AE", "AH", "AO", "AW", "AY", "EH", "ER", "EY", "IH", "IY", "OW", "OY", "UH", "UW"],
        ],
        templates: [],
        syllables: ["1","2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 21,
        rangeVal: 7,
        map: 'default',
        mode: 'Sentence',
        limit: 1,
        vowels: ["EH"],
        consonants: [
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["AA", "AE", "AH", "AO", "AW", "AY", "EH", "ER", "EY", "IH", "IY", "OW", "OY", "UH", "UW"],
        ],
        templates: [],
        syllables: ["1","2"],
        repetitions: 3
      },
      {
        duration: 5,
        rangeVal: 5,
        map: 'intermission',
        intermissionText: "relax",
        mode: 'Intermission',
        limit: 1,
        vowels: [],
        consonants: [],
        templates: [],
        syllables: []
      },
      {
        duration: 21,
        rangeVal: 7,
        map: 'default',
        mode: 'Sentence',
        limit: 1,
        vowels: ["ER"],
        consonants: [
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["CH","F","HH","JH","L","M","N","R","S","SH","TH","V","W","Y","Z"],
          ["AA", "AE", "AH", "AO", "AW", "AY", "EH", "ER", "EY", "IH", "IY", "OW", "OY", "UH", "UW"],
        ],
        templates: [],
        syllables: ["1","2"],
        repetitions: 3
      },
    ]
  }
];

export default routines;
