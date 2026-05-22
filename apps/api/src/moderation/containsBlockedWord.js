import { slurs, reservedNames, spamTerms } from "./blockedTerms.js";

const blockedTerms = [...slurs, ...reservedNames, ...spamTerms];

function normalize(str) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
}

export default function containsBlockedWord(input) {
    const normalizedInput = normalize(input);

    return blockedTerms.some(term =>
        normalizedInput.includes(normalize(term))
    );
}