const formSearch = document.querySelector(".form-search");
const inputSearch = document.querySelector(".form-search__input");
const clean = document.querySelector(".form-search__clean");

inputSearch.addEventListener("input", event => {
    if (inputSearch.value.length !== 0) {
        clean.classList.remove("hidden");
    } else {
        clean.classList.add("hidden");
    }
});

clean.addEventListener("click", event => {
    inputSearch.value = null;
    clean.classList.add("hidden");
});
