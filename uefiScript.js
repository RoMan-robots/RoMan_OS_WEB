const uefiButton = document.getElementsByClassName("uefi-button");

function runFromUEFI(){
    const bootSelect = document.querySelector(".select-boot").value;
    if(bootSelect == "usb"){
        window.location.href = '/installer.html';
    } else {
        document.querySelector(".uefi-elements").style.display = "none"
        document.querySelector(".error-screen").style.display = "flex"
    }
}
function reboot(){
    window.location.href = '/';
}