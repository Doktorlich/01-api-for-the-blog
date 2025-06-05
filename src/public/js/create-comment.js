const buttonComment = document.querySelector(".button-comment");
const buttonCancel = document.querySelector(".comment-form__button");
const commentForm = document.querySelector(".comment-form");
const textarea = document.querySelector(".comment-form__textarea");
const spanCount = document.querySelector(".comment-form__count-span");
buttonComment.addEventListener("click", () => {
    console.log("asadsasdasdads");
    scrollBy();
    commentForm.classList.remove("hidden");
    commentForm.scrollIntoView({ inline: "end", behavior: "smooth" });
});

buttonCancel.addEventListener("click", () => {
    commentForm.classList.add("hidden");
});

textarea.addEventListener("input", () => {
    const count = textarea.value.length;
    spanCount.textContent = count;

    if (count >= 256) {
        textarea.value = textarea.value.slice(0, 256);
        spanCount.textContent = 256; // Обновляем счётчик
    }
});
