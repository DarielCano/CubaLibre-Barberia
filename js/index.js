const d = document;
const w = window;

import { menu } from "./menu.js";
import { scrollTop } from "./scroll.js";

let $enlaces = d.querySelectorAll(".link");
console.log($enlaces);
$enlaces.forEach((enlace) => {
  enlace.addEventListener("click", (e) => {
    if (sessionStorage.getItem("sesion") == null) {
      e.preventDefault();
      Swal.fire({
        icon: "error",
        title: "NO HA INICIAD SESION",
        text: "Debe iniciar sesión previamente para acceder a nuestros enlaces",
      });
      w.open("./pages/sesion.html", "_self");
    }
  });
});

menu(".menu-btn", ".nav");
scrollTop(".header", ".nav");

/////////////////////////////////////////////////////////////////////////////
