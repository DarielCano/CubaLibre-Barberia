import { menu } from "./menu.js";
import { scrollTop } from "./scroll.js";
import { Usuario, Usuario_barberia, leerDatos } from "./class_functions.js";

const d = document;
const w = window;

const datosUser = new Usuario("", "", "", "", "");
let sesion = "";
let users = [];
const $loader = d.querySelector(".form-loader");

export const leerTexto = (e) => {
  datosUser[e.target.id] = e.target.value;
};

const mensaje_modal = (nombreUsuario) => {
  let $modal = d.querySelector(".modal");
  let $msg = d.querySelector(".form-sesion-response");
  $modal.classList.remove("opacity");
  $msg.classList.remove("opacity");
  $msg.innerHTML = `<h2> Registro correcto!</h2>
                    <h3> Bienvenido ${nombreUsuario}</h3>
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

const comprobarDatosRegistro = (datos) => {
  if (datos.findIndex((elemento) => elemento.email == datosUser.email) != -1) {
    let $msg = d.querySelector(".msg");
    $msg.innerHTML = `<h3> Ya existe una cuenta con ese email </h3>`;
    $msg.classList.remove("none");
    setTimeout(() => {
      $msg.classList.add("none");
    }, 2000);
  } else if (
    datos.findIndex((elemento) => elemento.nombre == datosUser.nombre) != -1 &&
    datos.findIndex((elemento) => elemento.apellido == datosUser.apellido) != -1
  ) {
    let $msg = d.querySelector(".msg");
    $msg.innerHTML = `<h3> Ya existe una cuenta con ese nombre </h3>`;
    $msg.classList.remove("none");
    setTimeout(() => {
      $msg.classList.add("none");
    }, 2000);
  } else {
    console.log("entro aqui");
    datos.push(datosUser);
    console.log(datos);
    localStorage.setItem("usuarios", JSON.stringify(datos));
    sessionStorage.setItem("usuarioSesion", datosUser);

    sesion = true;
    sessionStorage.setItem("sesion", sesion);

    sessionStorage.setItem("usuarioSesion", JSON.stringify(datosUser));
    $loader.classList.remove("none");
    setTimeout(() => {
      $loader.classList.add("none");
      mensaje_modal(datosUser.nombre);
    }, 2000);

    setTimeout(() => {
      w.open("../index.html", "_self");
    }, 3000);
  }
};

const enviarDatos = (e) => {
  e.preventDefault();
  if (localStorage.length == 0) {
    users.push(datosUser);
    let usersString = JSON.stringify(users);
    localStorage.setItem("usuarios", usersString);
    sessionStorage.setItem("usuarioSesion", JSON.stringify(datosUser));
    $loader.classList.remove("none");
    setTimeout(() => {
      $loader.classList.add("none");
      mensaje_modal(datosUser.nombre);
    }, 2000);

    setTimeout(() => {
      w.open("../index.html", "_self");
    }, 3000);
  } else {
    let usuariosStorage = leerDatos("usuarios");

    comprobarDatosRegistro(usuariosStorage);
  }
};

const $nombre = d.querySelector("#nombre");
const $apellido = d.querySelector("#apellido");
const $telefono = d.querySelector("#telefono");
const $email = d.querySelector("#email");
const $password = d.querySelector("#password");
const $formRegistro = d.querySelector("#form_register");

$nombre.addEventListener("input", leerTexto);
$apellido.addEventListener("input", leerTexto);
$telefono.addEventListener("input", leerTexto);
$email.addEventListener("input", leerTexto);
$password.addEventListener("input", leerTexto);
/* export { usuarioBarber };*/
$formRegistro.addEventListener("submit", enviarDatos);

menu(".menu-btn", ".nav");
scrollTop(".header", ".nav");
