const searchInput = document.getElementById("search-input");
const main = document.querySelector("main.container");
const searchNotFound = document.getElementById("search-not-found");

function Search() {
    const lang = localStorage.getItem('lang');
    if (!lang) return;

    searchNotFound.classList.remove("show");

    const input = searchInput.value.toLowerCase().trim();
    if (input === "") {
        main.querySelectorAll(".HIDE").forEach((element) => {
            element.classList.remove("HIDE", "pop-up");
        });
        return;
    }

    let anyVisible = false;
    main.querySelectorAll("div[class]").forEach(section => {
        const items = section.querySelectorAll("li");
        if (items.length === 0) return;

        let hasVisibleChildren = false;
        items.forEach(element => {
            const p = element.querySelector('p');
            const content = p.textContent.toLowerCase();
            const isHidden = !content.includes(input);
            element.classList.toggle("HIDE", isHidden);
            if (!isHidden) {
                hasVisibleChildren = true
                anyVisible = true;
            };
        });

        section.querySelector("h2")?.classList.toggle("HIDE", !hasVisibleChildren);
        section.querySelector("hr")?.classList.toggle("HIDE", !hasVisibleChildren);
    });

    if (!anyVisible) {
        searchNotFound.classList.add("show");
    }
}

searchInput.addEventListener("input", Search);