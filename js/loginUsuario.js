const d = document;
const w = window;

/* SE ENCARGA DE ABRIR LA VENTANA DE INICIO DE SESION SI EL USUARIO NO HA INICIADO SESION O PARACERRAR SESION*/
export function usuarioLogin(dir) {
  let $userIcon = d.querySelector(".usuarioSesion");
  let sesion = sessionStorage.getItem("sesion");
  $userIcon.addEventListener("click", (e) => {
    if (sesion == null) {
      $userIcon.firstElementChild.classList.toggle("none");
      $userIcon.lastElementChild.classList.toggle("none");

      w.open(dir, "_self");
    } else {
      $userIcon.firstElementChild.classList.toggle("none");
      $userIcon.lastElementChild.classList.toggle("none");
      sessionStorage.removeItem("sesion");
      sessionStorage.removeItem("usuarioSesion");
      sessionStorage.removeItem("mensaje");
      w.open(dir, "_self");
    }
  });

  d.addEventListener("DOMContentLoaded", (e) => {
    if (sesion != null) {
      $userIcon.firstElementChild.classList.remove("none");
      $userIcon.lastElementChild.classList.add("none");
    }
  });
}
