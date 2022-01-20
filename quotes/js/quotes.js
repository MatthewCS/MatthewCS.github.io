const quotes = [
    {
        "text": "Placeholder 1",
        "name": "Me"
    },
    {
        "text": "Placeholder 2",
        "name": "Also me"
    },
    {
        "text": "Placeholder 3",
        "name": "Still me"
    }
]

function setRandomQuote() {
    let i = Math.floor(Math.random() * quotes.length);
    document.getElementById("quote-text").innerHTML =
        quotes[i].text;
    document.getElementById("quote-name").innerHTML =
        "-<em>" + quotes[i].name + "</em>";
}

document.addEventListener("DOMContentLoaded", function () {
    setRandomQuote();
});
