const blacklist = {
  "AA": {
      consonants: [
        ["TH","V","Z","ZH","DH"],
        ["ZH","DH"],
        ["CH","SH","TH","Y","Z","ZH","DH"],
        ["CH","JH","R","SH","TH","W","Y","Z","ZH","DH"],
        ["B","CH","G","H","JH","L","R","S","SH","TH","V","Y","Z","ZH","DH"],
      ]
  },
  "AE": {
      consonants: [
        ["TH","V","Y","Z","ZH","DH"],
        ["ZH","DH"],
        ["TH","W","Y","ZH","DH"],
        ["CH","D","HH","SH","TH","W","Y","Z","ZH","DH"],
        ["CH","D","F","G","JH","N","R","SH","TH","V","W","Y","Z","ZH","DH"],
      ]
  },
  "AH": {
      consonants: [
        ["CH","Z","ZH","DH"],
        ["Z","ZH","DH"],
        ["CH","Y","Z","ZH","DH"],
        ["CH","JH","SH","TH","W","Y","Z","ZH","DH"],
        ["B","CH","G","JH","L","P","R","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ]
  },
  "AO": {
      consonants: [
        ["CH","V","Y","Z","ZH","DH"],
        ["CH","Z","ZH","DH"],
        ["CH","JH","V","Y","Z","ZH","DH"],
        ["B","CH","D","G","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
        ["B","CH","D","F","G","HH","JH","L","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ]
  },
  "AW": {
      consonants: [
        ["CH","G","HH","JH","M","N","R","SH","T","TH","V","Y","Z","ZH","DH"],
        ["CH","N","V","W","Y","Z","ZH","DH"],
        ["CH","JH","L","M","N","SH","T","TH","V","W","Y","Z","ZH","DH"],
        ["AW","B","CH","D","F","G","HH","JH","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
        ["AW","B","CH","D","F","G","HH","JH","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ]
  },
  "AY": {
      consonants: [
        ["G","TH","Y","Z","ZH","DH"],
        ["Y","Z","ZH","DH"],
        ["G","SH","TH","V","W","Y","ZH","DH"],
        ["CH","F","JH","R","SH","TH","W","Y","Z","ZH","DH"],
        ["AY","CH","F","JH","K","L","N","P","R","SH","TH","W","Y","Z","ZH","DH"],
      ],
  },
  "EH": {
      consonants: [
        ["G","Z","ZH","DH"],
        ["ZH","DH"],
        ["CH","G","SH","Z","ZH","DH"],
        ["CH","G","SH","W","Y","ZH","DH"],
        ["B","CH","G","L","N","SH","TH","V","W","Y","Z","ZH","DH"],
      ]
  },
  "ER": {
      consonants: [
        ["CH","G","JH","R","SH","Y","Z","ZH","DH"],
        ["L","R","SH","Z","ZH","DH"],
        ["D","G","L","N","R","SH","T","Y","Z","ZH","DH"],
        ["B","CH","F","G","JH","L","N","R","SH","W","Z","ZH","DH"],
        ["B","CH","F","G","HH","JH","L","M","N","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ],
  },
  "EY": {
      consonants: [
        ["N","TH","Y","Z","ZH","DH"],
        ["TH","Y","ZH","DH"],
        ["G","HH","JH","SH","TH","Y","Z","ZH","DH"],
        ["CH","D","F","HH","JH","K","L","N","T","TH","V","W","Y","Z","ZH","DH"],
        ["EY","B","CH","D","F","G","HH","JH","K","L","M","N","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ],
  },
  "IH": {
      consonants: [
        ["Y","Z","ZH","DH"],
        ["ZH","DH"],
        ["TH","Y","Z","ZH","DH"],
        ["CH","G","JH","K","TH","W","Y","Z","ZH","DH"],
        ["B","CH","F","G","HH","JH","K","P","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ]
  },
  "IY": {
      consonants: [
        ["JH","Y","Z","ZH","DH"],
        ["Y","ZH","DH"],
        ["IY","CH","G","JH","L","SH","Y","Z","ZH","DH"],
        ["B","D","CH","F","G","HH","K","L","SH","T","W","Y","Z","ZH","DH"],
        ["B","CH","F","G","HH","K","L","M","N","S","SH","T","V","W","Y","Z","ZH","DH"],
      ]
  },
  "OW": {
      consonants: [
        ["F","JH","SH","V","W","Y","Z","ZH","DH"],
        ["CH","Y","Z","ZH","DH"],
        ["CH","D","G","SH","T","W","Y","Z","ZH","DH"],
        ["B","CH","D","G","JH","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
        ["B","CH","D","F","G","JH","L","M","N","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ]
  },
  "OY": {
      consonants: [
        ["D","G","HH","L","M","N","SH","T","TH","W","Y","Z","ZH","DH"],
        ["CH","D","F","G","HH","M","N","S","SH","T","TH","W","Y","Z","ZH","DH"],
        ["OY","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","TH","W","Y","Z","ZH","DH"],
        ["OY","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
        ["OY","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ],
  },
  "UH": {
      consonants: [
        ["UH","CH","D","G","JH","L","M","N","R","S","T","TH","V","W","Y","Z","ZH","DH"],
        ["UH","CH","HH","JH","N","T","TH","V","Y","Z","ZH","DH"],
        ["UH","CH","D","G","HH","L","M","R","S","T","TH","V","W","Z","ZH","DH"],
        ["UH","CH","D","F","G","HH","K","L","M","R","S","SH","T","TH","V","W","Z","ZH","DH"],
        ["UH","B","CH","D","F","G","HH","JH","L","M","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ],
  },
  "UW": {
      consonants: [
        ["UW","CH","JH","TH","V","W","Z","ZH","DH"],
        ["SH","TH","V","Z","ZH","DH"],
        ["UW","CH","G","HH","SH","TH","V","W","Z","ZH","DH"],
        ["UW","B","CH","G","JH","SH","TH","V","W","Z","ZH","DH"],
        ["UW","B","CH","D","F","G","JH","K","L","M","N","P","SH","T","TH","V","W","Z","ZH","DH"],
      ]
  }
};

export default blacklist;
