const blacklist = {
  "AA": {
    consonants: [
      ["HH","W","Y"],
      ["HH","W","Y","DH"],
      ["HH","Y","DH","SH","W"],
      ["B","F","G","P","SH","T","TH","W","Y","ZH","DH","CH","HH","JH"],
      ["B","CH","D","F","G","HH","JH","K","N","P","SH","T","TH","W","Y","Z","ZH","DH","AA","L","M","R","S","V"],
    ]
  },
  "AE": {
    consonants: [
      ["HH","W","Y","ZH","DH"],
      ["HH","V","W","Y","ZH","DH","JH","R"],
      ["HH","JH","R","W","Y","ZH","DH","V"],
      ["AE","G","HH","JH","P","R","SH","V","W","Y","ZH","DH","B","CH","L","TH"],
      ["AE","B","CH","D","G","HH","JH","M","N","P","R","SH","TH","V","W","Y","Z","ZH","DH","F","L","T"],
    ]
  },
  "AH": {
    consonants: [
      ["W","Y","ZH","R","DH"],
      ["Y","ZH","HH","DH"],
      ["DH"],
      ["CH","F","DH","HH","JH","TH"],
      ["CH","HH","TH","W","ZH","DH","F","G","JH","P","V","Y"],
    ]
  },
  "AO": {
    consonants: [
      ["W","Y","ZH","HH","DH"],
      ["HH","W","Y","ZH","DH","CH"],
      ["CH","HH","W","ZH","DH","JH","Y"],
      ["B","CH","HH","JH","SH","TH","W","Y","ZH","DH","D","F","G","K","S","T","V","Z"],
      ["AO","B","CH","D","F","G","HH","JH","K","L","M","N","P","S","SH","T","TH","V","W","Y","Z","ZH","DH","R"],
    ]
  },
  "AW": {
    consonants: [
      ["HH","P","V","Y","ZH","DH","F","G","W"],
      ["CH","HH","JH","P","V","W","Y","ZH","DH","G","SH"],
      ["F","G","HH","JH","K","P","SH","V","W","Y","ZH","DH","B","CH","L","TH"],
      ["B","CH","F","G","HH","JH","K","L","M","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH","AW","D","N"],
      ["AW","B","CH","D","F","G","HH","JH","K","L","M","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH","N"],
    ]
  },
  "AY": {
    consonants: [
      ["HH","W","Y","ZH"],
      ["CH","W","Y","ZH","HH","SH","TH","DH"],
      ["CH","HH","JH","SH","TH","W","Y","ZH","DH","G"],
      ["CH","F","G","HH","JH","L","M","R","SH","TH","V","Y","ZH","DH","B","W"],
      ["B","CH","F","G","HH","JH","K","L","M","P","R","S","SH","T","TH","V","W","Y","ZH","DH","N"],
    ]
  },
  "EH": {
    consonants: [
      ["HH","Y","ZH","DH","W"],
      ["W","Y","ZH","DH","HH"],
      ["CH","G","HH","W","Y","DH","B","ZH"],
      ["B","CH","F","G","HH","JH","P","SH","TH","W","Y","ZH","DH","M"],
      ["B","CH","D","F","G","HH","JH","K","M","N","P","S","SH","TH","W","Y","ZH","DH","EH","V","Z"],
    ]
  },
  "ER": {
    consonants: [
      ["HH","R","W","Y","ZH","DH"],
      ["HH","W","ZH","DH","SH","Y"],
      ["B","CH","HH","L","R","SH","W","Y","ZH","DH","P"],
      ["B","HH","JH","SH","TH","Y","DH","F","P","R","V","W","ZH"],
      ["B","CH","HH","JH","K","M","N","P","R","SH","TH","W","Y","DH","F","G","L","S","V","ZH"],
    ]
  },
  "EY": {
    consonants: [
      ["W","HH","SH","Y","ZH"],
      ["HH","SH","ZH","B","TH","W","DH"],
      ["B","F","HH","SH","W","Y","ZH","DH","CH","G","P","TH"],
      ["B","D","G","HH","JH","K","SH","TH","V","W","Y","ZH","DH","CH","F","M","R"],
      ["B","CH","D","F","G","HH","JH","K","M","P","R","SH","TH","V","W","Y","ZH","DH","L","N","Z"],
    ]
  },
  "IH": {
    consonants: [
      ["HH","Y","ZH","W","DH"],
      ["W","ZH","Y","DH"],
      ["B","W","Y","ZH","DH"],
      ["B","F","G","HH","W","Y","ZH","DH","SH"],
      ["B","CH","F","G","HH","L","SH","TH","W","Y","ZH","DH","JH","P","R"],
    ]
  },
  "IY": {
    consonants: [
      ["Y","ZH","W"],
      ["W","Y","DH","HH","ZH"],
      ["G","W","Y","ZH","DH","B","HH","P"],
      ["B","G","HH","P","SH","TH","W","Y","ZH","DH","F"],
      ["B","D","G","HH","S","SH","V","W","Y","ZH","DH","CH","M","P","TH"],
    ]
  },
  "OW": {
    consonants: [
      ["Y","ZH"],
      ["W","Y","DH","ZH"],
      ["G","W","Y","ZH","DH","HH","SH","TH","V","Y"],
      ["B","G","HH","P","SH","TH","W","Y","ZH","DH","G","V","Y"],
      ["B","D","G","HH","S","SH","V","W","Y","ZH","DH","L","M","R","S","T","Z"],
    ]
  },
  "OY": {
    consonants: [
      ["B","HH","P","TH","V","W","Y","ZH","DH","F","G","JH","M","SH"],
      ["B","F","HH","JH","M","P","SH","V","W","Y","ZH","DH","CH","G","K","R","TH"],
      ["B","CH","F","G","HH","JH","K","P","R","SH","TH","V","W","Y","ZH","DH","M","N","S"],
      ["B","CH","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH","D"],
      ["OY","B","CH","F","G","HH","JH","K","L","M","N","P","R","S","SH","TH","V","W","Y","ZH","DH","D","T","Z"],
    ]
  },
  "UH": {
    consonants: [
      ["B","G","HH","JH","M","N","V","W","Y","ZH","DH","P","TH"],
      ["B","CH","HH","JH","P","V","W","Y","ZH","DH","G","M","TH"],
      ["B","CH","G","HH","JH","M","N","P","TH","V","Y","ZH","DH","W"],
      ["UH","B","CH","F","G","HH","JH","L","M","N","P","S","SH","T","TH","V","W","Y","Z","ZH","DH","D","K"],
      ["UH","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "UW": {
    consonants: [
      ["HH","Y"],
      ["CH","G","HH","W","ZH","DH","Y"],
      ["B","CH","G","SH","Y","ZH","DH","HH","R","W"],
      ["B","CH","F","G","HH","JH","K","M","P","SH","TH","V","W","Y","ZH","DH","L","R","Z"],
      ["UW","B","CH","F","G","HH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH","D","JH"],
    ]
  }
};

export default blacklist;
