const d = document;
const w = window;
import { inicioSesion } from "./class_functions.js";
import { carrito } from "./carrito.js";
import { usuarioLogin } from "./loginUsuario.js";
import { commonAnimation } from "./animation.js";
import { iniciarSesion } from "./class_functions.js";

iniciarSesion("./sesion.html");
commonAnimation();
usuarioLogin("./sesion.html");
carrito(".cant-carrito", ".carrito", ".vista_carrito");

const user = inicioSesion("usuarioSesion");

let $nombreContacto = d.getElementById("nombre-contacto");
let $emailContacto = d.getElementById("email-contacto");
let $formContacto = d.getElementById("form-contacto");
let $loader = d.querySelector(".form-loader");

/* NOMBRE DE USUARIO QUE INICIO SESION */
$nombreContacto.value = `${user.nombre} ${user.apellido}`;
$emailContacto.value = `${user.email}`;

/* EVENTO DEL FORMULARIO */
$formContacto.addEventListener("submit", (e) => {
  e.preventDefault();
  $loader.classList.remove("none");
  fetch(`https://formsubmit.co/ajax/${user.email}`, {
    method: "POST",
    body: new FormData(e.target),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      $formContacto.reset();
    })
    .catch((err) => {
      let message =
        err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
      Swal.fire({
        title: "Error",
        text: `Error ${err.status}: ${message}`,
        icon: "error",
      });
    })
    .finally(() => {
      $loader.classList.add("none");
      Swal.fire({
        title: "Mensaje enviado",
        text: "Gracias por tus comentarios",
        icon: "success",
        showConfirmButton: false,
      });
    });

  setTimeout(() => {
    w.open("../index.html", "_self");
  }, 4000);
});
