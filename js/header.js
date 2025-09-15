document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbar = document.querySelector(".navbar-custom");

  // Resaltar enlace activo
  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    if (linkHref === currentPath || (linkHref === "index.html" && currentPath === "")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Efecto scroll (fondo y sombra)
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Animación de entrada del navbar
  navbar.style.transform = "translateY(-100%)";
  navbar.style.opacity = "0";
  setTimeout(() => {
    navbar.style.transition = "transform 0.6s ease, opacity 0.6s ease";
    navbar.style.transform = "translateY(0)";
    navbar.style.opacity = "1";
  }, 100);
});
