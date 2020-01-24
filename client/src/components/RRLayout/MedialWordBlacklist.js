const blacklist = {
  "AA": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["DH"],
      ["ZH","DH"],
      ["SH","TH","Y","ZH","DH","CH","Z"],
    ]
  },
  "AE": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["ZH","DH","Y"],
      ["Y","ZH","DH","W"],
      ["CH","W","Y","ZH","DH","JH","TH"],
    ]
  },
  "AH": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      [],
      ["DH"],
      ["HH"],
    ]
  },
  "AO": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["TH","ZH","DH","SH"],
      ["CH","ZH","DH","JH","SH","Y","Z"],
      ["CH","HH","JH","S","SH","TH","V","W","Y","ZH","DH","L","Z"],
    ]
  },
  "AW": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["JH","W","Y","Z","ZH","DH","CH","TH"],
      ["F","JH","TH","W","Y","Z","ZH","DH","CH","G","M","SH","T","V"],
      ["B","CH","D","F","G","HH","JH","M","N","P","R","S","SH","T","TH","V","W","Y","Z","ZH","DH","K","L"],
    ]
  },
  "AY": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["ZH","DH","JH","Y"],
      ["SH","Y","ZH","DH","G"],
      ["CH","HH","SH","TH","W","Y","ZH","DH","G","JH","K","P","R","Z"],
    ]
  },
  "EH": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["ZH","DH"],
      ["ZH","DH"],
      ["CH","ZH","DH","SH","Y"],
    ]
  },
  "ER": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      [],
      ["ZH","R"],
      ["ZH","DH","HH","R","TH","W"],
    ]
  },
  "EY": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["ZH","DH","TH"],
      ["DH","JH","TH","ZH"],
      ["TH","Y","ZH","DH","CH","HH","JH","SH","W"],
    ]
  },
  "IH": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["Y","ZH"],
      ["Y","ZH","DH"],
      ["CH","HH","Y","ZH","DH","TH","W"],
    ]
  },
  "IY": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["ZH"],
      ["Y","ZH","DH"],
      ["HH","W","Y","ZH","DH"],
    ]
  },
  "OW": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["SH","ZH","DH"],
      ["ZH","DH","CH","SH","TH","W","Y"],
      ["CH","JH","SH","W","Y","ZH","DH","B","TH"],
    ]
  },
  "OY": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["CH","G","SH","TH","Y","ZH","DH","D","F","HH","W","Z"],
      ["CH","D","F","G","JH","K","SH","TH","V","W","Y","Z","ZH","DH","B","HH","M","S"],
      ["CH","D","F","G","HH","JH","K","M","N","R","S","SH","T","TH","V","W","Y","Z","ZH","DH","B"],
    ]
  },
  "UH": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["HH","TH","ZH","DH","CH","F","JH","P","V","Z"],
      ["JH","L","N","TH","V","Z","DH","CH","D","F","G","HH","P","R","S","W","ZH"],
      ["B","CH","D","G","HH","JH","L","M","N","P","R","S","TH","V","W","Z","ZH","DH","F","SH","T"],
    ]
  },
  "UW": {
    consonants: [
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["AA","AE","AH","AO","AW","AY","EH","ER","EY","IH","IY","OW","OY","UH","UW","B","CH","D","F","G","HH","JH","K","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ["DH","W","ZH","DH"],
      ["ZH","DH","W"],
      ["F","SH","W","Z","ZH","DH","HH","TH","V"],
    ]
  }
};

export default blacklist;
