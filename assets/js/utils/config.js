const config = {
  length: {
    MIN: 5,
    MAX: 50,
    value: 15
  },
  characters: {
    lowercase: {
      checked: true,
      charCodes: [97, 122]
    },
    uppercase: {
      checked: true,
      charCodes: [65, 90]
    },
    digits: {
      checked: true,
      charCodes: [48, 57]
    },
    symbols: {
      checked: false,
      charCodes: [33, 47]
    }
  }
};

export default config;