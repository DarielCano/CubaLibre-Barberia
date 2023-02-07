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

menu(".menu-btn", ".nav");

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

let $search = d.querySelector("input");
let $cardTexto = d.querySelectorAll(".card-texto");
let $cantCarrrito = d.querySelector(".cant-carrito");
let $agregarAlCarrito = d.querySelectorAll(".icon-tabler-shopping-cart-plus");

let $carrito = d.querySelector(".carrito");
let $vistaCarrito = d.querySelector(".vista_carrito");

/* CARGAR DATOS A USUARIO DE TIENDA */

let datos = inicioSesion("usuarioSesion");
const usuarioTienda =
  datos == false
    ? new Usuario_Tienda("", "", "", "", "", [])
    : new Usuario_Tienda(
        datos.nombre,
        datos.apellido,
        datos.telefono,
        datos.email,
        datos.contraseña,
        []
      );

$cantCarrrito.textContent = usuarioTienda.sumarProductos();

/* FUNCIONES */

const buscador = (e) => {
  $cardTexto.forEach((el) => {
    el.firstElementChild.textContent.toLowerCase().includes(e.target.value)
      ? el.parentNode.classList.remove("filter")
      : el.parentNode.classList.add("filter");
  });
};

export const renderCarrito = () => {
  let stringProd = "";
  let userTienda = getData("usuarioTienda");
  if (userTienda != null) {
    if (usuarioTienda.productos.length == 0) {
      stringProd = `No hay productos en su carrito`;

      $vistaCarrito.innerHTML = `<p> ${stringProd}</p>`;
      $vistaCarrito.classList.toggle("opacity");
    } else {
      let $tableContent = d.getElementById("table-content");
      for (let producto of usuarioTienda.productos) {
        stringProd =
          stringProd +
          `<tr><td>${producto.nombre}</td>
                                    <td>${producto.precio}</td>
                                    <td>${producto.cantidad}</td>
                                    <td><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <line x1="4" y1="7" x2="20" y2="7" />
                                    <line x1="10" y1="11" x2="10" y2="17" />
                                    <line x1="14" y1="11" x2="14" y2="17" />
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                  </svg></td></tr>`;
      }
      console.log(stringProd);
      console.log($tableContent);
      $tableContent.innerHTML = stringProd;
      $vistaCarrito.classList.toggle("opacity");
    }
  }
};

/* EVENTO DEL BUSCADOR */
$search.addEventListener("input", buscador);

/* VER CARRITO */
$carrito.addEventListener("click", (e) => {
  renderCarrito();

  /* ELIMINAR DEL CARRITO */

  let $trash = d.querySelectorAll(".icon-tabler-trash");

  $trash.forEach((el) => {
    el.addEventListener("click", (e) => {
      usuarioTienda.eliminarProducto(
        el.parentNode.parentNode.firstElementChild.textContent
      );
      setData("usuarioTienda", usuarioTienda);
      renderCarrito();

      $cantCarrrito.textContent = usuarioTienda.sumarProductos();

      Toastify({
        text: "Eliminado del carrito",
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        offset: {
          x: 5,
          y: 40,
        },

        style: {
          background: "#ff0000",
        },
      }).showToast();
    });
  });
});

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
    console.log(producto);

    usuarioTienda.agregarProducto(producto);
    setData("usuarioTienda", usuarioTienda);
    $cantCarrrito.textContent = usuarioTienda.sumarProductos();

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
export { usuarioTienda, $cantCarrrito };
