const endTime = 1795530060;

const Commemorate = () => {
    document.querySelectorAll("*").forEach((element) => {
        element.classList.add("grayScale");
    });

    async function wait(second) {
        return new Promise(res => setTimeout(res, second * 1000));
    }

    (async () => {
        while (Date.now() < endTime * 1000) {
            await wait(60);
        }

        RemoveGrayScale();
    })();
}

const RemoveGrayScale = () => {
    document.querySelectorAll(".grayScale").forEach((element) => {
        element.classList.remove("grayScale");
    });

    const banner = document.getElementsByClassName("commemorate");
    if (banner.length > 0) {
        banner[0].style.display = "none";
    }
}

if (Date.now() < endTime * 1000) {
    Commemorate();
} else {
    RemoveGrayScale();
}