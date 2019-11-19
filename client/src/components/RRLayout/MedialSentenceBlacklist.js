const blacklist = {
  "AA": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["CH","JH","Y",],
      ["CH","JH","SH","W","Y"],
      ["CH","F","HH","M","R","SH","TH","W","Y"],
    ]
  },
  "AE": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["JH","W","Y"],
      ["CH","JH","D","SH","TH","W","Y"],
      ["B","CH","JH","R","SH","TH","W","Y"],
    ]
  },
  "AH": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["HH","L","N","S","W"],
      ["HH","L","N","S","W","Y"],
      ["HH","L","N","S","W"],
    ]
  },
  "AO": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["CH","JH","R","SH","TH","V","Y"],
      ["CH","HH","SH","TH","V","Y"],
      ["CH","D","G","HH","JH","P","R","SH","V","W","Y","Z"],
    ]
  },
  "AW": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["B","CH","G","HH","JH","L","M","N","R","SH","T","TH","W","Y","Z"],
      ["AW","B","CH","D","F","G","HH","JH","K","L","M","N","R","S","SH","T","TH","W","Y","Z"],
      ["AW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","W","Y","Z"],
    ]
  },
  "AY": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["CH","G","HH","SH","TH","Y"],
      ["B","CH","G","SH","TH","W","Y"],
      ["B","CH","HH","JH","K","M","P","R","SH","T","TH","W","Y"],
    ],
  },
  "EH": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["CH","Y"],
      ["CH","SH","Y"],
      ["B","CH","G","HH","SH","W","Y"],
    ]
  },
  "ER": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["R","SH","Y"],
      ["HH","R","SH","Y"],
      ["HH","K","R","SH","TH","W","Y"],
    ],
  },
  "EY": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["TH","W","Y"],
      ["CH","JH","SH","TH","Y"],
      ["CH","F","HH","JH","R","SH","TH","V","W","Y","Z"],
    ],
  },
  "IH": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["CH","SH","W","Y"],
      ["CH","TH","W","Y"],
      ["CH","HH","K","SH","TH","W","Y"],
    ]
  },
  "IY": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["SH","Y"],
      ["CH","W","Y"],
      ["CH","F","HH","TH","W","Y"],
    ]
  },
  "OW": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["CH","JH","SH","TH","W","Y","Z"],
      ["CH","HH","JH","SH","TH","V","W","Y"],
      ["B","CH","HH","JH","SH","TH","V","W","Y","Z"],
    ]
  },
  "OY": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["OY","CH","D","F","G","HH","L","M","R","SH","T","TH","W","Y","Z"],
      ["OY","B","CH","D","F","G","HH","JH","M","N","R","SH","T","TH","V","W","Y","Z"],
      ["OY","B","CH","D","F","G","HH","JH","L","M","N","P","R","SH","T","TH","V","W","Y","Z"],
    ],
  },
  "UH": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["UH","B","CH","G","HH","JH","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["UH","B","CH","D","F","G","HH","JH","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["UH","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
    ],
  },
  "UW": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["HH","TH","V","W","Z"],
      ["G","HH","R","TH","V","W"],
      ["UW","B","F","G","HH","JH","R","SH","V","W","Z"],
    ]
  }
};

export default blacklist;
