import translatedContent from '../Resources/translatedContent.json' with { type: 'json' };

function CheckLanguage() {
    const lang = localStorage.getItem('lang');

    if (!lang || (lang !== "en" && lang !== "th")) {
        localStorage.setItem('lang', 'th');
    }
}

CheckLanguage();