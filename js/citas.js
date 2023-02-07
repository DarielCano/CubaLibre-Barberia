const d = document;
const w = window;
import { menu } from "./menu.js";
import {
  leerDatos,
  Usuario_barberia,
  Usuario,
  getData,
  inicioSesion,
  setData,
} from "./class_functions.js";
import { renderCarrito, usuarioTienda, $cantCarrrito } from "./tienda.js";
menu(".menu-btn", ".nav");

const $usuarioCitas = d.querySelector(".usuario");

/* OBJETOS SERVICIO Y DATOS USUARIO PARA CITAS */
const datosUsuario = {
  fecha_cita: "",
  hora_cita: "",
};

/* SELECTORES */
let $selector1 = d.querySelector(".sel1");
let $selector2 = d.querySelector(".sel2");
let $selector3 = d.querySelector(".sel3");

/* BLOQUES ASOCIADOS A LOS SELECTORES */
let $servicios = d.querySelector(".contenedor-cita__servicios");
let $info = d.querySelector(".contenedor-cita__info-cita");
let $resumen = d.querySelector(".contenedor-cita__resumen");

/* BLOQUES DE SERVICIOS */
let $bloquesServ = d.querySelectorAll(".bloque-servicios__servicio");

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

/* CARGAR DATOS DE USUARIO Q INICIO SESION */
let datos = inicioSesion("usuarioSesion");
const usuarioBarber =
  datos == false
    ? new Usuario_barberia("", "", "", "", "", [], {})
    : new Usuario_barberia(
        datos.nombre,
        datos.apellido,
        datos.telefono,
        datos.email,
        datos.contraseña,
        [],
        datosUsuario
      );

///////////////////////////////////////////////////////////////////////////////

$usuarioCitas.textContent = ` ${usuarioBarber.nombre} ` || ``;

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
    addClase($selector3);
    borrarCLase($selector2);
    borrarCLase($selector1);
    $servicios.classList.add("none");
    $info.classList.add("none");
    $resumen.classList.remove("none");
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
    console.log(usuarioBarber.servicios);
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
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/* INFORMACION CITA */

let $nombre = d.getElementById("nombre_cita");
let $fecha = d.getElementById("fecha_cita");
let $hora = d.getElementById("hora_cita");
let $btnAnteriorCita = d.querySelector(".anterior_cita");
let $btnSiguienteCita = d.querySelector(".sgte_cita");
let $btnAnteriorResumen = d.querySelector(".anterior_resumen");
let $btnReservarCita = d.querySelector(".reservar-cita");

let $resumenServicios = d.querySelector(".resumen-servicios");
let $resumenCita = d.querySelector(".resumen-cita");

console.log($nombre.value);
$nombre.value = `${usuarioBarber.nombre} ${usuarioBarber.apellido}`;
$fecha.addEventListener("input", (e) => {
  datosUsuario[e.target.id] = e.target.value;
  console.log(datosUsuario.fecha_cita);
});
$hora.addEventListener("input", (e) => {
  datosUsuario[e.target.id] = e.target.value;
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
                            <h4 class="color-white margin"> FECHA: ${datosUsuario.fecha_cita}</h4>
                            <h4 class="color-white mrgin"> HORA: ${datosUsuario.hora_cita}</h4>`;
});

$btnAnteriorResumen.addEventListener("click", (e) => {
  addClase($selector2);
  borrarCLase($selector1);
  borrarCLase($selector3);
  $servicios.classList.add("none");
  $info.classList.remove("none");
  $resumen.classList.add("none");
});

$btnReservarCita.addEventListener("click", (e) => {
  if (datosUsuario.fecha_cita || datosUsuario.hora_cita) {
    setData("usuario_cita", usuarioBarber);
    Swal.fire({
      icon: "success",
      title: "Cita Agendada",
      showConfirmButton: false,
    });
    setTimeout(() => {
      w.open("../index.html", "_self");
    }, 3000);
  } else {
    Swal.fire({
      icon: "error",
      title: "FALLO EN CITA",
      text: "Debe llenar los campos servicios, fecha y hora para agendar cita",
    });
  }
});
