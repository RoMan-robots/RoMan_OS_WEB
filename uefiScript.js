const uefiButton = document.getElementsByClassName("uefi-button");

function runFromUEFI(){
    const bootSelect = document.querySelector(".select-boot").value;
    if(bootSelect == "usb"){
        window.electron.loadPage('installer.html');
    } else {
        document.querySelector(".uefi-elements").style.display = "none"
        document.querySelector(".error-screen").style.display = "block"
    }
}
function reboot(){
    window.electron.loadPage('index.html');
} 