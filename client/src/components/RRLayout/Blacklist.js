const blacklist = {
  "AA": {
      consonants: [
        [],
        [],
        [],
        ["CH","JH","SH","TH","Y","Z"],
        ["B","CH","JH","L","R","SH","TH","Y","Z"],
      ]
  },
  "AE": {
      consonants: [
        [],
        [],
        [],
        ["SH","Y"],
        ["CH","D","F","JH","SH","TH","W","Y","Z"],
      ]
  },
  "AH": {
      consonants: [
        ["L","N","S","T","Z"],
        ["L","N","S","T","Z"],
        ["CH","L","N","S","T","Y","Z"],
        ["L","N","S","T","Y","Z"],
        ["L","N","S","SH","T","Z"]
      ]
  },
  "AO": {
      consonants: [
        ["Z"],
        [],
        ["CH","Y","Z"],
        ["CH","R","TH","Y", "Z"],
        ["CH","D","F","JH","L","P","R","S","SH","T","TH","V","Y","Z"],
      ]
  },
  "AW": {
      consonants: [
        ["TH","Y","Z"],
        ["N","W","Y","Z"],
        ["CH","JH","SH","TH","V","N","Y","Z"],
        ["B","CH","D","F","G","HH","JH","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
        ["B","CH","D","F","G","HH","JH","L","M","N","P","R","S","SH","T","TH","V","W","Y","Z"],
      ]
  },
  "AY": {
      consonants: [
        ["Y"],
        ["Y"],
        ["SH","TH","Y"],
        ["CH","SH","TH","W","Y"],
        ["CH","F","JH","P","R","SH","TH","W","Y","Z"],
      ],
  },
  "EH": {
      consonants: [
        [],
        [],
        [],
        ["SH","T","W"],
        ["G","SH","Y","Z"],
      ]
  },
  "ER": {
      consonants: [
        ["R","Z"],
        ["R"],
        ["R","SH","Z"],
        ["CH","G","N","R","SH"],
        ["B","CH","G","L","N","R","SH","W","Z"],
      ],
  },
  "EY": {
      consonants: [
        ["Z"],
        ["Y"],
        ["TH", "Y", "Z"],
        ["CH","HH","JH","L","N","TH","V","W","Y","Z"],
        ["B","CH","D","F","G","HH","JH","L","M","N","S","SH","T","TH","W","Y","Z"],
      ],
  },
  "IH": {
      consonants: [
        [],
        [],
        [],
        ["CH","G","TH","Y"],
        ["CH","G","TH","SH","JH","W","Y","Z"],
      ]
  },
  "IY": {
      consonants: [
        [],
        [],
        ["Y"],
        ["CH","G","SH","T","W","Y","Z"],
        ["B","CH","G","L","S","SH","V","W","Y","Z"],
      ]
  },
  "OW": {
      consonants: [
        [],
        [],
        [],
        ["CH","G","TH","W"],
        ["B","CH","JH","L","SH","T","TH","W","Y","Z"],
      ]
  },
  "OY": {
      consonants: [
        ["SH","TH","W","Y","Z"],
        ["CH","HH","SH","TH","W","Y","Z"],
        ["CH","D","F","G","HH","K","S","SH","TH","W","Y","Z"],
        ["B","CH","D","F","G","HH","JH","K","L","M","N","R","S","SH","T","TH","W","Y","Z"],
        ["B","CH","D","F","G","HH","JH","K","L","N","R","S","V","M","SH","TH","W","Y","Z"],
      ],
  },
  "UH": {
      consonants: [
        ["CH","D","JH","TH","V","W","Z"],
        ["CH","TH","V"],
        ["CH","G","HH","L","R","TH","V","Z"],
        ["CH","D","G","HH","JH","L","M","N","SH","T","TH","V","W","Z"],
        ["B","D","F","G","HH","L","M","R","S","SH","T","W","Y","Z","CH","TH","V",],
      ],
  },
  "UW": {
      consonants: [
        [],
        [],
        ["CH","TH","W"],
        ["CH","G","SH","TH","V","W"],
        ["CH","D","F","G","HH","K","P","SH","TH","V","W","Z"],
      ]
  }
};

export default blacklist;
