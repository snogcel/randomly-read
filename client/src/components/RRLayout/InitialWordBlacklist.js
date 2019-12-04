const blacklist = {
  "AA": {
    consonants: [
      ["TH","V","Y","Z"],
      ["Y"],
      ["CH","SH","TH","Y","Z"],
      ["CH","JH","R","SH","TH","W","Y","Z"],
      ["B","CH","G","H","JH","L","R","S","SH","TH","V","W","Y","Z"],
    ]
  },
  "AE": {
    consonants: [
      ["TH","V","W","Y","Z"],
      [],
      ["TH","W","Y"],
      ["CH","D","HH","SH","TH","W","Y","Z"],
      ["CH","D","F","G","JH","N","R","SH","TH","V","W","Y","Z"],
    ]
  },
  "AH": {
    consonants: [
      ["CH","L","N","S","T","Z"],
      ["L","N","S","T","Z"],
      ["CH","L","N","S","T","Y","Z"],
      ["CH","JH","L","N","S","SH","T","TH","W","Y","Z"],
      ["B","CH","G","JH","L","N","P","R","S","SH","T","TH","V","W","Y","Z"],
    ]
  },
  "AO": {
    consonants: [
      ["CH","V","Y","Z"],
      ["CH","Z"],
      ["CH","JH","V","Y","Z"],
      ["B","CH","D","G","JH","R","S","SH","T","TH","V","W","Y","Z"],
      ["B","CH","D","F","G","HH","JH","L","N","P","R","S","SH","T","TH","V","W","Y","Z"],
    ]
  },
  "AW": {
    consonants: [
      ["CH","G","HH","JH","M","N","R","SH","T","TH","V","W","Y","Z"],
      ["CH","N","TH","V","W","Y","Z"],
      ["CH","JH","L","M","N","SH","TH","V","W","Y","Z"],
      ["AW","B","CH","D","F","G","HH","JH","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AW","B","CH","D","F","G","HH","JH","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
    ]
  },
  "AY": {
    consonants: [
      ["G","JH","TH","Y","Z"],
      ["Y","Z"],
      ["G","SH","TH","W","Y"],
      ["CH","F","JH","R","SH","TH","W","Y","Z"],
      ["CH","F","JH","K","L","N","P","R","SH","TH","W","Y","Z"],
    ],
  },
  "EH": {
    consonants: [
      ["G","Z"],
      [],
      ["CH","G","SH","Z"],
      ["CH","G","SH","W","Y"],
      ["B","CH","G","L","N","SH","TH","V","W","Y","Z"],
    ]
  },
  "ER": {
    consonants: [
      ["CH","F","G","JH","R","SH","TH","Y","Z"],
      ["R","SH","Z"],
      ["G","L","N","R","SH","T","Y","Z"],
      ["B","CH","F","G","JH","L","N","R","SH","W","Z"],
      ["B","CH","F","G","HH","JH","L","M","N","R","S","SH","T","TH","V","W","Y","Z"],
    ],
  },
  "EY": {
    consonants: [
      ["N","TH","Y","Z"],
      ["TH","Y"],
      ["G","HH","JH","SH","TH","Y","Z"],
      ["CH","D","F","HH","JH","K","L","N","SH","T","TH","V","W","Y","Z"],
      ["B","CH","D","F","G","HH","JH","K","L","M","N","S","SH","T","TH","V","W","Y","Z"],
    ],
  },
  "IH": {
    consonants: [
      ["Y","Z"],
      [],
      ["Y","Z"],
      ["CH","G","JH","TH","W","Y","Z"],
      ["B","CH","F","G","HH","JH","K","P","SH","T","TH","V","W","Y","Z"],
    ]
  },
  "IY": {
    consonants: [
      ["CH","JH","Y","Z"],
      ["Y"],
      ["CH","G","JH","L","SH","Y","Z"],
      ["B","CH","F","G","HH","K","L","SH","T","W","Y","Z"],
      ["B","CH","F","G","HH","K","L","M","N","S","SH","T","V","W","Y","Z"],
    ]
  },
  "OW": {
    consonants: [
      ["F","JH","SH","V","W","Y","Z"],
      ["CH","Y","Z"],
      ["CH","D","G","SH","T","W","Y","Z"],
      ["CH","D","G","JH","S","SH","T","V","W","Y","Z"],
      ["B","CH","D","F","G","JH","L","M","N","R","S","SH","T","V","W","Y","Z"],
    ]
  },
  "OY": {
    consonants: [
      ["OY","CH","D","G","HH","K","L","M","N","SH","T","TH","V","W","Y","Z"],
      ["CH","D","F","G","HH","M","N","R","S","SH","T","TH","W","Y","Z"],
      ["OY","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","TH","W","Y","Z"],
      ["OY","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["OY","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
    ],
  },
  "UH": {
    consonants: [
      ["UH","CH","D","F","G","JH","L","M","N","R","S","SH","T","TH","V","W","Y","Z"],
      ["UH","CH","HH","JH","N","SH","T","TH","V","Y","Z"],
      ["UH","CH","D","G","HH","L","M","R","T","TH","V","W","Z"],
      ["UH","CH","D","F","G","HH","K","L","M","R","S","SH","T","TH","V","W","Z"],
      ["UH","B","CH","D","F","G","HH","JH","L","M","P","R","S","SH","T","TH","V","W","Y","Z"],
    ],
  },
  "UW": {
    consonants: [
      ["UW","CH","JH","TH","V","Z"],
      ["SH","TH","V","Z"],
      ["UW","CH","G","HH","SH","TH","V","W","Z"],
      ["UW","B","CH","G","JH","SH","T","TH","V","W","Z"],
      ["UW","B","CH","D","F","G","JH","K","L","M","N","P","SH","T","TH","V","W","Z"],
    ]
  }
};

export default blacklist;
