function checkName() {
    let nameInput = document.getElementById('I1-row').value;
    
    nameInput = nameInput.trim().split(/\s+/).map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
    const nameParts = nameInput.split(/\s+/);
    const length = nameParts.length;
    let userDisplay = "";

    if (length === 1) {
        userDisplay = nameParts[0];
    } else {
        const lastWord = nameParts[length - 1];
        if (lastWord.toLowerCase() === "anh") {
            userDisplay = `${nameParts[length - 2]} Anh`;
        } else {
            userDisplay = lastWord;
        }
    }
    let userNameElements = document.getElementsByClassName('userName');
    for (let element of userNameElements) {
        element.textContent = userDisplay;
    }

}
function checkYear() {
    let genderInput = document.querySelector('input[name="I2"]:checked');
    let yearInput = document.querySelector('input[name="I3"]:checked');
    let personalPronoun = "";
    let usPronoun = "chúng tớ ";
    if (yearInput.value ==="1" || yearInput.value ==="2") {
        let usPElements = document.getElementsByClassName('us');
        for (let element of usPElements) {
            element.textContent = usPronoun;
        }
        return;
    }
    else if (yearInput.value === "3" || yearInput.value === "4") {
        if (genderInput.value === "1"){
            personalPronoun = "anh ";
        } else personalPronoun = "chị ";
        usPronoun = "chúng em ";
    }
    let userPPElements = document.getElementsByClassName('userPP');
    let usPElements = document.getElementsByClassName('us');
    for (let element of userPPElements) {
        element.textContent = personalPronoun;
    }
    for (let element of usPElements) {
        element.textContent = usPronoun;
    }
}
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

function checkAllQuestions(start, end, prefix, messagePrefix, partPrefix = "", customMessage = "") {
    for (let i = start; i <= end; i++) {
        let isAnswered = document.querySelector(`input[name="${prefix}${i}"]:checked`);
        let elementId = `${prefix}${i}${prefix.startsWith("Q") ? "-box" : "-row"}`;
        let element = document.getElementById(elementId);
        
        if (!isAnswered) {
            element.classList.add("error");
            if (customMessage === "") {
            showPopup(`Vui lòng trả lời ${messagePrefix} ${i}${prefix !== "Q" ? ` của phần ${partPrefix}` : ""} trước khi tiếp tục 😊!`);
            } else {
                showPopup(customMessage);
            }
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            return false;
        }
        element.classList.remove("error");
    }
    return true;
}

function handleNextPage(currentPage) {
    if (currentPage === 0) {
        let nameInput = document.querySelector('input[name="I1"]');
        let nameValue = nameInput.value.trim();
        
        if (nameValue === "") {
            nameInput.classList.add("error");
            showPopup("Cho chúng tớ được biết tên bạn nhé 😉!");
            return;
        } else {
            nameInput.classList.remove("error");
            if (!checkAllQuestions(2, 2, "I", "câu", "", "Chúng tớ xin phép được biết giới tính của bạn với 😉!")
                || !checkAllQuestions(3, 3, "I", "câu", "", "Bạn có thể nói cho chúng tớ biết bạn là sinh viên năm mấy không 😉!")) {
                return;
            } nextPage(0);
        }
    }
    if (currentPage === 2) {
        if (!checkAllQuestions(1, 5, "Q", "câu")) {
            return;
        }
        let Q5 = document.querySelector('input[name="Q5"]:checked');
        if (Q5.value === "1") {
            nextPage(2);
        } else if (Q5.value === "2") {
            document.getElementById("page2").classList.add("hidden");
            document.getElementById("page4").classList.remove("hidden");
        }
        return;
    } else if (currentPage === 3) {
        if (!checkAllQuestions(1, 3, "TC", "tiêu chí", "I")) return;
        if (!checkAllQuestions(1, 4, "ND", "tiêu chí", "II")) return;
        if (!checkAllQuestions(1, 3, "FL", "tiêu chí", "III")) return;
        if (!checkAllQuestions(1, 4, "RR", "tiêu chí", "IV")) return;
        if (!checkAllQuestions(1, 3, "TD", "tiêu chí", "V")) return;
        if (!checkAllQuestions(1, 4, "HV", "tiêu chí", "VI")) return;
        nextPage(3);
    }
}
