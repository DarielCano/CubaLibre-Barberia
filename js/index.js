const d = document;
const w = window;

import { menu } from "./menu.js";
import { scrollTop } from "./scroll.js";
import { usuarioLogin } from "./loginUsuario.js";
import { carrito } from "./carrito.js";
import { commonAnimation } from "./animation.js";
import { mostrarPais } from "./mostrarPais.js";

commonAnimation();
usuarioLogin("./pages/sesion.html");
carrito(".cant-carrito", ".carrito", ".vista_carrito");

//////////////////////////////////////////////////////////////////////////////////////////////

/* if (sessionStorage.getItem("sesion") == true) */
d.addEventListener("DOMContentLoaded", mostrarPais);

let $enlaces = d.querySelectorAll(".link");

$enlaces.forEach((enlace) => {
  enlace.addEventListener("click", (e) => {
    if (sessionStorage.getItem("sesion") == null) {
      e.preventDefault();
      Swal.fire({
        icon: "error",
        title: "NO HA INICIADO SESION",
        text: "Debe iniciar sesión previamente",
        showConfirmButton: false,
      });

      setTimeout(() => {
        w.open("./pages/sesion.html", "_self");
      }, 2000);
    }
  });
});

menu(".menu-btn", ".nav");
scrollTop(".header", ".nav");

/////////////////////////////////////////////////////////////////////////////
