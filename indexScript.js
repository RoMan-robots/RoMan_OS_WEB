document.addEventListener('DOMContentLoaded',()=>{
  const reason = localStorage.getItem("reason");
    setTimeout(function() {
        if(reason == "oobe") {
          window.location.href = '/oobe.html'
        } else if(reason == "reboot"){
          window.location.href = '/desktop.html'
        } else {
          window.location.href = '/uefi.html'
        }
      }, 4000);
})