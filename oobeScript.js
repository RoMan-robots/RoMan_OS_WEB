const oobeMusic = new Audio('./oobeMusic.mp3');
oobeMusic.play();

async function nextStep(step) {
    if (step == 1) {
        const timezoneSelect = document.getElementById('utc-select');
        const selectedTimezone = timezoneSelect.value;
        localStorage.setItem('timezone', selectedTimezone);
    } else if (step == 2) {
        let WiFiChoise = document.getElementById("wi-fi-select").value;
        if (WiFiChoise == "wi-fi-premium") {
            alert("WiFi Error: ця мережа не може бути застосована на вашому комп'ютері, відсутній Premium Chip X. Будь ласка, підключіться до іншої мережі");
            return;
        } else if (WiFiChoise == "wi-fi-virus") {
            document.querySelector(`.oobe${step}`).style.display = "none";
            document.querySelector(`.wi-fi-error-screen`).style.display = "block";
            
            const keysToRemove = ['password', 'reason', 'notes', "adminName", "timezone", "wifi"];

            keysToRemove.forEach(key => {
                localStorage.removeItem(key);
            });

            fatalReboot()
            return;
        } else if (WiFiChoise == "wi-fi-free") {
            localStorage.setItem("wifi", "connected")
        } else {
            alert("WiFi Error: Ваш комп'ютер не підтримує серверні мережи. Будь ласка, підключіться до іншого WiFi");
            return;
        }
    } else if (step >= 3 && step < 7) {
        const allName = document.getElementById('all-name').value;
        const username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        if (!allName || !username) {
            alert("Будь ласка, заповніть повне ім'я та ім'я адміністратора");
            return;
        }
        localStorage.setItem('adminName', username);

        if (password) {
            await hashSHA256(password)
        }

        setInterval(async () => {
            await nextStep(step + 1);
        }, 3500);
    }
    document.querySelector(`.oobe${step}`).style.display = "none";
    document.querySelector(`.oobe${step + 1}`).style.display = "block";
}

async function hashSHA256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    localStorage.setItem("password", hashArray.map(b => b.toString(16).padStart(2, '0')).join(''))
}

async function skipWiFi() {
    document.querySelector(`.oobe2`).style.display = "none";
    document.querySelector(`.oobe3`).style.display = "block";
}

function fatalReboot() {
    window.location.href = "/";
}

function reboot() {
    localStorage.setItem("reason", "reboot")
    window.location.href = "/";
}