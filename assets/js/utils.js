const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
export const shuffle = (str) => {
    const chars = [...str];
    for (let i = chars.length - 1; i > 0; i--) {
        const j = randomInt(0, i);
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join("");
};
export const getRandomCharacter = (charCodes) => {
    return String.fromCharCode(randomInt(...charCodes));
};
