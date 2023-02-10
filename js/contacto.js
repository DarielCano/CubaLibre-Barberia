const d = document;
const w = window;
import { inicioSesion } from "./class_functions.js";
import { carrito } from "./carrito.js";
import { usuarioLogin } from "./loginUsuario.js";

usuarioLogin("./sesion.html");
carrito(
  ".cant-carrito",
  ".carrito",
  ".vista_carrito",
  ".table-cont",
  ".icon-tabler-trash"
);

const user = inicioSesion("usuarioSesion");

let $nombreContacto = d.getElementById("nombre-contacto");
let $emailContacto = d.getElementById("email-contacto");
let $mensajeContacto = d.getElementById("mensaje-contacto");
let $formContacto = d.getElementById("form-contacto");
let $loader = d.querySelector(".form-loader");

$nombreContacto.value = `${user.nombre} ${user.apellido}`;
$emailContacto.value = `${user.email}`;

$formContacto.addEventListener("submit", (e) => {
  e.preventDefault();
  $loader.classList.remove("none");
  setTimeout(() => {
    $loader.classList.add("none");
    Swal.fire({
      title: "Mensaje enviado",
      text: "Gracias por tus comentarios",
      icon: "success",
      showConfirmButton: false,
    });
    console.log();
    $formContacto.reset();
  }, 2000);
  setTimeout(() => {
    w.open("../index.html", "_self");
  }, 3500);
});
