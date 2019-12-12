const blacklist = {
  "AA": {
    consonants: [
      ["DH"],
      ["DH"],
      ["DH"],
      ["TH","ZH",],
      ["CH","JH","R","SH","TH","Y","Z","ZH","DH"],
    ]
  },
  "AE": {
    consonants: [
      [],
      ["ZH","DH"],
      ["ZH","DH"],
      ["ZH","DH"],
      ["CH","D","SH","TH","W","Y","Z","ZH","DH"],
    ]
  },
  "AH": {
    consonants: [
      ["ZH"],
      [],
      ["DH"],
      ["ZH","DH"],
      ["CH","JH","SH","TH","W","Y","Z","ZH","DH"],
    ]
  },
  "AO": {
    consonants: [
      ["DH"],
      ["ZH","DH"],
      ["DH"],
      ["CH","TH","Y","Z","ZH","DH"],
      ["CH","D","F","JH","R","S","SH","T","TH","V","Y","Z","ZH","DH"],
    ]
  },
  "AW": {
    consonants: [
      ["Z"],
      ["DH"],
      ["JH","TH","V","W","Z","ZH","DH"],
      ["CH","F","G","HH","JH","M","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["B","CH","D","F","G","HH","JH","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "AY": {
    consonants: [
      ["ZH"],
      ["Y","DH"],
      ["Y","DH"],
      ["CH","SH","Y","ZH","DH"],
      ["CH","F","JH","R","SH","W","Y","Z","ZH","DH"],
    ]
  },
  "EH": {
    consonants: [
      [],
      [],
      [],
      ["ZH","DH"],
      ["SH","Z","ZH","DH"],
    ]
  },
  "ER": {
    consonants: [
      ["R"],
      ["R","DH"],
      ["R","ZH","DH"],
      ["N","R","SH","ZH","DH"],
      ["L","N","R","SH","W","Z","ZH","DH"],
    ]
  },
  "EY": {
    consonants: [
      [],
      ["DH"],
      ["TH","ZH","DH"],
      ["CH","N","V","W","Y","Z","ZH","DH"],
      ["B","CH","D","F","G","HH","JH","L","M","N","S","SH","T","W","Y","Z","ZH","DH"],
    ]
  },
  "IH": {
    consonants: [
      ["ZH"],
      ["DH"],
      ["DH"],
      ["DH"],
      ["CH","G","JH","SH","TH","W","Y","Z","ZH","DH"],
    ]
  },
  "IY": {
    consonants: [
      [],
      [],
      ["ZH","DH"],
      ["G","Y","ZH","DH"],
      ["CH","G","W","Y","ZH","DH"],
    ]
  },
  "OW": {
    consonants: [
      ["ZH"],
      [],
      ["ZH","DH"],
      ["ZH","DH"],
      ["L","SH","T","TH","W","Y","Z","ZH","DH"],
    ]
  },
  "OY": {
    consonants: [
      ["TH","Z","ZH","DH"],
      ["TH","Y","Z","ZH","DH"],
      ["CH","TH","Y","ZH","DH"],
      ["OY","CH","D","F","G","HH","JH","K","L","N","R","S","SH","T","TH","Y","Z","ZH","DH"],
      ["OY","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "UH": {
    consonants: [
      ["CH","TH","V","ZH","DH"],
      ["DH"],
      ["UH","CH","HH","TH","V","Z","ZH","DH"],
      ["UH","CH","D","SH","T","TH","V","Z","ZH","DH"],
      ["UH","B","CH","D","F","HH","L","M","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "UW": {
    consonants: [
      ["ZH"],
      ["ZH","DH"],
      ["TH","ZH","DH"],
      ["SH","TH","W","ZH","DH"],
      ["CH","D","F","K","P","SH","TH","V","W","Z","ZH","DH"],
    ]
  }
};

export default blacklist;
