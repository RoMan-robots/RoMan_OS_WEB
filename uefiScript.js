const uefiButton = document.getElementsByClassName("uefi-button");

function runFromUEFI(){
    const bootSelect = document.querySelector(".select-boot").value;
    if(bootSelect == "usb"){
        console.log(bootSelect)
    } else {
        
    }
}