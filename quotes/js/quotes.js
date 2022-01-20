const quotes = [
    {
        "text": "Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me.",
        "name": "Michael Scott"
    },
    {
        "text": "Do it. No cop, no stop.",
        "name": "Nico De Lucia, my friend :)"
    },
    {
        "text": "I have the simplest tastes. I am always satisfied with the best.",
        "name": "Oscar Wilde"
    },
    {
        "text": "Where there is no struggle, there is no strength.",
        "name": "Oprah Winfrey"
    },
    {
        "text": "If you try to make such projects, unseen by others, as perfect as any human could, you'll develop skills that other professionals don't have.",
        "name": "Steve Wozniak"
    },
    {
        "text": "I don’t talk about these things if I haven’t lived them, and I’ve hurt people in my life. It’s something I still have to think about when I sleep at night. The message I’m sending to myself – I can’t change the world until I change myself first.",
        "name": "Kendrick Lamar Duckworth"
    },
    {
        "text": "Everybody needs a passion. That’s what keeps life interesting. If you live without passion, you can go through life without leaving any footprints.",
        "name": "Betty White"
    },
    {
        "text": "If it’s flipping hamburgers at McDonald’s, be the best hamburger flipper in the world. Whatever it is you do you have to master your craft.",
        "name": "Snoop Dogg"
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
