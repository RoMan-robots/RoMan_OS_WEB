async function hashSHA256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function compareSHA256(hash, message) {
    return await hashSHA256(message).then(computedHash => {
        return computedHash === hash;
    });
}

document.querySelector("#unlock").addEventListener("click", async () => {
    const storedHash = localStorage.getItem("password");
    const inputPassword = document.querySelector(".password").value;
    const isMatch = await compareSHA256(storedHash, inputPassword );

    if (isMatch) {
        window.electron.loadPage('desktop.html');
    } else {
        alert("Неправильний пароль");
    }
});