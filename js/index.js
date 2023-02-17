const d = document;
const w = window;

import { menu } from "./menu.js";
import { scrollTop } from "./scroll.js";
import { usuarioLogin } from "./loginUsuario.js";
import { carrito } from "./carrito.js";
import { commonAnimation } from "./animation.js";
import { mostrarPais } from "./mostrarPais.js";
import { iniciarSesion } from "./class_functions.js";

commonAnimation();
usuarioLogin("./pages/sesion.html");
carrito(".cant-carrito", ".carrito", ".vista_carrito");
iniciarSesion("./pages/sesion.html");

//////////////////////////////////////////////////////////////////////////////////////////////

/* mostrar mensaje de bienvenida */
d.addEventListener("DOMContentLoaded", mostrarPais);

menu(".menu-btn", ".nav");
scrollTop(".header", ".nav");

/////////////////////////////////////////////////////////////////////////////
