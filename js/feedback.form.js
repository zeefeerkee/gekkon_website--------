document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");
    const modal = new bootstrap.Modal(
        document.getElementById("staticBackdrop")
    );
    const chatId = "5103610748";
    const botToken = "5965078368:AAFhdT6yAogawtjz1fs-lMJs2aCCJenBSRY";

    // Функция проверки валидности формы
    function validateForm() {
        if (form.checkValidity()) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    // Обработка события input для проверки валидности
    form.addEventListener("input", validateForm);

    // Обработка события клика по кнопке "Получить ответ"
    submitBtn.addEventListener("click", function () {
        if (form.checkValidity()) {
            // Закрываем модальное окно
            const fieldIds = [
                "firstName",
                "lastName",
                "formEmail",
                "formTelephone",
                "formComment",
            ];
            const formData = {};

            fieldIds.forEach((id) => {
                const field = form.querySelector(`#${id}`);
                if (field) {
                    if (field.type === "checkbox") {
                        formData[id] = field.checked; // Для чекбоксов используем checked
                    } else {
                        formData[id] = field.value; // Для остальных полей используем value
                    }
                }
            });

            // Формируем текст сообщения
            let messageText = "Новое сообщение!\n\n";
            fieldIds.forEach((id) => {
                messageText += `${formData[id]}\n`;
            });
            console.log(messageText);
            fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: messageText,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Message sent:", data);
                    contactFormContainer.innerHTML =
                        "<p>Спасибо за ваше обращение!</p>";
                    setTimeout(() => {
                        contactFormContainer.classList.remove("visible");
                    }, 2000);
                })
                .catch((error) => {
                    console.error("Error sending message:", error);
                });
            modal.hide();

            // Можно добавить код для отправки данных на сервер или другой обработки
        } else {
            validateForm();
        }
    });
});
