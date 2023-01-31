const d = document;
const w = window;
import {
  leerTexto,
  leerDatos,
  Usuario_barberia,
  inicioSesion,
} from "./class_functions.js";

export function citas() {
  const $usuarioCitas = d.querySelector(".usuario");
  const cita = {
    servicio: "",
    precio: "",
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
  let bloquesServ = d.querySelectorAll(".bloque-servicios__servicio");

  /////////////////////////////////////////////////////////////////////
  const addClase = (sel) => {
    console.log(sel);
    console.log(sel.parentNode);
    sel.parentNode.classList.add("click-servicios");
    sel.classList.add("color-white");
  };
  const borrarCLase = (sel) => {
    sel.parentNode.classList.remove("click-servicios");
    sel.classList.remove("color-white");
  };
  ///////////////////////////////////////////////////////////////////////////

  /* CARGAR DATOS DE USUARIO Q INICIO SESION */
  let datos = inicioSesion();
  const usuarioBarber =
    datos == false
      ? new Usuario_barberia("", "", "", "", "", [])
      : new Usuario_barberia(
          datos.nombre,
          datos.apellido,
          datos.telefono,
          datos.email,
          datos.contraseña,
          []
        );

  console.log(datos);
  console.log(usuarioBarber);
  ///////////////////////////////////////////////////////////////////////////////

  $usuarioCitas.textContent = `${usuarioBarber.nombre}`;

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
  bloquesServ.forEach((elemento) => {
    elemento.addEventListener("click", (e) => {
      elemento.classList.toggle("border");
      /*       console.log(elemento); */
      /*   elemento.firstElementChild.classList.toggle("color-white");
      elemento.lastElementChild.classList.toggle("color-white"); */
    });
  });
}
