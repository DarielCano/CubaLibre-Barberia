const d = document;

/* ANIMACION PARA LOGO */
export function commonAnimation() {
  setInterval(() => {
    myAnimation();
  }, 2500);
}

function myAnimation() {
  let $logo = d.querySelector(".header__logo");
  if ($logo.matches(".animate__flip")) {
    $logo.classList.remove("wow", "animate__animated", "animate__flip");
  } else {
    $logo.classList.add("wow", "animate__animated", "animate__flip");
  }
}
