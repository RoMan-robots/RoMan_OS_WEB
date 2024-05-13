document.addEventListener('DOMContentLoaded',()=>{
  const reason = new URLSearchParams(window.location.search).get('reason');
  console.log(reason)
    setTimeout(function() {
        if(reason == "oobe") {
          window.location.href = '/oobe.html'
        } else if(reason == "reboot"){
          
        } else {
          window.location.href = '/uefi.html'
        }
      }, 3500);
})