document.getElementById("continue1").addEventListener("click", function() {
    document.querySelector(".installer-div1").style.display = "none";
    document.querySelector(".installer-div2").style.display = "block";
});

document.getElementById("continue2").addEventListener("click", function() {
    document.querySelector(".installer-div2").style.display = "none";
    document.querySelector(".installer-div3").style.display = "block";
});

document.getElementById("back1").addEventListener("click", function() {
    document.querySelector(".installer-div2").style.display = "none";
    document.querySelector(".installer-div1").style.display = "block";
});

document.getElementById("back2").addEventListener("click", function() {
    document.querySelector(".installer-div3").style.display = "none";
    document.querySelector(".installer-div2").style.display = "block";
});

document.getElementById("continue3").addEventListener("click", function() {
    let disk = document.querySelector(".disk-select").value;
    let speedMultiplier;

    if (disk === "hdd") {
        let result = confirm("Через встановлення системи на HDD вона може працювати та інстальовуватися повільніше. Рекомендовано ставити на SSD. Ви дійсно хочете інсталювати на Seagate BarraCuda HDD 4TB?");
        if (!result) {
            return;
        }
        speedMultiplier = 0.7;
    } else {
        speedMultiplier = 1.4;
    }

    document.querySelector(".installer-div3").style.display = "none";
    document.querySelector(".installing-os").style.display = "block";

    let validateInfo = document.getElementById("validate-info");
    let copyFiles = document.getElementById("copy-files");
    let installingOS = document.getElementById("installing-os");
    let installingDrivers = document.getElementById("installing-drivers");
    let installingUpdates = document.getElementById("installing-updates");

    let progress = 0;
    let interval = setInterval(function() {
        progress += 0.06 * speedMultiplier;
        validateInfo.value = progress;
        if (progress >= 15) {
            clearInterval(interval); 
            let progress2 = 0;
            let interval2 = setInterval(function() {
                progress2 += 0.1 * speedMultiplier;
                copyFiles.value = progress2;
                if (progress2 >= 70) {
                    clearInterval(interval2); 
                    let progress3 = 0;
                    let interval3 = setInterval(function() {
                        progress3 += 0.1 * speedMultiplier; 
                        installingOS.value = progress3;
                        if (progress3 >= 120) {
                            clearInterval(interval3); 
                            let progress4 = 0;
                            let interval4 = setInterval(function() {
                                progress4 += 0.3 * speedMultiplier; 
                                installingDrivers.value = progress4;
                                if (progress4 >= 25) {
                                    clearInterval(interval4);
                                    let progress5 = 0;
                                    let interval5 = setInterval(function() {
                                        progress5 += 0.1 * speedMultiplier; 
                                        installingUpdates.value = progress5;
                                        if (progress5 >= 40) {
                                            clearInterval(interval5); 
                                            document.querySelector(".installing-os").style.display = "none";
                                            document.querySelector(".reload").style.display = "block";
                                        }
                                    }, 5);
                                }
                            }, 25);
                        }
                    }, 6);
                }
            }, 6);
        }
    }, 1);
});

function reboot(){
    localStorage.setItem("reason", "oobe")
    window.location.href = '/';
}