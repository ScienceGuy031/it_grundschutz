// Suche

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const searchableElements = Array.from(document.body.getElementsByTagName("p"));
  const searchableUls = Array.from(document.body.getElementsByTagName("ul"));
  const searchableH2s = Array.from(document.body.getElementsByTagName("h2"));
  const searchableH3s = Array.from(document.body.getElementsByTagName("h3"));
  const searchableH4s = Array.from(document.body.getElementsByTagName("h4"));
  searchableUls.forEach((el) => {
    if (!el.classList.contains("searchExclude")) {
      searchableElements.push(el);
    }
  });
  searchableH2s.forEach(el => searchableElements.push(el));
  searchableH3s.forEach(el => searchableElements.push(el));
  searchableH4s.forEach(el => searchableElements.push(el));

  for (let i = 0; i < searchableElements.length; i++) {
    if (!searchableElements[i].id) {
      searchableElements[i].id = "searchIndex" + i;
    }
  }

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase().replace(/\s+/g, " ");
    const results = [];

    Array.from(searchableElements).forEach((element) => {
      if (
        element.textContent.toLowerCase().replace(/\s+/g, " ").includes(searchTerm)) {
        results.push(element);
      }
    });

    renderResults(results);

    if (searchTerm == "") {
      searchResults.innerHTML = "";
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
      resultElement.addEventListener("click", function(e){
        let accButton;
        let accordionItemParent;
        let accordionItem = result.closest(".accordion-item");

        if (accordionItem != null){
          accButton = accordionItem.querySelector("button");
          accordionItemParent = accordionItem.closest(".outer-accordion");
        }
        
        if (accordionItemParent != null)
        {
          outerAccButton = accordionItemParent.querySelector("button");
          if (outerAccButton != null)
          {
            outerAccButton.click();
          }
        }

        if (accButton != null && accButton.classList.contains("collapsed"))
          accButton.click();
      });

      let parentAccItem = result.closest(".accordion-item");
      let grantParentAccItem;
      let parentH3;
      if (parentAccItem != null)
      {
        parentH3 = parentAccItem.querySelector("h3");
        grantParentAccItem = parentAccItem.closest(".outer-accordion");

        if (grantParentAccItem != null)
        {
          parentH3 = grantParentAccItem.querySelector("h3");
        }

      }
        
      if (parentH3 != null)
      {
        resultLink.href = "#" + parentH3.id;
      }

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