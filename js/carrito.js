const d = document;
const w = window;

import {
  Usuario_Tienda,
  inicioSesion,
  getData,
  setData,
} from "./class_functions.js";

export function carrito(cantCarrito, carrito, vistaCarrito) {
  let $cantCarrrito = d.querySelector(cantCarrito);
  let $carrito = d.querySelector(carrito);
  let $vistaCarrito = d.querySelector(vistaCarrito);
  const nproducto = {
    nombre: "",
    precio: "",
    cantidad: "",
  };
  /* CARGAR DATOS A USUARIO DE TIENDA */

  let datos = inicioSesion("usuarioSesion");
  let usuario = getData("usuarioTienda");
  const usuarioTienda = !usuario
    ? new Usuario_Tienda(
        datos.nombre,
        datos.apellido,
        datos.telefono,
        datos.email,
        datos.contraseña,
        []
      )
    : new Usuario_Tienda(
        usuario.nombre,
        usuario.apellido,
        usuario.telefono,
        usuario.email,
        usuario.contraseña,
        usuario.productos
      );

  $cantCarrrito.textContent = usuarioTienda.sumarProductos();

  const renderCarrito = () => {
    let stringProd = "";
    if (usuarioTienda.productos.length == 0) {
      stringProd = `No hay productos en su carrito`;

      $vistaCarrito.innerHTML = ` <div class= "disp-flex"><p> ${stringProd}</p> <div class="rowTrash btnCLoseCarrito block"><span> X </span></div> </div>`;
    } else {
      stringProd = ` <table class="table">
      <thead>
        <tr>
          <th scope="col">Producto</th>
          <th scope="col">Precio</th>
          <th scope="col">Cantidad</th>
          <th scope="col" class="rowTrash btnCLoseCarrito"><span> X </span></th>
        </tr>
      </thead>`;
      for (let producto of usuarioTienda.productos) {
        stringProd =
          stringProd +
          `<tbody class="table-cont"> <tr><td>${producto.nombre}</td>
                                          <td>${producto.precio}</td>
                                          <td class="prod_cant"> <strong class ="prod_add"> + </strong> <strong> ${producto.cantidad}</strong> <strong class ="prod_subtract"> - </strong> </td>
                                          <td><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                          <line x1="4" y1="7" x2="20" y2="7" />
                                          <line x1="10" y1="11" x2="10" y2="17" />
                                          <line x1="14" y1="11" x2="14" y2="17" />
                                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                        </svg></td></tr>`;
      }

      $vistaCarrito.innerHTML =
        stringProd +
        `</tbody></table> 
                              <p class= "monto"> Total a pagar: $${usuarioTienda.calcularMonto()}</p>
                              <button class= "comprarCarrito btn">Comprar</button>`;

      incrementarProducto();
      decrementarProducto();
      eliminarProducto();
      comprarCarrito();
    }

    /* CERRAR CARRITO */
    let $closeCarrito = d.querySelector(".btnCLoseCarrito");
    $closeCarrito.addEventListener("click", (e) => {
      $vistaCarrito.classList.add("opacity");
    });
  };

  /* COMPRAR CARRITO */
  const comprarCarrito = () => {
    let $comprar = d.querySelector(".comprarCarrito");
    $comprar.addEventListener("click", (e) => {
      usuarioTienda.productos.length = 0;
      $cantCarrrito.textContent = usuarioTienda.sumarProductos();
      Swal.fire({
        icon: "success",
        title: "Gracias por su compra",
        confirmButtonText: "Seguir comprando",
      });
      setData("usuarioTienda", usuarioTienda);
      $vistaCarrito.classList.add("opacity");
      renderCarrito();
    });
  };

  /* VER CARRITO, INCREMENTAR CANTIDADES Y ELIMINAR PRODUCTO*/
  $carrito.addEventListener("click", (e) => {
    $vistaCarrito.classList.remove("opacity");
    renderCarrito();
  });

  /* INCREMENTAR PRODUCTO */
  const incrementarProducto = () => {
    let $addCant = d.querySelectorAll(".prod_add");

    $addCant.forEach((el) => {
      el.addEventListener("click", (e) => {
        nproducto.nombre =
          el.parentNode.parentNode.firstElementChild.textContent;
        nproducto.precio =
          el.parentNode.parentNode.firstElementChild.nextElementSibling.textContent;

        for (let prod of usuarioTienda.productos) {
          if (prod.nombre == nproducto.nombre) prod.cantidad++;
          setData("usuarioTienda", usuarioTienda);

          let prob = usuarioTienda.sumarProductos();

          $cantCarrrito.textContent = prob;
          renderCarrito();
        }
      });
    });
  };

  /* DECREMENTAR PRODUCTOS */
  const decrementarProducto = () => {
    let $subtract = d.querySelectorAll(".prod_subtract");

    $subtract.forEach((el) => {
      el.addEventListener("click", (e) => {
        nproducto.nombre =
          el.parentNode.parentNode.firstElementChild.textContent;
        nproducto.precio =
          el.parentNode.parentNode.firstElementChild.nextElementSibling.textContent;

        for (let prod of usuarioTienda.productos) {
          if (prod.nombre == nproducto.nombre) {
            if (prod.cantidad > 1) {
              prod.cantidad--;
            }
          }
          setData("usuarioTienda", usuarioTienda);
          $cantCarrrito.textContent = usuarioTienda.sumarProductos();
          renderCarrito();
        }
      });
    });
  };

  /* ELIMINAR DEL CARRITO */
  const eliminarProducto = () => {
    let $trash = d.querySelectorAll(".icon-tabler-trash");

    $trash.forEach((el) => {
      el.addEventListener("click", (e) => {
        usuarioTienda.eliminarProducto(
          el.parentNode.parentNode.firstElementChild.textContent
        );

        setData("usuarioTienda", usuarioTienda);
        $cantCarrrito.textContent = usuarioTienda.sumarProductos();
        renderCarrito();

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
  };

  return usuarioTienda;
}
