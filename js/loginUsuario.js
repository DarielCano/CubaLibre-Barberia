const d = document;
const w = window;

export function usuarioLogin(dir) {
  let $userIcon = d.querySelector(".inicioSesion a");
  let sesion = sessionStorage.getItem("sesion");
  $userIcon.addEventListener("click", (e) => {
    e.preventDefault();

    if (sesion == null) w.open(dir);
  });
}
