const buttonComment = document.querySelector(".button-comment");
const buttonCancel = document.querySelector(".comment-form__button");
const commentForm = document.querySelector(".comment-form");
const textarea = document.querySelector(".comment-form__textarea");
const spanCount = document.querySelector(".comment-form__count-span");
const buttonSend = document.querySelector(".button-send");
buttonComment.addEventListener("click", () => {
    console.log("asadsasdasdads");
    scrollBy();
    commentForm.classList.toggle("hidden");
    commentForm.scrollIntoView({ inline: "end", behavior: "smooth" });
});

buttonCancel.addEventListener("click", () => {
    commentForm.classList.add("hidden");
});

textarea.addEventListener("mouseover", () => {
    const count = textarea.value.length;
    if (!count) {
        buttonSend.classList.add("hidden");
    } else {
        buttonSend.classList.remove("hidden");
    }
});

textarea.addEventListener("input", () => {
    const count = textarea.value.length;
    spanCount.textContent = count;
    if (!count) {
        buttonSend.classList.add("hidden");
    } else {
        buttonSend.classList.remove("hidden");
    }
    if (count >= 256) {
        textarea.value = textarea.value.slice(0, 256);
        spanCount.textContent = 256; // Обновляем счётчик
    }
});
