const blacklist = {
  "AA": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["CH","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["CH","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["CH","F","HH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "AE": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["CH","JH","K","L","M","N","P","R","S","T","TH","V","W","Y","Z","ZH","DH"],
      ["B","CH","JH","K","L","M","N","P","R","S","T","V","SH","TH","W","Y","Z","ZH","DH"],
    ]
  },
  "AH": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["HH","DH"],
      ["HH","DH"],
      ["HH","DH"],
    ]
  },
  "AO": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "AW": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["AW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "AY": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ],
  },
  "EH": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["CH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["CH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["B","D","F","CH","G","K","L","M","N","P","R","S","HH","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "ER": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["K","L","M","N","R","S","SH","T","Y","Z","ZH"],
      ["HH","K","L","M","N","R","S","SH","T","Y","Z","ZH","DH"],
      ["CH","D","JH","HH","K","L","M","N","R","S","SH","T","TH","W","Y","Z","ZH","DH"],
    ],
  },
  "EY": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["B","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["B","D","F","G","HH","CH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["B","D","F","G","HH","CH","F","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ],
  },
  "IH": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["CH","N","SH","Y","ZH","DH"],
      ["CH","G","TH","N","TH","Y","Z","ZH","DH"],
      ["IH","B","D","F","G","CH","HH","JH","K","M","N","P","R","S","SH","T","TH","W","Y","Z","ZH","DH"],
    ]
  },
  "IY": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["K","L","N","R","S","SH","T","Y","Z","ZH","DH"],
      ["CH","F","G","HH","JH","K","L","N","R","S","T","TH","V","Y","Z","ZH","DH"],
      ["IY","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","W","Y","Z","ZH","DH"],
    ]
  },
  "OW": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["CH","F","HH","K","L","M","N","P","R","S","JH","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["OW","B","CH","D","F","G","HH","K","L","M","N","P","R","S","JH","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["OW","B","CH","D","F","G","HH","K","L","M","N","P","R","S","JH","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "OY": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["OY","B","CH","D","F","G","HH","JH","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["OY","B","CH","D","F","G","HH","JH","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["OY","B","CH","D","F","G","HH","JH","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ],
  },
  "UH": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["UH","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["UH","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ],
  },
  "UW": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
      ["UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  }
};

export default blacklist;
