let pendingOperation = null;
let currentText = "";

function handleOperation(type, buttonElement) {

    currentText = document.getElementById("inputText").value;

    document.querySelectorAll(".buttons button")
        .forEach(btn => btn.classList.remove("active"));

    buttonElement.classList.add("active");

    if (type === "encrypt" || type === "decrypt") {
        pendingOperation = type;
        openModal();
        return;
    }

    if (type === "encode") {
        document.getElementById("selectedOperation").textContent = "Base64 Encoding";
        document.getElementById("outputText").value = btoa(currentText);
    }

    if (type === "decode") {

        document.getElementById("selectedOperation").textContent = "Base64 Decoding";
        document.getElementById("decodeError").textContent = "";
        document.getElementById("outputText").value = "";
    
        let base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    
        if (!base64Regex.test(currentText) || currentText.length % 4 !== 0) {
            document.getElementById("decodeError").textContent =
                "Invalid Base64 input.";
            return;
        }
    
        let decoded = atob(currentText);
        document.getElementById("outputText").value = decoded;
    }
    
    
}

function openModal() {
    document.getElementById("keyModal").style.display = "flex";
    document.getElementById("modalKeyInput").value = "";
    document.getElementById("modalError").textContent = "";
}

function closeModal() {
    document.getElementById("keyModal").style.display = "none";
}

function submitKey() {

    let keyInput = document.getElementById("modalKeyInput").value;
    let errorText = document.getElementById("modalError");

    if (keyInput.trim() === "") {
        errorText.textContent = "Key is required.";
        return;
    }

    let key = parseInt(keyInput);

    if (isNaN(key) || key < 1 || key > 25) {
        errorText.textContent = "Key must be between 1 and 25.";
        return;
    }

    let result = "";

    if (pendingOperation === "encrypt") {
        result = caesarShift(currentText, key);
        document.getElementById("selectedOperation").textContent =
            "Caesar Encryption (Key: " + key + ")";
    } else {
        result = caesarShift(currentText, -key);
        document.getElementById("selectedOperation").textContent =
            "Caesar Decryption (Key: " + key + ")";
    }

    document.getElementById("outputText").value = result;
    closeModal();
}

function caesarShift(text, shift) {
    let result = "";

    for (let i = 0; i < text.length; i++) {
        let code = text.charCodeAt(i);

        if (code >= 65 && code <= 90) {
            result += String.fromCharCode((code - 65 + shift + 26) % 26 + 65);
        }
        else if (code >= 97 && code <= 122) {
            result += String.fromCharCode((code - 97 + shift + 26) % 26 + 97);
        }
        else {
            result += text[i];
        }
    }

    return result;
}

function toggleTheme() {
    document.body.classList.toggle("light");
    const label = document.getElementById("themeLabel");

    if (document.body.classList.contains("light")) {
        label.textContent = "Light Mode";
    } else {
        label.textContent = "Dark Mode";
    }
}
