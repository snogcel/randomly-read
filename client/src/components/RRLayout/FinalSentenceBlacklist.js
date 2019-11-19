const blacklist = {
  "AA": {
    consonants: [
      ["AA","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["D","F","P","R","TH","Y"],
      ["HH","JH","R","T","V","Y"],
      ["AA","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
    ]
  },
  "AE": {
    consonants: [
      ["AE","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["CH","D","JH","N","SH","TH","W","Y"],
      ["CH","D","HH","JH","N","R","SH","TH","V","W","Y","Z"],
      ["B","CH","D","F","G","HH","JH","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
    ]
  },
  "AH": {
    consonants: [
      ["AH","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["HH","L","N","S","W"],
      ["HH","L","N","S"],
      ["HH","L","N","S"],
      ["B","F","HH","JH","L","M","N","P","R","S","V","W","Y"],
    ]
  },
  "AO": {
    consonants: [
      ["AO","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AO","CH","HH","JH","SH","T","V","Y"],
      ["CH","D","HH","JH","K","M","N","P","SH","T","TH","W","Y","Z"],
      ["AO","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","TH","V","W","Y","Z"],
      ["AO","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
    ]
  },
  "AW": {
    consonants: [
      ["AW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["CH","G","JH","K","L","M","R","SH","T","TH","V","W","Y","Z"],
      ["AW","CH","D","F","G","HH","JH","K","L","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
    ]
  },
  "AY": {
    consonants: [
      ["AY","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["CH","D","HH","JH","SH","TH","Y"],
      ["CH","HH","JH","SH","TH","Y","Z"],
      ["B","CH","D","G","HH","JH","K","L","M","P","R","SH","TH","V","W","Y","Z"],
      ["AY","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
    ],
  },
  "EH": {
    consonants: [
      ["EH","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["G","SH","TH","Y"],
      ["CH","D","G","HH","JH","M","R","SH","TH","V","W","Y"],
      ["B","CH","D","F","G","HH","JH","K","L","M","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["EH","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
    ]
  },
  "ER": {
    consonants: [
      ["ER","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["TH","Y"],
      ["R","SH","TH","Y"],
      ["D","HH","JH","K","M","P","R","SH","TH","W","Y","Z"],
      ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
    ],
  },
  "EY": {
    consonants: [
      ["EY","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["HH","JH","TH","Y","Z"],
      ["CH","HH","JH","R","SH","TH","V","Y","Z"],
      ["B","CH","D","F","G","HH","JH","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["EY","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
    ],
  },
  "IH": {
    consonants: [
      ["IH","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["Y"],
      ["HH","TH","W","Y"],
      ["B","G","HH","W","Y"],
      ["B","CH","F","G","HH","JH","K","P","SH","TH","V","W","Y"],
    ]
  },
  "IY": {
    consonants: [
      ["IY","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["HH","Y"],
      ["HH","JH","SH","W","Y","Z"],
      ["B","D","F","G","HH","JH","K","P","SH","V","W","Y","Z"],
      ["B","CH","D","F","G","HH","JH","K","L","M","P","S","SH","T","TH","V","W","Y","Z"],
    ]
  },
  "OW": {
    consonants: [
      ["OW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["JH","SH","W","Y"],
      ["CH","HH","JH","L","R","SH","TH","V","W","Y"],
      ["B","CH","F","G","HH","JH","K","L","M","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["OW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
    ]
  },
  "OY": {
    consonants: [
      ["OY","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["CH","F","HH","L","M","SH","T","TH","W","Y","Z"],
      ["B","CH","D","F","G","HH","JH","K","M","R","S","SH","T","TH","V","W","Y","Z"],
      ["OY","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["OY","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
    ],
  },
  "UH": {
    consonants: [
      ["UH","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["UH","CH","D","F","G","HH","JH","L","M","R","S","TH","V","W","Y","Z"],
      ["UH","B","CH","D","F","G","HH","JH","L","M","N","P","R","S","SH","T","TH","V","Y","Z"],
      ["UH","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["UH","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
    ],
  },
  "UW": {
    consonants: [
      ["UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["UW","G","HH","SH","TH","V","W","Z"],
      ["UW","CH","F","G","HH","JH","R","SH","TH","V","W","Z"],
      ["UW","B","CH","D","F","G","HH","JH","K","L","M","P","R","S","SH","TH","V","W","Y","Z"],
      ["UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
    ]
  }
};

export default blacklist;
