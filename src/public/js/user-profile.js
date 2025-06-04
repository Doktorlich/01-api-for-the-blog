const formName = document.querySelector(".profile__form-user-name");
const formEmail = document.querySelector(".profile__form-user-email");
const formPassword = document.querySelector(".profile__form-user-password");

function enableEditMode(event) {
    const clickedButtonEdit = event.target.closest(".profile__button-edit");

    if (!clickedButtonEdit) return;
    const form = clickedButtonEdit.closest(".profile__form-user");

    const buttonCancel = form.querySelector(".profile__button-cancel");
    const buttonSubmit = form.querySelector(".profile__button-submit");
    const inputEmail = form.querySelector(".profile__input");
    clickedButtonEdit.classList.add("hidden");
    buttonCancel.classList.remove("hidden");
    buttonSubmit.classList.remove("hidden");
    inputEmail.removeAttribute("disabled");
    inputEmail.focus();

    const inputFields = form.querySelectorAll(".profile__field-block");
    if (inputFields.length > 0) {
        inputFields.forEach(input => {
            input.classList.toggle("hidden"); // Переключаем класс
        });
    }
}
formName.addEventListener("click", enableEditMode);
formEmail.addEventListener("click", enableEditMode);
formPassword.addEventListener("click", enableEditMode);

// -------------------------------------------------------------------------------------------------
function disableEditMode(event) {
    const clickedButtonCancel = event.target.closest(".profile__button-cancel");

    if (!clickedButtonCancel) return;
    const form = clickedButtonCancel.closest(".profile__form-user");
    console.log(form);
    const buttonCancel = form.querySelector(".profile__button-cancel");
    const buttonSubmit = form.querySelector(".profile__button-submit");
    const buttonEdit = form.querySelector(".profile__button-edit");
    const inputEmail = form.querySelector(".profile__input");
    buttonEdit.classList.remove("hidden");
    buttonCancel.classList.add("hidden");
    buttonSubmit.classList.add("hidden");
    inputEmail.setAttribute("disabled", "");
    const inputFields = form.querySelectorAll(".profile__field-block");
    if (inputFields.length > 0) {
        inputFields.forEach(input => {
            input.classList.toggle("hidden"); // Переключаем класс
        });
    }
}
formName.addEventListener("click", disableEditMode);
formEmail.addEventListener("click", disableEditMode);
formPassword.addEventListener("click", disableEditMode);
