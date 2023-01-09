import { menu } from "./menu.js";

menu(".menu-btn", ".nav");
/* SIMULANDO BARBERIA, CON CITAS Y CON TIENDA DE PRODUCTOS INCLUIDA */

/* let terminar = "no";
let op = "";
let fin = "";
let citas = [];

/* productos en stock y su disponibilidad 
let cantCeras = 10;
let cantGel = 10;
let cantMaq = 10;
let cantTinte = 10;
let cant = 0;
let carrito = [];

/* funciones corte y cita 
const consultarEdad = (edad) => {
  if (edad < 18) return "menor";
  else return "mayor";
};

const respuesta = (tipoCorte) => {
  fin = prompt(
    `Ha elegido ${tipoCorte}, presione cualquier tecla para confirmar o escriba NO/no para cancelar`
  );
  if (fin.toLowerCase() != "no") {
    agregarCita(`${tipoCorte}`);
    alert(`Cita guardada`);
  } else {
    eliminarCita();
    alert(`Cita Cancelada`);
  }
};

const serviciosMenor = () => {
  op = prompt(`Inserte la opción segun el servicio al menor:
                   1 - Corte sencillo -- Precio $100
                   2 - Corte moderno --- Precio $120`);

  while (op !== "1" && op !== "2") {
    op = prompt(`Opcion incorrecta. Elija una de las dos opciones
                 1 - Corte sencillo -- Precio $100
                 2 - Corte moderno --- Precio $120`);
  }

  if (op == "1") {
    respuesta("corte sencillo");
  } else {
    respuesta("corte moderno");
  }
};

const servicioMayor = () => {
  op = prompt(`Inserte la opción segun el servicio:
                   1 - Corte sencillo -- Precio $100
                   2 - Corte moderno --- Precio $150
                   3 - Barba ----------- Precio $120
                   4 - Corte y Barba --- Precio $250 `);

  while (op !== "1" && op !== "2" && op !== "3" && op !== "4") {
    op = prompt(`Opcion incorrecta. Elija una de las opciones
                 1 - Corte sencillo -- Precio $100
                 2 - Corte moderno --- Precio $150
                 3 - Barba ----------- Precio $120
                 4 - Corte y Barba --- Precio $250`);
  }

  switch (op) {
    case "1":
      respuesta("corte sencillo");
      break;

    case "2":
      respuesta("corte moderno");
      break;

    case "3":
      respuesta("barba");

      break;

    case "4":
      respuesta("corte y barba");

      break;

    default:
      break;
  }
};

const agregarCita = (cita) => citas.push(cita);

const eliminarCita = () => {
  if (citas.length != 0) {
    citas.pop();
  }
};

const mostrarCitas = () => {
  if (citas.length == 0) return `No tiene citas agendadas aún`;
  else return citas;
};

/* funciones venta productos barberia 
const articulosEnVenta = () => {
  alert(`Acabas de ingresar a nuestra tienda`);
  let producto = prompt(`Contamos con los siguientes productos:
  1 - Cera para peinar -- cantidad: ${cantCeras}
  2 - Máquina trimmer -- cantidad: ${cantMaq}
  3 - Shaving gel -- cantidad: ${cantGel}
  4 - Tinte para barba -- cantidad: ${cantTinte} 
  ELIJA SU PRODUCTO
  
  --Para eliminar el último producto de su carrito presione 5--
  6 - SALIR`);
  return producto;
};

const seleccionCarrito = (prod) => {
  switch (prod) {
    case "1":
      cant = parseInt(
        prompt(`Ha elegido nuestras ceras.
            Escriba la cantidad a comprar:`)
      );
      while (isNaN(cant) || !cant) {
        cant = parseInt(
          prompt(`Ingrese un número.
                Escriba la cantidad de ceras a comprar:`)
        );
      }
      if (cant > cantCeras) {
        alert(`Existen ${cantCeras} en almacén. 
            Para otra compra vuelva a accedera nuestra tienda. Una disculpa`);
      } else {
        cantCeras -= cant;
        alert(
          `gracias por su compra. Tenemos disponibilidad ahora de ${cantCeras}`
        );
        agregarAlCarrito("Ceras para peinar");
      }

      break;
    case "2":
      cant = parseInt(
        prompt(`Ha elegido nuestras máquinas trimmer.
                  Escriba la cantidad a comprar:`)
      );
      while (isNaN(cant) || !cant) {
        cant = parseInt(
          prompt(`Ingrese un número.
                      Escriba la cantidad de máquinas trimmer a comprar:`)
        );
      }
      if (cant > cantMaq) {
        alert(`Existen ${cantMaq} en almacén. 
                  Para otra compra vuelva a accedera nuestra tienda. Una disculpa`);
      } else {
        cantMaq -= cant;
        alert(
          `Gracias por su compra. Tenemos disponibilidad ahora de ${cantMaq}`
        );
        agregarAlCarrito("Máquinas trimmer");
      }

      break;

    case "3":
      cant = parseInt(
        prompt(`Ha elegido nuestros Shaving gel.
                  Escriba la cantidad a comprar:`)
      );
      while (isNaN(cant) || !cant) {
        cant = parseInt(
          prompt(`Ingrese un número.
                      Escriba la cantidad de shaving gel a comprar:`)
        );
      }
      if (cant > cantGel) {
        alert(`Existen ${cantGel} en almacén. 
                  Para otra compra vuelva a accedera nuestra tienda. Una disculpa`);
      } else {
        cantGel -= cant;
        alert(
          `gracias por su compra. Tenemos disponibilidad ahora de ${cantGel}`
        );
        agregarAlCarrito("Shaving gel");
      }

      break;

    case "4":
      cant = parseInt(
        prompt(`Ha elegido nuestros Tintes para barba.
                Escriba la cantidad a comprar:`)
      );
      while (isNaN(cant) || !cant) {
        cant = parseInt(
          prompt(`Ingrese un número.
                    Escriba la cantidad de tinte  para barba a comprar:`)
        );
      }
      if (cant > cantTinte) {
        alert(`Existen ${cantTinte} en almacén. 
                Para otra compra vuelva a accedera nuestra tienda. Una disculpa`);
      } else {
        cantTinte -= cant;
        alert(
          `gracias por su compra. Tenemos disponibilidad ahora de ${cantTinte}`
        );
        agregarAlCarrito("Tinte para barba");
      }

      break;

    case "5":
      eliminarCarrito();
      break;

    case "6":
      alert(`Hssta la proxima. Presione aceptar para ver su carrito`);
      if (carrito.length == 0) alert(`No tiene productos en su carrito`);
      else alert(`Productos de su carrito ---  ${carrito}`);
      break;
    default:
      alert(`No ha elegido ninguna opcion anterior. 
             Salga y vuelva a intentarlo`);
      break;
  }
};

const agregarAlCarrito = (elemento) => {
  carrito.push(elemento);
};

const eliminarCarrito = () => {
  if (carrito.length != 0) carrito.pop();
};

/////////////////////////////////////////////////////////////////////////////////////////
let nombre = prompt(`Bienvenido a CubaLibre Barbería.
Inserte sus datos. Nombre: `);
while (!nombre || isNaN(nombre) == false) {
  nombre = prompt(`Campo vacio o numero.
    Inserte su Nombre: `);
}
let apellido = prompt(`Inserte sus datos. Apellido: `);
while (!apellido || isNaN(apellido) == false) {
  apellido = prompt(`Campo vacio o numero.
      Inserte su Apellido: `);
}
let edad = parseInt(prompt(`Inserte su edad`));
while (isNaN(edad) || edad < 1 || edad > 120) {
  edad = parseInt(prompt(`Inserte edad valida`));
}

/* ciclo principal del programa 
while (terminar == "no") {
  let opcion = prompt(`
  
  Seleccione la opción que desee.
    1 - Acceder al menú de servicios de corte
    2 - Consultar citas
    3 - Acceder a nuestra tienda
    4 - Salir`);

  switch (opcion) {
    case "1":
      let res = consultarEdad(edad);
      if (res == "menor") {
        alert(`Es usted menor de edad, por lo que cuenta con sus servcios diferenciados.
               Presione Aceptar para continuar`);
        serviciosMenor();
      } else servicioMayor();
      break;

    case "2":
      alert(`Usted tiene la(s) siguiente(s) cita(s) -- ${mostrarCitas()}`);
      break;

    case "3":
      let prod = articulosEnVenta();
      seleccionCarrito(prod);

      break;
    default:
      alert(`GRACIAS POR SU VISITA.
        HASTA LA PROXIMA`);
      terminar = "si";
      break;
  }
}
 */
