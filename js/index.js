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
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "NO HA INICIAD SESION",
          text: "Debe iniciar sesión previamente para acceder a nuestros enlaces",
          showConfirmButton: false,
        });
      }, 2000);
      setTimeout(() => {
        w.open("../index.html", "_self");
      }, 3500);
    }
  });
});

menu(".menu-btn", ".nav");
scrollTop(".header", ".nav");

/////////////////////////////////////////////////////////////////////////////
