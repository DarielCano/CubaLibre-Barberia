const d = document;
const w = window;

/* SE ENCARGA DE ABRIR LA VENTANA DE INICIO DE SESION SI EL USUARIO NO LO HA HECHO */
export function usuarioLogin(dir) {
  let $userIcon = d.querySelector(".inicioSesion a");
  let sesion = sessionStorage.getItem("sesion");
  $userIcon.addEventListener("click", (e) => {
    e.preventDefault();

    if (sesion == null) w.open(dir);
  });
}
