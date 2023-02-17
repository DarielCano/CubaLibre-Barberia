const d = document;
const w = window;

import { menu } from "./menu.js";
import { scrollTop } from "./scroll.js";
import { Usuario, leerDatos } from "./class_functions.js";

const datos = new Usuario("", "", "", "", "");
let sesion;

const $loader = d.querySelector(".form-loader");

const leerTexto = (e) => {
  datos[e.target.id] = e.target.value;
};

/* COMPROBANDO DATOS */
const comprobarDatos = (users) => {
  const $mensaje1 = d.querySelector(".msg1");
  const $mensaje2 = d.querySelector(".msg2");
  const $mensaje3 = d.querySelector(".msg3");

  if (users === null) {
    $mensaje3.classList.remove("none");
    setTimeout(() => {
      $mensaje3.classList.add("none");
    }, 5000);
    return false;
  }

  let index = users.findIndex((elemento) => elemento.email == datos.email);
  console.log(index);

  if (index == -1) {
    $mensaje1.classList.remove("none");
    setTimeout(() => {
      $mensaje1.classList.add("none");
    }, 2000);
  } else {
    if (users[index].password !== datos.password) {
      $mensaje2.classList.remove("none");
      setTimeout(() => {
        $mensaje2.classList.add("none");
      }, 2000);
    } else {
      sesion = true;
      sessionStorage.setItem("sesion", sesion);
      sessionStorage.setItem("usuarioSesion", JSON.stringify(users[index]));
      $loader.classList.remove("none");
      setTimeout(() => {
        $loader.classList.add("none");
        mensaje_modal(users[index].nombre);
      }, 3000);

      setTimeout(() => {
        w.open("../index.html", "_self");
      }, 4000);
    }
  }
};

/* MENSAJE DE BIENVENIDA */
const mensaje_modal = (nombreUsuario) => {
  let $modal = d.querySelector(".modal");
  let $msg = d.querySelector(".form-sesion-response");
  $modal.classList.remove("opacity");
  $msg.classList.remove("opacity");
  $msg.innerHTML = `<h3> Bienvenido ${nombreUsuario}</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24">
        <path d="M12,18c4,0,5-4,5-4H7C7,14,8,18,12,18z" />
        <path
          d="M12,2C6.486,2,2,6.486,2,12c0,5.514,4.486,10,10,10s10-4.486,10-10C22,6.486,17.514,2,12,2z M12,20c-4.411,0-8-3.589-8-8 s3.589-8,8-8s8,3.589,8,8S16.411,20,12,20z" />
        <path
          d="M13 12l2 .012C15.012 11.55 15.194 11 16 11s.988.55 1 1h2c0-1.206-.799-3-3-3S13 10.794 13 12zM8 11c.806 0 .988.55 1 1h2c0-1.206-.799-3-3-3s-3 1.794-3 3l2 .012C7.012 11.55 7.194 11 8 11z" />
      </svg>`;

  setTimeout(() => {
    $modal.classList.add("opacity");
    $msg.classList.add("opacity");
  }, 3000);
};

/* ENVIAR DATOS */
const enviarDatos = (e) => {
  e.preventDefault();
  let usuariosStorage = leerDatos("usuarios");

  comprobarDatos(usuariosStorage);
};

const $email = d.querySelector("#email");
const $password = d.querySelector("#password");
const $formulario = d.querySelector("#sesion-form");

/* EVENTO DE INPUTS */
$email.addEventListener("input", leerTexto);
$password.addEventListener("input", leerTexto);

/* EVENTO DEL FORMULARIO */
$formulario.addEventListener("submit", enviarDatos);

menu(".menu-btn", ".nav");
scrollTop(".header", ".nav");
