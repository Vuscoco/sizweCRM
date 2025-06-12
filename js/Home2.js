document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const menuToggle = document.querySelector(".menu-toggle");

    menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        menuToggle.classList.toggle("rotate");
    });
});