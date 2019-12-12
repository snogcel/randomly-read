const blacklist = {
  "AA": {
    consonants: [
      ["HH","W"],
      ["HH","W","Y","DH"],
      ["HH","Y","DH"],
      ["B","F","G","P","SH","T","TH","W","Y","ZH","DH"],
      ["B","CH","D","F","G","HH","JH","K","N","P","SH","T","TH","W","Y","Z","ZH","DH"],
    ]
  },
  "AE": {
    consonants: [
      ["HH","W","Y","ZH"],
      ["HH","V","W","Y","ZH","DH"],
      ["HH","JH","R","W","Y","ZH","DH"],
      ["AE","G","HH","JH","P","R","SH","V","W","Y","ZH","DH"],
      ["AE","B","CH","D","G","HH","JH","M","N","P","R","SH","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "AH": {
    consonants: [
      ["W","Y","ZH"],
      ["Y","ZH"],
      ["DH"],
      ["CH","F","DH"],
      ["CH","HH","TH","W","ZH","DH"],
    ]
  },
  "AO": {
    consonants: [
      ["W","Y","ZH"],
      ["HH","W","Y","ZH","DH"],
      ["CH","HH","W","ZH","DH"],
      ["B","CH","HH","JH","SH","TH","W","Y","ZH","DH"],
      ["AO","B","CH","D","F","G","HH","JH","K","L","M","N","P","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "AW": {
    consonants: [
      ["HH","P","V","Y","ZH","DH"],
      ["CH","HH","JH","P","V","W","Y","ZH","DH"],
      ["F","G","HH","JH","K","P","SH","V","W","Y","ZH","DH"],
      ["B","CH","F","G","HH","JH","K","L","M","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["AW","B","CH","D","F","G","HH","JH","K","L","M","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "AY": {
    consonants: [
      ["HH","W","Y","ZH"],
      ["CH","W","Y","ZH"],
      ["CH","HH","JH","SH","TH","W","Y","ZH","DH"],
      ["CH","F","G","HH","JH","L","M","R","SH","TH","V","Y","ZH","DH"],
      ["B","CH","F","G","HH","JH","K","L","M","P","R","S","SH","T","TH","V","W","Y","ZH","DH"],
    ]
  },
  "EH": {
    consonants: [
      ["HH","Y","ZH","DH"],
      ["W","Y","ZH","DH"],
      ["CH","G","HH","W","Y","DH"],
      ["B","CH","F","G","HH","JH","P","SH","TH","W","Y","ZH","DH"],
      ["B","CH","D","F","G","HH","JH","K","M","N","P","S","SH","TH","W","Y","ZH","DH"],
    ]
  },
  "ER": {
    consonants: [
      ["HH","R","W","Y","ZH","DH"],
      ["HH","W","ZH","DH"],
      ["B","CH","HH","L","R","SH","W","Y","ZH","DH"],
      ["B","HH","JH","SH","TH","Y","DH"],
      ["B","CH","HH","JH","K","M","N","P","R","SH","TH","W","Y","DH"],
    ]
  },
  "EY": {
    consonants: [
      ["W"],
      ["HH","SH","ZH"],
      ["B","F","HH","SH","W","Y","ZH","DH"],
      ["B","D","G","HH","JH","K","SH","TH","V","W","Y","ZH","DH"],
      ["B","CH","D","F","G","HH","JH","K","M","P","R","SH","TH","V","W","Y","ZH","DH"],
    ]
  },
  "IH": {
    consonants: [
      ["HH","Y","ZH"],
      ["W","ZH"],
      ["B","W","Y","ZH","DH"],
      ["B","F","G","HH","W","Y","ZH","DH"],
      ["B","CH","F","G","HH","L","SH","TH","W","Y","ZH","DH"],
    ]
  },
  "IY": {
    consonants: [
      ["Y","ZH"],
      ["W","Y","DH"],
      ["G","W","Y","ZH","DH"],
      ["B","G","HH","P","SH","TH","W","Y","ZH","DH"],
      ["B","D","G","HH","S","SH","V","W","Y","ZH","DH"],
    ]
  },
  "OW": {
    consonants: [
      ["Y","ZH"],
      ["W","Y","DH"],
      ["G","W","Y","ZH","DH"],
      ["B","G","HH","P","SH","TH","W","Y","ZH","DH"],
      ["B","D","G","HH","S","SH","V","W","Y","ZH","DH"],
    ]
  },
  "OY": {
    consonants: [
      ["B","HH","P","TH","V","W","Y","ZH","DH"],
      ["B","F","HH","JH","M","P","SH","V","W","Y","ZH","DH"],
      ["B","CH","F","G","HH","JH","K","P","R","SH","TH","V","W","Y","ZH","DH"],
      ["B","CH","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["OY","B","CH","F","G","HH","JH","K","L","M","N","P","R","S","SH","TH","V","W","Y","ZH","DH"],
    ]
  },
  "UH": {
    consonants: [
      ["B","G","HH","JH","M","N","V","W","Y","ZH","DH"],
      ["B","CH","HH","JH","P","V","W","Y","ZH","DH"],
      ["B","CH","G","HH","JH","M","N","P","TH","V","Y","ZH","DH"],
      ["UH","B","CH","F","G","HH","JH","L","M","N","P","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["UH","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "UW": {
    consonants: [
      [],
      ["CH","G","HH","W","ZH","DH"],
      ["B","CH","G","SH","Y","ZH","DH"],
      ["B","CH","F","G","HH","JH","K","M","P","SH","TH","V","W","Y","ZH","DH"],
      ["UW","B","CH","F","G","HH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  }
};

export default blacklist;
