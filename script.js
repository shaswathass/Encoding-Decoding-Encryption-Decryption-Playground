// BASE64 ENCODING
function encodeBase64() {
    let text = document.getElementById("inputText").value;
    let encoded = btoa(text);
    document.getElementById("outputText").value = encoded;
}

// BASE64 DECODING
function decodeBase64() {
    let text = document.getElementById("inputText").value;
    try {
        let decoded = atob(text);
        document.getElementById("outputText").value = decoded;
    } catch {
        alert("Invalid Base64 input!");
    }
}

// CAESAR ENCRYPTION (Shift 3)
function encryptCaesar() {
    let text = document.getElementById("inputText").value;
    let result = "";

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (char.match(/[a-z]/i)) {
            let code = text.charCodeAt(i);

            if (code >= 65 && code <= 90) {
                result += String.fromCharCode((code - 65 + 3) % 26 + 65);
            }
            else if (code >= 97 && code <= 122) {
                result += String.fromCharCode((code - 97 + 3) % 26 + 97);
            }
        } else {
            result += char;
        }
    }

    document.getElementById("outputText").value = result;
}

// CAESAR DECRYPTION
function decryptCaesar() {
    let text = document.getElementById("inputText").value;
    let result = "";

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (char.match(/[a-z]/i)) {
            let code = text.charCodeAt(i);

            if (code >= 65 && code <= 90) {
                result += String.fromCharCode((code - 65 - 3 + 26) % 26 + 65);
            }
            else if (code >= 97 && code <= 122) {
                result += String.fromCharCode((code - 97 - 3 + 26) % 26 + 97);
            }
        } else {
            result += char;
        }
    }

    document.getElementById("outputText").value = result;
}
