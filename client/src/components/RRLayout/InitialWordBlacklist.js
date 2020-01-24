const blacklist = {
  "AA": {
    consonants: [
      ["DH"],
      ["DH"],
      ["DH"],
      ["TH","ZH","CH","SH",],
      ["CH","JH","R","SH","TH","Y","Z","ZH","DH","L","V"],
    ]
  },
  "AE": {
    consonants: [
      ["ZH","DH"],
      ["ZH","DH"],
      ["ZH","DH"],
      ["ZH","DH","SH","TH","W"],
      ["CH","D","SH","TH","W","Y","Z","ZH","DH","F","JH"],
    ]
  },
  "AH": {
    consonants: [
      ["ZH"],
      [],
      ["DH","ZH"],
      ["ZH","DH","Z",],
      ["CH","JH","SH","TH","W","Y","Z","ZH","DH","B","L","R","T"],
    ]
  },
  "AO": {
    consonants: [
      ["DH","ZH"],
      ["ZH","DH"],
      ["DH"],
      ["CH","TH","Y","Z","ZH","DH","R","SH"],
      ["CH","D","F","JH","R","S","SH","T","TH","V","Y","Z","ZH","DH","G","L","N","P"],
    ]
  },
  "AW": {
    consonants: [
      ["Z","TH"],
      ["DH","Z","ZH"],
      ["JH","TH","V","W","Z","ZH","DH","Y"],
      ["CH","F","G","HH","JH","M","R","S","SH","T","TH","V","W","Y","Z","ZH","DH","D","N","P"],
      ["B","CH","D","F","G","HH","JH","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH","AW"],
    ]
  },
  "AY": {
    consonants: [
      ["ZH","Y"],
      ["Y","DH","ZH"],
      ["Y","DH","TH","ZH",],
      ["CH","SH","Y","ZH","DH","TH","W","TH"],
      ["CH","F","JH","R","SH","W","Y","Z","ZH","DH","G","K","L","P","TH"],
    ]
  },
  "EH": {
    consonants: [
      ["ZH"],
      ["ZH"],
      [],
      ["ZH","DH","Y"],
      ["SH","Z","ZH","DH","B","CH","G","TH","W","Y"],
    ]
  },
  "ER": {
    consonants: [
      ["R","ZH","DH"],
      ["R","DH"],
      ["R","ZH","DH"],
      ["N","R","SH","ZH","DH","L","W","Z"],
      ["L","N","R","SH","W","Z","ZH","DH","B","CH","G","JH","M","T","TH","V","Y"],
    ]
  },
  "EY": {
    consonants: [
      ["ZH","DH"],
      ["DH","ZH"],
      ["TH","ZH","DH","Y"],
      ["CH","N","V","W","Y","Z","ZH","DH","HH","JH","TH"],
      ["B","CH","D","F","G","HH","JH","L","M","N","S","SH","T","W","Y","Z","ZH","DH","TH","V"],
    ]
  },
  "IH": {
    consonants: [
      ["ZH","DH"],
      ["DH"],
      ["DH","ZH"],
      ["DH","TH","Y","ZH"],
      ["CH","G","JH","SH","TH","W","Y","Z","ZH","DH","B",],
    ]
  },
  "IY": {
    consonants: [
      ["ZH"],
      ["DH"],
      ["ZH","DH","Y"],
      ["G","Y","ZH","DH","SH"],
      ["CH","G","W","Y","ZH","DH","B","L","S","SH","T","Z"],
    ]
  },
  "OW": {
    consonants: [
      ["ZH"],
      ["ZH","DH"],
      ["ZH","DH"],
      ["ZH","DH","CH","SH","TH","W","Z"],
      ["L","SH","T","TH","W","Y","Z","ZH","DH","B","CH","F","G","JH",],
    ]
  },
  "OY": {
    consonants: [
      ["TH","Z","ZH","DH","SH","W","Y"],
      ["TH","Y","Z","ZH","DH"],
      ["CH","TH","Y","ZH","DH","OY","D","G","K","S","Z"],
      ["OY","CH","D","F","G","HH","JH","K","L","N","R","S","SH","T","TH","Y","Z","ZH","DH","B","M","P","V"],
      ["OY","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "UH": {
    consonants: [
      ["CH","TH","V","ZH","DH","UH","D","JH","Z"],
      ["DH","TH","ZH"],
      ["UH","CH","HH","TH","V","Z","ZH","DH","R"],
      ["UH","CH","D","SH","T","TH","V","Z","ZH","DH","G","L","R"],
      ["UH","B","CH","D","F","HH","L","M","R","S","SH","T","TH","V","W","Y","Z","ZH","DH","JH"],
    ]
  },
  "UW": {
    consonants: [
      ["ZH","DH"],
      ["ZH","DH"],
      ["TH","ZH","DH","CH","W"],
      ["SH","TH","W","ZH","DH","CH","V"],
      ["CH","D","F","K","P","SH","TH","V","W","Z","ZH","DH","UW","B","G","JH","N"],
    ]
  }
};

export default blacklist;
