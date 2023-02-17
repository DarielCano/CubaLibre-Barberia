const d = document;
const w = window;
import { menu } from "./menu.js";
import { usuarioLogin } from "./loginUsuario.js";
import {
  Usuario_barberia,
  inicioSesion,
  setData,
  getData,
} from "./class_functions.js";

import { carrito } from "./carrito.js";
import { commonAnimation } from "./animation.js";
import { iniciarSesion } from "./class_functions.js";

iniciarSesion("./sesion.html");
commonAnimation();
usuarioLogin("./sesion.html");
carrito(".cant-carrito", ".carrito", ".vista_carrito");
menu(".menu-btn", ".nav");

/* EVENTO SCROLL PARTICULAR */
const $head = d.querySelector(".header"),
  $nav = d.querySelector(".nav");
w.addEventListener("scroll", (e) => {
  if (d.documentElement.scrollTop > 100) {
    $head.classList.add("header-background");
    if ($nav.matches(".is-active")) {
      $nav.classList.add("header-background");
    }
  } else {
    $head.classList.remove("header-background");
    if ($nav.matches(".is-active")) {
      $nav.classList.remove("header-background");
    }
  }
});

/* OBJETOS SERVICIO Y DATOS USUARIO PARA CITAS */
const datosUsuario = {
  fecha_cita: "",
  hora_cita: "",
};

/* CARGAR DATOS DE USUARIO Q INICIO SESION */
let datos = inicioSesion("usuarioSesion");
let usuario = getData("usuario_cita");
const usuarioBarber = !usuario
  ? new Usuario_barberia(
      datos.nombre,
      datos.apellido,
      datos.telefono,
      datos.email,
      datos.contraseña,
      [],
      datosUsuario
    )
  : new Usuario_barberia(
      usuario.nombre,
      usuario.apellido,
      usuario.telefono,
      usuario.email,
      usuario.contraseña,
      usuario.servicios,
      usuario.datosUsuario
    );

/* SELECTORES */
let $selector1 = d.querySelector(".sel1");
let $selector2 = d.querySelector(".sel2");
let $selector3 = d.querySelector(".sel3");

/* BLOQUES ASOCIADOS A LOS SELECTORES */
let $servicios = d.querySelector(".contenedor-cita__servicios");
let $info = d.querySelector(".contenedor-cita__info-cita");
let $resumen = d.querySelector(".contenedor-cita__resumen");

const $usuarioCitas = d.querySelector(".usuario");
const $cerrarSesion = d.querySelector(".usuario-sesion");

/* BLOQUES DE SERVICIOS */
let $bloquesServ = d.querySelectorAll(".bloque-servicios__servicio");

/* INFO CITA */
let $nombre = d.getElementById("nombre_cita");
let $fecha = d.getElementById("fecha_cita");
let $hora = d.getElementById("hora_cita");
let $btnAnteriorCita = d.querySelector(".anterior_cita");
let $btnSiguienteCita = d.querySelector(".sgte_cita");
let $btnAnteriorResumen = d.querySelector(".anterior_resumen");
let $btnReservarCita = d.querySelector(".reservar-cita");

let $resumenServicios = d.querySelector(".resumen-servicios");
let $resumenCita = d.querySelector(".resumen-cita");

/////////////////////////////////////////////////////////////////////
const addClase = (sel) => {
  sel.parentNode.classList.add("click-servicios");
  sel.classList.add("color-white");
};
const borrarCLase = (sel) => {
  sel.parentNode.classList.remove("click-servicios");
  sel.classList.remove("color-white");
};

///////////////////////////////////////////////////////////////////////////

/* ESTA FUNCION ACTUALIZA LOS SERVICIOS GUARDADOS UNA VEZ HECHA LA RESERVA(OPRIMIENDO EL BOTON RESERVAR). SI NO
SE HACE ASI, SE QUEDAN LOS VALORES PREVIAMENTE GUARDADOS */
const renderCita = () => {
  let reservado = getData("reservado");
  if (reservado == true) {
    /* reseteo de datos una vez agendada cita */
    usuarioBarber.servicios.length = 0;
    usuarioBarber.datosUsuario.fecha_cita = "";
    usuarioBarber.datosUsuario.hora_cita = "";
    setData("usuario_cita", usuarioBarber);
    setData("reservado", false);
  }

  $bloquesServ.forEach((el) => {
    if (
      usuarioBarber.servicios.findIndex(
        (value) => value.nombre == el.firstElementChild.textContent
      ) != -1
    )
      el.classList.add("border");
  });
  $usuarioCitas.textContent = ` ${usuarioBarber.nombre} ` || ``;
  $nombre.value = `${usuarioBarber.nombre} ${usuarioBarber.apellido}`;

  let stringServicios = usuarioBarber.mostrarServicios();
  $resumenServicios.innerHTML = `<h2 class="margin"> Resumen Servicios</h2>
                              <ul class="color-white" >${stringServicios}</ul>`;
  $resumenCita.innerHTML = `<h2 class="margin " > Resumen Cita</h2>
                            <h4 class="color-white margin"> FECHA: ${usuarioBarber.datosUsuario.fecha_cita}</h4>
                            <h4 class="color-white mrgin"> HORA: ${usuarioBarber.datosUsuario.hora_cita}</h4>`;
};

renderCita();
///////////////////////////////////////////////////////////////////////////////

