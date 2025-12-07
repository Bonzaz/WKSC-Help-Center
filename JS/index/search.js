const searchInput = document.getElementById("search-input");
const main = document.querySelector("main.container");

function Search() {
    const lang = localStorage.getItem('lang');
    if (!lang) return;

    const input = searchInput.value.toLowerCase().trim();
    if (input === "") {
        main.querySelectorAll(".HIDE").forEach((element) => {
            element.classList.remove("HIDE", "pop-up");
        });
        return;
    }

    main.querySelectorAll("div[class]").forEach(section => {
        const items = section.querySelectorAll("li");
        if (items.length === 0) return;

        let hasVisibleChildren = false;
        items.forEach(element => {
            const p = element.querySelector('p');
            const content = p.textContent.toLowerCase();
            const isHidden = !content.includes(input);
            element.classList.toggle("HIDE", isHidden);
            if (!isHidden) hasVisibleChildren = true;
        });

        section.querySelector("h2")?.classList.toggle("HIDE", !hasVisibleChildren);
        section.querySelector("hr")?.classList.toggle("HIDE", !hasVisibleChildren);
    });
}

searchInput.addEventListener("input", Search);