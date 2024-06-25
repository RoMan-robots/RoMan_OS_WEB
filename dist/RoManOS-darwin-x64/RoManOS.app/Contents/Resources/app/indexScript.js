document.addEventListener('DOMContentLoaded', () => {
  const reason = localStorage.getItem("reason");
  const password = localStorage.getItem("password");
    setTimeout(function () {
      if (reason == "oobe") {
        window.location.href = '/oobe.html'
      } else if (reason == "reboot") {
        if (password) {
          window.location.href = '/lock.html'
        } else {
          window.location.href = '/desktop.html'
        }
      } else {
        window.location.href = '/uefi.html'
      }
    }, 4000);
  })