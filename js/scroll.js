/* funcion usada para cambiar el color a la barra de navegacion(header cuando se hace scroll) */

const d = document,
  w = window;

export function scrollTop(head, nav) {
  const $head = d.querySelector(head),
    $nav = d.querySelector(nav);

  w.addEventListener("scroll", (e) => {
    /*  console.log(d.documentElement.scrollTop); */
    if (d.documentElement.scrollTop > 700) {
      /* se usa esa propiedad para saber cuantos pixeles ha recorrido en Y */
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
}