/* CERRAR SESION DESDE CITA */
$cerrarSesion.addEventListener("click", (e) => {
  sessionStorage.removeItem("sesion");
  sessionStorage.removeItem("usuarioSesion");
  sessionStorage.removeItem("mensaje");
  location.href = "../index.html";
});

/* MENU DE CITAS */
d.addEventListener("click", (e) => {
  if (e.target.matches(".sel1")) {
    addClase($selector1, [$info, $resumen]);
    borrarCLase($selector2);
    borrarCLase($selector3);
    $servicios.classList.remove("none");
    $info.classList.add("none");
    $resumen.classList.add("none");
  } else if (e.target.matches(".sel2")) {
    addClase($selector2);
    borrarCLase($selector1);
    borrarCLase($selector3);
    $servicios.classList.add("none");
    $info.classList.remove("none");
    $resumen.classList.add("none");
  } else if (e.target.matches(".sel3")) {
    if (
      usuarioBarber.datosUsuario.fecha_cita &&
      usuarioBarber.datosUsuario.hora_cita &&
      usuarioBarber.servicios.length > 0
    ) {
      addClase($selector3);
      borrarCLase($selector2);
      borrarCLase($selector1);
      $servicios.classList.add("none");
      $info.classList.add("none");
      $resumen.classList.remove("none");
      let stringServicios = usuarioBarber.mostrarServicios();
      $resumenServicios.innerHTML = `<h2 class="margin"> Resumen Servicios</h2>
                                  <ul class="color-white" >${stringServicios}</ul>`;
      $resumenCita.innerHTML = `<h2 class="margin " > Resumen Cita</h2>
                                <h4 class="color-white margin"> FECHA: ${usuarioBarber.datosUsuario.fecha_cita}</h4>
                                <h4 class="color-white mrgin"> HORA: ${usuarioBarber.datosUsuario.hora_cita}</h4>`;
    } else {
      Swal.fire({
        icon: "error",
        title: "FALLO EN CITA",
        text: "Debe llenar los campos SERVICIOS, FECHA y HORA para agendar cita",
      });
    }
  }
});

/* EVENTO A BLOQUES DE SERVICIOS */
$bloquesServ.forEach((elemento) => {
  elemento.addEventListener("click", (e) => {
    const servicio = {
      nombre: "",
      precio: "",
    };

    servicio.nombre = elemento.firstElementChild.textContent;
    servicio.precio = elemento.lastElementChild.textContent;
    console.log(usuarioBarber);
    if (
      usuarioBarber.servicios.findIndex((v) => v.nombre == servicio.nombre) ==
      -1
    ) {
      elemento.classList.add("border");
      usuarioBarber.agregarServicio(servicio);
    } else {
      elemento.classList.remove("border");
      usuarioBarber.eliminarServicio(servicio);
    }
    setData("usuario_cita", usuarioBarber);
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/* INFORMACION CITA */

$fecha.addEventListener("input", (e) => {
  usuarioBarber.datosUsuario[e.target.id] = e.target.value;
  setData("usuario_cita", usuarioBarber);
  console.log($fecha.value);
});
$hora.addEventListener("input", (e) => {
  usuarioBarber.datosUsuario[e.target.id] = e.target.value;
  setData("usuario_cita", usuarioBarber);
});

$btnAnteriorCita.addEventListener("click", (e) => {
  addClase($selector1, [$info, $resumen]);
  borrarCLase($selector2);
  borrarCLase($selector3);
  $servicios.classList.remove("none");
  $info.classList.add("none");
  $resumen.classList.add("none");
});

$btnSiguienteCita.addEventListener("click", (e) => {
  if (
    usuarioBarber.datosUsuario.fecha_cita &&
    usuarioBarber.datosUsuario.hora_cita &&
    usuarioBarber.servicios.length > 0
  ) {
    addClase($selector3);
    borrarCLase($selector2);
    borrarCLase($selector1);
    $servicios.classList.add("none");
    $info.classList.add("none");
    $resumen.classList.remove("none");
    let stringServicios = usuarioBarber.mostrarServicios();
    $resumenServicios.innerHTML = `<h2 class="margin"> Resumen Servicios</h2>
                                <ul class="color-white" >${stringServicios}</ul>`;
    $resumenCita.innerHTML = `<h2 class="margin " > Resumen Cita</h2>
                              <h4 class="color-white margin"> FECHA: ${usuarioBarber.datosUsuario.fecha_cita}</h4>
                              <h4 class="color-white mrgin"> HORA: ${usuarioBarber.datosUsuario.hora_cita}</h4>`;
  } else {
    Swal.fire({
      icon: "error",
      title: "FALLO EN CITA",
      text: "Debe llenar los campos servicios, fecha y hora para agendar cita",
    });
  }
});

/* RESUMEN CITA */
$btnAnteriorResumen.addEventListener("click", (e) => {
  addClase($selector2);
  borrarCLase($selector1);
  borrarCLase($selector3);
  $servicios.classList.add("none");
  $info.classList.remove("none");
  $resumen.classList.add("none");
});

$btnReservarCita.addEventListener("click", (e) => {
  setData("usuario_cita", usuarioBarber);
  Swal.fire({
    icon: "success",
    title: "Cita Agendada",
    showConfirmButton: false,
  });
  setTimeout(() => {
    w.open("../index.html", "_self");
  }, 3000);

  setData("reservado", true);
});
