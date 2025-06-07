let textareaItem;
let countSymbol;
const list = document.querySelector(".comments__list-item");
const buttonApply = document.querySelector(".button-apply");

function toggleForm(event) {
    const clickedButtonToggle = event.target.closest(".button-toggle");
    if (!clickedButtonToggle) return;
    const item = clickedButtonToggle.closest(".comments__item");
    const sectionComment = item.querySelector(".comments__comment");
    const sectionFieldComment = item.querySelector(".comment-form__field-comment");
    const textarea = item.querySelector(".comment-form__textarea");

    countSymbol = item.querySelector(".comment-form__count-span");
    textareaItem = textarea;

    const isCancel = clickedButtonToggle.textContent.trim().toLowerCase() === "cancel";
    if (!isCancel) {
        document.querySelectorAll(".comment-form__field-comment:not(.hidden)").forEach(section => {
            if (section !== sectionFieldComment) {
                section.classList.add("hidden");
                section
                    .closest(".comments__item")
                    ?.querySelector(".comments__comment")
                    ?.classList.remove("hidden");
            }
        });
    }
    sectionComment.classList.toggle("hidden");
    sectionFieldComment.classList.toggle("hidden");
    if (isCancel) {
        if (textarea) textarea.value = "";
        if (countSymbol) countSymbol.textContent = "0";
    } else if (textarea) {
        textarea.focus();
        textarea.select();
    }
}

list.addEventListener("click", toggleForm);

list.addEventListener("mouseover", () => {
    const count = textareaItem.value.length;
    if (!count) {
        buttonApply.classList.add("hidden");
    } else {
        buttonApply.classList.remove("hidden");
    }
});
list.addEventListener("input", () => {
    const count = textareaItem.value.length;
    if (!count) {
        buttonApply.classList.add("hidden");
    } else {
        buttonApply.classList.remove("hidden");
    }
});

list.addEventListener("input", () => {
    const count = textareaItem.value.length;
    countSymbol.textContent = count;
    if (count >= 256) {
        textareaItem.value = textareaItem.value.slice(0, 256);
        countSymbol.textContent = 256; // Обновляем счётчик
    }
});
