import translatedContent from '../Resources/translatedContent.json' with { type: 'json' };

function InitButtons(params) {
    const langSelector = document.querySelector('.lang-selector');
    if (langSelector) {
        if (localStorage.getItem('lang') === "th") {
            langSelector.querySelector('.thaiLang').classList.add("selected");
            langSelector.querySelector('.engLang').classList.remove("selected");
        } else if (localStorage.getItem('lang') === "en") {
            langSelector.querySelector('.thaiLang').classList.remove("selected");
            langSelector.querySelector('.engLang').classList.add("selected");
        }
    }
}

function Translate(noAnim) {
    const lang = localStorage.getItem('lang');
    const tC = JSON.parse(JSON.stringify(translatedContent));
    const allContents = document.querySelectorAll('*');

    const warn = document.querySelector('.main-warning-construct');

    if (warn) {
        warn.querySelector('.text h1').classList.toggle("en", lang === "en");
        warn.querySelector('.text p').classList.toggle("en", lang === "en");
    }

    document.querySelector('html').setAttribute('lang', lang.toLowerCase());

    allContents.forEach((element) => {
        const elementInfo = tC[element.id];
        if (!elementInfo) return;

        const content = elementInfo[lang].content;
        const alt = elementInfo[lang].alt;

        if (content && !noAnim) {
            element.classList.add("translatable");
            element.classList.add("fade-out");
        }

        setTimeout(() => {

            if (content) {
                element.innerHTML = content;
            }

            if (alt) {
                element.setAttribute("alt", alt);
            }

            if (content && !noAnim) {
                element.classList.remove("fade-out");

                setTimeout(() => {
                    element.classList.remove("translatable");
                }, 200);
            }

        }, 200);
    });
}

function CheckLanguage() {
    const lang = localStorage.getItem('lang');

    if (!lang || (lang !== "en" && lang !== "th")) {
        localStorage.setItem('lang', 'th');
    }

    const langSelector = document.querySelector('.lang-selector');
    let debounce = false;

    if (langSelector) {
        langSelector.querySelector('.thaiLang').addEventListener("click", (e) => {
            if (localStorage.getItem('lang') === "th") return;
            if (debounce) return;
            debounce = true;
            localStorage.setItem('lang', 'th');
            InitButtons();
            Translate();

            setTimeout(() => {
                debounce = false;
            }, 500);
        });

        langSelector.querySelector('.engLang').addEventListener("click", (e) => {
            if (localStorage.getItem('lang') === "en") return;
            if (debounce) return;
            debounce = true;
            localStorage.setItem('lang', 'en');
            InitButtons();
            Translate();

            setTimeout(() => {
                debounce = false;
            }, 500);
        });
    }
}

CheckLanguage();
InitButtons();

document.addEventListener("DOMContentLoaded", Translate(true));