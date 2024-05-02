// Suche

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    const results = [];
    const searchableElements = Array.from(document.body.getElementsByTagName("p"));
    const searchableUls = Array.from(document.body.getElementsByTagName("ul"));
    const searchableH2s = Array.from(document.body.getElementsByTagName("h2"));
    searchableUls.forEach((el) => {
      if (!el.classList.contains("searchExclude")) {
        searchableElements.push(el);
      }
    });
    searchableH2s.forEach(el => searchableElements.push(el));

    for (let i = 0; i < searchableElements.length; i++) {
      if (!searchableElements[i].id) {
        searchableElements[i].id = "searchIndex" + i;
      }
    }


    Array.from(searchableElements).forEach((element) => {
      if (
        element.textContent.toLowerCase().includes(searchTerm)) {
        results.push(element);
      }
    });

    renderResults(results);

    if (searchTerm == ""){
        searchResults.innerHTML= "";
    }
  });

  function renderResults(results) {
    searchResults.innerHTML = "";
    results.forEach((result) => {
      const resultLink = document.createElement("a");
      resultLink.href = "#" + result.id;
      const resultElement = document.createElement("div");
      resultElement.classList.add("card");
      resultElement.classList.add("card-body");
      resultElement.classList.add("btn");
      resultElement.classList.add("btn-info");
      resultElement.classList.add("text-start");
      const resultText = document.createElement("p");
      resultText.textContent = result.textContent.slice(0, 200) + "...";
      resultElement.classList.add("searchresult");
      resultElement.classList.add("title");
      resultElement.appendChild(resultText);
      resultLink.appendChild(resultElement);
      searchResults.appendChild(resultLink);
    });

    if (results.length === 0) {
      const noResultsElement = document.createElement("div");
      noResultsElement.textContent = "Keine Ergebnisse gefunden.";
      noResultsElement.classList.add("searchresult");
      noResultsElement.classList.add("title");
      searchResults.appendChild(noResultsElement);
    }
  }
});