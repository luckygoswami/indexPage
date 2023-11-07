function googleSearch() {
    var text = document.getElementById("search").value;
    var cleanQuery = text.replace(" ", "+", text);
    var url = "http://www.google.com/search?q=" + cleanQuery;

    window.location.href = url;
}
