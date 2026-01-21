function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function reverse(str) {
    return str.split('').reverse().join('');
}

function countVowels(str) {
    const matches = str.match(/[aeiou]/gi);
    return matches ? matches.length : 0;
}

module.exports = { capitalize, reverse, countVowels };
