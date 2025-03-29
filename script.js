function nextPage(i) {
    document.getElementById(`page${i}`).classList.add("hidden");
    document.getElementById(`page${i + 1}`).classList.remove("hidden");
    window.scrollTo(0, 0);
}

function prevPage(i) {
    document.getElementById(`page${i}`).classList.add("hidden");
    document.getElementById(`page${i - 1}`).classList.remove("hidden");
    window.scrollTo(0, 0);
}

function showPopup(message, isSubmit = false) {
    document.getElementById("popup-message").textContent = message;
    document.getElementById("popup").style.display = "flex";
    if (isSubmit) {
        document.querySelector(".popup-content button").onclick = function() {
            closePopup();
        };
    }
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function removeError(elementId) {
    document.getElementById(elementId).classList.remove("error");
}

function checkAllQuestions(start, end, prefix, messagePrefix, partPrefix = "") {
    for (let i = start; i <= end; i++) {
        let isAnswered = document.querySelector(`input[name="${prefix}${i}"]:checked`);
        let elementId = `${prefix}${i}${prefix.startsWith("Q") ? "-box" : "-row"}`;
        let element = document.getElementById(elementId);
        
        if (!isAnswered) {
            element.classList.add("error");
            showPopup(`Vui lòng trả lời ${messagePrefix} ${i}${prefix !== "Q" ? ` của phần ${partPrefix}` : ""} trước khi tiếp tục 😊!`);
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            return false;
        }
        element.classList.remove("error");
    }
    return true;
}

function handleNextPage(currentPage) {
    if (currentPage === 0) {
        let nameInput = document.querySelector('input[name="name"]');
        let nameValue = nameInput.value.trim();
        
        if (nameValue === "") {
            nameInput.classList.add("error");
            showPopup("Vui lòng cho mình biết tên bạn nhé 😉!");
            return;
        } else {
            nameInput.classList.remove("error");
            nextPage(0);
            return;
        }
    }
    if (currentPage === 1) {
        if (!checkAllQuestions(1, 6, "Q", "câu")) {
            return;
        }
        let Q6 = document.querySelector('input[name="Q6"]:checked');
        if (Q6.value === "1") {
            nextPage(1);
        } else if (Q6.value === "2") {
            document.getElementById("page1").classList.add("hidden");
            document.getElementById("page3").classList.remove("hidden");
        }
        return;
    } else if (currentPage === 2) {
        if (!checkAllQuestions(1, 3, "TC", "tiêu chí", "I")) return;
        if (!checkAllQuestions(1, 4, "ND", "tiêu chí", "II")) return;
        if (!checkAllQuestions(1, 3, "FL", "tiêu chí", "III")) return;
        if (!checkAllQuestions(1, 4, "RR", "tiêu chí", "IV")) return;
        if (!checkAllQuestions(1, 3, "TD", "tiêu chí", "V")) return;
        if (!checkAllQuestions(1, 4, "HV", "tiêu chí", "VI")) return;
        nextPage(2);
    }
}