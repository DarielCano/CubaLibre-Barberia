const d = document;
const w = window;

import { menu } from "./menu.js";

import { setData } from "./class_functions.js";
import { usuarioLogin } from "./loginUsuario.js";
import { carrito } from "./carrito.js";
import { commonAnimation } from "./animation.js";

commonAnimation();
menu(".menu-btn", ".nav");
usuarioLogin("./sesion.html");
const usuarioTienda = carrito(".cant-carrito", ".carrito", ".vista_carrito");

/////////////////////////////////////////////////////////////////
/* CARGAR CARDS DINAMICAMENTE DESDE PRODUCTOS.JSON CON FETCH */

let $contentCards = d.querySelector(".cards");
let $card = "";
fetch("../productos.json")
  .then((res) => res.json())
  .then((data) => cargaProductos(data));

function cargaProductos(datos) {
  datos.forEach((el) => {
    $card += ` <div class="cards__card">
        <div class="card-img">
          <img src=${el.imgSrc} alt="" />
          <div class="block-cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-shopping-cart-plus"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="6" cy="19" r="2" />
              <circle cx="17" cy="19" r="2" />
              <path d="M17 17h-11v-14h-2" />
              <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
              <path d="M15 6h6m-3 -3v6" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-zoom-in"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="10" cy="10" r="7" />
              <line x1="7" y1="10" x2="13" y2="10" />
              <line x1="10" y1="7" x2="10" y2="13" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </div>
        </div>
        <div class="card-texto">
          <p class="prod-nombre">${el.nombre}</p>
          <strong class="prod-precio">$ ${el.precio}</strong>
        </div>
      </div>`;
  });

  $contentCards.innerHTML = $card;

  ///////////////////////////////////////////////////////////////////

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

  /* FUNCION BUSCADOR */
  const buscador = (e) => {
    if (e.key === "Escape") e.target.value = "";

    $cardTexto.forEach((el) =>
      el.textContent.includes(e.target.value) ||
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
}
