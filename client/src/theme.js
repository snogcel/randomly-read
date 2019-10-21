const constants = {
  error: '#f5222d',
  vote: '#b6b6b6',
  upvote: '#8A0C93',
  downvote: '#C70E4C'
};

const dark = {
  ...constants,
  normalText: '#ffffff',
  mutedText: '#b0b8bf',
  border: '#333333',
  accent: '#33a0ff',
  pageBackground: '#1b1b1b',
  voteButtonHover: '#383838',
  foreground: '#262626',
  activeBackground: '#333333',
  inputBackground: '#212121',
  shadow: 'rgba(0, 0, 0, 0.4)',
  wordcardText: '#ffffff'
};

const light = {
  ...constants,
  normalText: '#14197E',
  mutedText: '#818e99',
  border: '#ebedf0',
  accent: '#6F0377',
  pageBackground: '#FEFFFF',
  voteButtonHover: '#f2f2f2',
  foreground: '#FFFFFF',
  activeBackground: '#fafafa',
  inputBackground: '#fcfcfc',
  shadow: 'rgba(0, 0, 0, 0.05)',
  wordcardText: '#000000'
};

// yellow: FFEB3B
// purple: 9F28A7
// blue: 3C42B1

// light blue: FBFDFF
// light green: FBFCFB
// light yellow: FFFEF8

// theme yellow: ffeb3b

// background blue: FEFFFF

const theme = isDark => (isDark ? dark : light);

export default theme;
