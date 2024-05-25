const oobeMusic = new Audio('./oobeMusic.mp3');
oobeMusic.play();

function nextStep(step) {
    if (step == 2) {
        let WiFiChoise = document.getElementById("wi-fi-select").value;
        if (WiFiChoise == "wi-fi-premium") {
            alert("WiFi Error: ця мережа не може бути застосована на вашому комп'ютері, відсутній Premium Chip X. Будь ласка, підключіться до іншої мережі");
            return;
        } else if (WiFiChoise == "wi-fi-virus") {
            document.querySelector(`.oobe${step}`).style.display = "none";
            document.querySelector(`.wi-fi-error-screen`).style.display = "block";
            return;
        } else if(WiFiChoise == "wi-fi-free"){

        } else {
            alert("WiFi Error: Ваш комп'ютер не підтримує серверні мережи. Будь ласка, підключіться до іншого WiFi");
            return;
        }
    }else if(step >= 3 && step < 7){
        const allName = document.getElementById('all-name').value;
        const username = document.getElementById('username').value;
        if(!allName || !username){
            alert("Будь ласка, заповніть повне ім'я та ім'я адміністратора");
            return;
        }
        localStorage.setItem('adminName', username);
        setInterval(()=>{
            nextStep(step +1)
        }, 3500);
    }
    document.querySelector(`.oobe${step}`).style.display = "none";
    document.querySelector(`.oobe${step + 1}`).style.display = "block";
}

function skipWiFi() {
    document.getElementById("wi-fi-select").value = "wi-fi-free";
    nextStep(2)
}

function fatalReboot() {
    window.location.href = "/";
}
function reboot() {
    window.location.href = "/?reason=reboot";
}