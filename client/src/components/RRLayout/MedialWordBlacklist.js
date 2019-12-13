const blacklist = {
  "AA": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["DH"],
      ["ZH","DH"],
      ["SH","TH","Y","ZH","DH"],
    ]
  },
  "AE": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["ZH","DH"],
      ["Y","ZH","DH"],
      ["CH","W","Y","ZH","DH"],
    ]
  },
  "AH": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      [],
      [],
      ["HH"],
    ]
  },
  "AO": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["TH","ZH","DH"],
      ["CH","ZH","DH"],
      ["CH","HH","JH","S","SH","TH","V","W","Y","ZH","DH"],
    ]
  },
  "AW": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["JH","W","Y","Z","ZH","DH"],
      ["F","JH","TH","W","Y","Z","ZH","DH"],
      ["B","CH","D","F","G","HH","JH","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "AY": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["ZH","DH"],
      ["SH","Y","ZH","DH"],
      ["CH","HH","SH","TH","W","Y","ZH","DH"],
    ]
  },
  "EH": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["ZH","DH"],
      ["ZH","DH"],
      ["CH","ZH","DH"],
    ]
  },
  "ER": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      [],
      ["ZH"],
      ["ZH","DH"],
    ]
  },
  "EY": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["ZH","DH"],
      ["DH"],
      ["TH","Y","ZH","DH"],
    ]
  },
  "IH": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["Y"],
      [],
      ["CH","HH","Y","ZH","DH"],
    ]
  },
  "IY": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      [],
      ["Y","ZH"],
      ["HH","W","Y","ZH","DH"],
    ]
  },
  "OW": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["SH","ZH","DH"],
      ["ZH","DH"],
      ["CH","JH","SH","W","Y","ZH","DH"],
    ]
  },
  "OY": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["CH","G","SH","TH","Y","ZH","DH"],
      ["CH","D","F","G","JH","K","SH","TH","V","W","Y","Z","ZH","DH"],
      ["CH","D","F","G","HH","JH","K","M","N","R","S","SH","T","TH","V","W","Y","Z","ZH","DH"],
    ]
  },
  "UH": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["HH","TH","ZH","DH"],
      ["JH","L","N","TH","V","Z","DH"],
      ["B","CH","D","G","HH","JH","L","M","N","P","R","S","TH","V","W","Z","ZH","DH"],
    ]
  },
  "UW": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["DH"],
      ["ZH","DH"],
      ["F","SH","W","Z","ZH","DH"],
    ]
  }
};

export default blacklist;
