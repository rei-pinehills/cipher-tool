const infos = {
    caesar: "Caesar Cipher: shifts each letter by a fixed number. Used by Julius Caesar in 50 BC.",
    rot13: "ROT13: rotates each letter by 13 positions. Applying it twice returns the original text.",
    base64: "Base64: encodes binary data as text. Commonly used in web and email systems.",
};
function toggleShift() {
    const type = document.getElementById("cipherType").value;
    const shiftArea = document.getElementById("shift-area");
    const infoBox = document.getElementById("info-box");
    shiftArea.style.display = type === "caesar" ? "flex" : "none";
    infoBox.textContent = infos[type];
}
function encrypt() {
    const type = document.getElementById("cipherType").value;
    const text = document.getElementById("inputText").value;
    let result = "";

    if (type ==="caesar") {
        const shift =
     parseInt(document.getElementById("shiftNum").value);
        result = caesarShift(text, shift);
    } else if (type === "rot13") {
        result = caesarShift(text, 13);
    }else if (type === "base64") {
        result = btoa(text);
    }
    document.getElementById("result").textContent = result;
    document.getElementById("info-box").textContent = infos[type];
}
function decrypt() {
    const type = document.getElementById("cipherType").value;
    const text = document.getElementById("inputText").value;
    let result = "";

    if (type === "caesar") {
        const shift =
    parseInt(document.getElementById("shiftNum").value);
        result = caesarShift(text, 26 - shift);
    } else if (type === "rot13") {
        result = caesarShift(text, 13);
    } else if (type === "base64") {
        try {
            result = atob(text);
        } catch {
            result = "Invalid Base64 input!";
        }
    }
    document.getElementById("result").textContent = result;
}
function caesarShift(text, shift) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-zA-Z]/)) {
            const base = char === char.toUpperCase() ? 65 : 97;
            result += String.fromCharCode((char.charCodeAt(0) - base + shift) % 26 + base);
        } else {
            result += char;
        }
    }
    return result;
}
function clearAll() {
    document.getElementById("inputText").value = "";
    document.getElementById("result").textContent = "";
    document.getElementById("info-box").textContent = "";
}
window.onload = function() {
    toggleShift();
};

