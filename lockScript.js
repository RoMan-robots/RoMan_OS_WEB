function unlock() {
    if (localStorage.getItem("password") == document.querySelector(".password").value) {
        window.location.href = "/desktop.html"
    } else {
        alert("Непроавильний пароль")
    }
}
