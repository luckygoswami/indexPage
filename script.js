function googleSearch() {
    var text = document.getElementById("search").value;
    var cleanQuery = text.replace(" ", "+", text);
    var url = "http://www.google.com/search?q=" + cleanQuery;

    window.location.href = url;
}

let searchInput = document.getElementById("search");

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        googleSearch();
    }
});

// Add something to given element placeholder
function addToPlaceholder(toAdd, el) {
    el.attr("placeholder", el.attr("placeholder") + toAdd);
    // Delay between symbols "typing"
    return new Promise((resolve) => setTimeout(resolve, 100));
}

// Cleare placeholder attribute in given element
function clearPlaceholder(el) {
    el.attr("placeholder", "");
}

// Print one phrase
function printPhrase(phrase, el) {
    return new Promise((resolve) => {
        // Clear placeholder before typing next phrase
        clearPlaceholder(el);
        let letters = phrase.split("");
        // For each letter in phrase
        letters.reduce(
            (promise, letter, index) =>
                promise.then((_) => {
                    // Resolve promise when all letters are typed
                    if (index === letters.length - 1) {
                        // Delay before start next phrase "typing"
                        setTimeout(resolve, 1000);
                    }
                    return addToPlaceholder(letter, el);
                }),
            Promise.resolve()
        );
    });
}

// Print given phrases to element
function printPhrases(phrases, el) {
    // For each phrase
    // wait for phrase to be typed
    // before start typing next
    phrases.reduce(
        (promise, phrase) => promise.then((_) => printPhrase(phrase, el)),
        Promise.resolve()
    );
}

// Start typing
function run() {
    let phrases = [
        "Google is so strange :)",
        'Find anything e.g. "Dancing Cats"',
        "Google anything here...",
    ];

    printPhrases(phrases, $("#search"));
}

run();
