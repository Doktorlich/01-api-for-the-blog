let textareaItem;
let countSymbol;
const list = document.querySelector(".comments__list-item");

function toggleForm(event) {
    const clickedButtonToggle = event.target.closest(".button-toggle");
    if (!clickedButtonToggle) return;
    console.log("1");
    const item = clickedButtonToggle.closest(".comments__item");
    const sectionComment = item.querySelector(".comments__comment");
    const sectionFieldComment = item.querySelector(".comment-form__field-comment");
    const textarea = item.querySelector(".comment-form__textarea");
    countSymbol = item.querySelector(".comment-form__count-span");
    textareaItem = textarea;
    sectionComment.classList?.toggle("hidden");

    sectionFieldComment.classList?.toggle("hidden");

    textarea.focus();
}

list.addEventListener("click", toggleForm);

list.addEventListener("input", () => {
    const count = textareaItem.value.length;
    countSymbol.textContent = count;
    if (count >= 256) {
        textareaItem.value = textareaItem.value.slice(0, 256);
        countSymbol.textContent = 256; // Обновляем счётчик
    }
});
