const blacklist = {
  "AA": {
    consonants: [
      ["B","F","G","HH","L","W","Y","ZH","DH"],
      ["B","CH","F","G","HH","JH","K","P","S","TH","V","W","Y","Z","ZH","DH"],
      ["B","CH","F","G","HH","JH","L","N","P","SH","TH","W","Y","ZH","DH"],
      ["B","CH","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["AA","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "AE": {
    consonants: [
      ["CH","HH","JH","L","R","TH","V","W","Y","Z","ZH","DH"],
      ["F","HH","JH","R","TH","V","W","Y","Z","ZH","DH"],
      ["AE","B","CH","G","HH","JH","L","M","N","P","R","TH","V","W","Y","Z","ZH","DH"],
      ["AE","B","CH","D","F","G","HH","JH","L","M","N","P","R","S","TH","V","W","Y","Z","ZH","DH"],
      ["AE","B","CH","D","F","G","HH","JH","L","M","N","P","R","S","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "AH": {
    consonants: [
      ["HH","JH","R","W","Y","Z","ZH","DH"],
      ["CH","G","HH","R","SH","Y","Z","ZH","DH"],
      ["CH","F","G","HH","JH","P","W","Z","ZH","DH"],
      ["B","CH","F","G","HH","JH","P","R","TH","V","Z","ZH","DH"],
      ["AH","B","CH","D","F","G","HH","JH","K","M","P","R","SH","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "AO": {
    consonants: [
      ["B","HH","JH","P","SH","W","Y","Z","ZH","DH"],
      ["B","CH","F","G","HH","JH","P","SH","TH","V","W","Y","Z","ZH","DH"],
      ["AO","B","CH","F","HH","JH","K","P","R","S","SH","TH","V","W","Y","Z","ZH","DH"],
      ["B","CH","D","F","G","HH","JH","K","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["AO","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "AW": {
    consonants: [
      ["B","CH","F","G","HH","JH","K","M","P","S","SH","V","W","Y","Z","ZH","DH"],
      ["B","CH","F","G","HH","JH","K","M","P","R","SH","TH","V","W","Y","Z","ZH","DH"],
      ["AW","B","CH","F","G","HH","JH","K","L","M","N","P","R","S","SH","TH","V","W","Y","Z","ZH","DH"],
      ["AW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["AW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "AY": {
    consonants: [
      ["B","CH","G","HH","JH","SH","W","Y","ZH"],
      ["B","CH","F","G","HH","JH","S","SH","TH","W","Y","ZH","DH"],
      ["B","CH","F","G","HH","JH","S","SH","TH","V","W","Y","ZH","DH"],
      ["AY","B","CH","F","G","HH","JH","K","L","M","R","S","SH","TH","V","W","Y","Z","ZH","DH"],
      ["AY","B","CH","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "EH": {
    consonants: [
      ["B","G","HH","JH","M","Z","ZH","DH"],
      ["B","F","HH","JH","M","P","SH","TH","V","W","Y","ZH","DH"],
      ["B","CH","F","G","HH","JH","L","P","SH","TH","V","W","Y","Z","ZH","DH"],
      ["B","CH","D","F","G","HH","JH","K","L","M","N","P","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["EH","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "ER": {
    consonants: [
      ["B","F","G","HH","JH","L","P","R","SH","V","W","Y","Z","ZH","DH"],
      ["CH","F","G","HH","JH","K","L","P","R","SH","TH","V","W","Y","ZH","DH"],
      ["B","CH","F","G","HH","JH","K","L","M","P","R","S","SH","TH","V","W","Y","Z","ZH","DH"],
      ["B","CH","F","HH","JH","K","M","P","R","S","SH","TH","V","W","Y","Z","ZH","DH"],
      ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "EY": {
    consonants: [
      ["B","CH","HH","R","S","SH","TH","W","Y","DH"],
      ["B","CH","F","G","HH","R","S","SH","W","Y","ZH","DH"],
      ["B","CH","F","G","HH","JH","K","L","M","P","R","SH","TH","V","W","Y","ZH","DH"],
      ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","TH","V","W","Y","Z","ZH","DH"],
      ["EY","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "IH": {
    consonants: [
      ["HH","JH"],
      ["B","F","HH","JH","M","P","TH","W","Y","Z","ZH","DH"],
      ["B","CH","F","G","HH","M","P","W","Y","Z","ZH","DH"],
      ["B","CH","F","G","HH","L","M","P","R","SH","W","Y","Z","ZH","DH"],
      ["IH","B","CH","D","F","G","HH","JH","L","M","P","R","S","SH","TH","W","Y","Z","ZH","DH"],
    ]
  },
  "IY": {
    consonants: [
      ["B","G","HH","R","S","SH","TH","V","W","Y","Z","ZH","DH"],
      ["B","CH","F","G","HH","JH","R","SH","W","Y","ZH","DH"],
      ["B","CH","F","G","HH","JH","K","L","M","P","R","SH","W","Y","ZH","DH"],
      ["B","CH","D","F","G","HH","JH","K","L","M","P","SH","T","TH","V","W","Y","ZH","DH"],
      ["B","CH","D","F","G","HH","JH","K","L","M","P","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "OW": {
    consonants: [
      ["B","CH","F","G","HH","JH","P","R","SH","V","W","Y","ZH","DH"],
      ["B","CH","F","G","HH","JH","M","P","R","SH","TH","V","W","Y","Z","ZH","DH"],
      ["B","CH","F","G","HH","JH","K","L","P","R","SH","TH","V","W","Y","Z","ZH","DH"],
      ["B","CH","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["OW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "OY": {
    consonants: [
      ["B","CH","F","G","HH","JH","K","L","M","N","P","R","SH","TH","V","W","Y","Z","ZH","DH"],
      ["OY","B","CH","F","G","HH","JH","K","L","M","N","P","R","S","SH","TH","V","W","Y","Z","ZH","DH"],
      ["OY","B","CH","F","G","HH","JH","K","L","M","N","P","R","S","SH","TH","V","W","Y","Z","ZH","DH"],
      ["OY","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["OY","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "UH": {
    consonants: [
      ["UH","B","F","G","HH","JH","K","M","N","P","S","TH","V","W","Y","Z","ZH","DH"],
      ["UH","B","CH","F","G","HH","JH","L","M","N","P","S","SH","TH","V","W","Y","Z","ZH","DH"],
      ["UH","B","CH","F","G","HH","JH","K","L","M","N","P","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["UH","B","CH","D","F","G","HH","JH","K","L","M","N","P","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["UH","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "UW": {
    consonants: [
      ["B","CH","G","HH","K","R","SH","TH","V","W","Y","Z","ZH"],
      ["B","CH","G","HH","JH","K","P","R","SH","V","W","Y","Z","ZH","DH"],
      ["B","CH","G","HH","JH","K","M","P","R","S","SH","TH","V","W","Y","Z","ZH","DH"],
      ["UW","B","CH","F","G","HH","JH","K","L","M","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  }
};

export default blacklist;
