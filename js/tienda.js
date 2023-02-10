const d = document;
const w = window;

import { menu } from "./menu.js";
/* import { scrollTop } from "./scroll.js"; */
import {
  Usuario_Tienda,
  setData,
  getData,
  inicioSesion,
} from "./class_functions.js";
import { usuarioLogin } from "./loginUsuario.js";
import { carrito } from "./carrito.js";

menu(".menu-btn", ".nav");
usuarioLogin("./sesion.html");

const usuarioTienda = carrito(
  ".cant-carrito",
  ".carrito",
  ".vista_carrito",
  ".table-cont"
);

/* EVENTO PARA LA NAV-BAR DE TIENDA(PARTICULAR OR EL COLOR DE LAS CARDS) */
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

/* DECLARACION DE VARIABLES */

let $search = d.getElementById("input_search");
let $agregarAlCarrito = d.querySelectorAll(".icon-tabler-shopping-cart-plus");
let $cardTexto = d.querySelectorAll(".card-texto");
let $cantCarrrito = d.querySelector(".cant-carrito");

const buscador = (e) => {
  if (e.key === "Escape") e.target.value = "";

  $cardTexto.forEach((el) =>
    el.textContent.toLowerCase().includes(e.target.value)
      ? el.parentNode.classList.remove("filter")
      : el.parentNode.classList.add("filter")
  );
};

/* EVENTO DEL BUSCADOR */

$search.addEventListener("input", buscador);

/* AGREGAR AL CARRITO */

$agregarAlCarrito.forEach((el) => {
  const producto = {
    nombre: "",
    precio: "",
    cantidad: "",
  };
  el.addEventListener("click", (e) => {
    producto.nombre =
      el.parentNode.parentNode.parentNode.lastElementChild.firstElementChild.textContent;
    producto.precio =
      el.parentNode.parentNode.parentNode.lastElementChild.lastElementChild.textContent;

    usuarioTienda.agregarProducto(producto);
    $cantCarrrito.textContent = usuarioTienda.sumarProductos();
    let prob = usuarioTienda.sumarProductos();

    setData("usuarioTienda", usuarioTienda);

    Toastify({
      text: "Agregado al carrito",
      duration: 1000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      offset: {
        x: 5,
        y: 40,
      },

      style: {
        background: "rgb(65, 115, 249, 0.9)",
      },
    }).showToast();
  });
});
