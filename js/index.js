/* SIMULANDO BARBERIA, CON CITAS Y CON TIENDA DE PRODUCTOS INCLUIDA */

/* declaracion de clases */
class Usuario {
  constructor(nombre, apellido, edad) {
    (this.nombre = nombre), (this.apellido = apellido), (this.edad = edad);
  }

  consultarEdad() {
    if (this.edad < 18) return "menor";
    else return "mayor";
  }
}

class Usuario_barberia extends Usuario {
  constructor(nombre, apellido, edad, servicios) {
    super(nombre, apellido, edad);
    this.servicios = servicios;
  }

  agregarServicio(servicio) {
    this.servicios.push(servicio);
  }

  eliminarServicio(servicio) {
    /*    console.log(this.servicios.findIndex((element) => element == servicio)); */
    if (this.servicios.findIndex((element) => element == servicio) == -1) {
      return false;
    } else {
      this.servicios = this.servicios.filter((element) => element != servicio);
      return true;
    }
  }

  mostrarServicios = () => {
    if (this.servicios.length == 0) return `No tiene citas agendadas aún`;
    else return this.servicios;
  };
}

class Producto {
  constructor(nombre, precio, stock) {
    (this.nombre = nombre), (this.precio = precio), (this.stock = stock);
  }

  actualizarStock(comprado) {
    this.stock = this.stock - comprado;
  }

  calcularMonto(comprado) {
    return comprado * this.precio;
  }
}
///////////////////////////////////////////////////////////////////////////////////

/* declaracion de arreglo de productos en tienda
(Se agregan hipoteticamente del backend(base de datos)) */
let productos = [
  new Producto("Cera para peinar", 250, 10),
  new Producto("Maquina Trimmer", 1000, 10),
  new Producto("Shaving gel", 150, 10),
  new Producto("Tinte para barba", 300, 10),
];

///////////////////////////////////////////////////////////////////////////////////////////////
/* declaracion de variables */
let terminar = "no";
let op = "";
let fin = "";
let cant = 0;
let carrito = [];
let carrito_prod = [];

let prod;

//////////////////////////////////////////////////////////////////////////////////////////////////

/* funciones Servicios de corte */
const respuesta = (tipoCorte) => {
  fin = prompt(
    `Ha elegido ${tipoCorte}, presione cualquier tecla para confirmar o escriba NO/no para cancelar`
  );
  if (fin.toLowerCase() != "no") {
    clienteCorte.agregarServicio(`${tipoCorte}`);
    alert(`Cita guardada`);
  } else {
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

///////////////////////////////////////////////////////////////////////////////////////////////////

/* funciones venta productos barberia */
const articulosEnVenta = () => {
  alert(`Acabas de ingresar a nuestra tienda`);
  let string = `Contamos con los siguientes productos:`;
  let contador = 1;
  for (let elemento of productos) {
    string =
      string +
      `
      ${contador}- ${elemento.nombre} - Precio: ${elemento.precio} - Cantidad: ${elemento.stock}`;
    contador += 1;
  }
  let producto = prompt(`${string}
  ELIJA SU PRODUCTO 
  --Para eliminar el último producto de su carrito presione 5--
    6 - SALIR`);
  return producto;
};

const agregarAlCarrito = (prod_carrito) => {
  carrito.push(prod_carrito);
};

const eliminarCarrito = () => {
  if (carrito.length != 0) {
    let eliminar = prompt(`Tiene su carrito con los siguientes productos:
   ${mostrarProductos()}
   Escriba el producto a eliminar`);
    eliminar = eliminar.toLowerCase();

    if (
      carrito.findIndex(
        (element) => element.nombre.toLowerCase() == eliminar
      ) == -1
    ) {
      alert(`EL producto ${eliminar} no existe en su carrito, `);
    } else {
      carrito = carrito.filter(
        (element) => element.nombre.toLowerCase() != eliminar
      );
      alert(
        `Carrito actualizado. Tiene los siguientes productos en su carrito:
         ${mostrarProductos()}`
      );
    }
  }
};

const mostrarProductos = () => {
  carrito_prod = carrito.map((element) => element.nombre);
  return carrito_prod;
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
      if (cant > productos[0].stock) {
        alert(`Existen ${productos[0].stock} en almacén. 
            Para otra compra vuelva a accedera nuestra tienda. Una disculpa`);
      } else {
        productos[0].actualizarStock(cant);
        alert(
          `Gracias por su compra.
          Precio a pagar: ${productos[0].calcularMonto(cant)}
           Tenemos disponibilidad ahora de ${productos[0].stock}`
        );
        console.log(productos[0]);

        agregarAlCarrito(productos[0]);
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
      if (cant > productos[1].stock) {
        alert(`Existen ${productos[1].stock} en almacén. 
                  Para otra compra vuelva a accedera nuestra tienda. Una disculpa`);
      } else {
        productos[1].actualizarStock(cant);

        alert(
          `Gracias por su compra.
           Precio a pagar: ${productos[1].calcularMonto(cant)}
           Tenemos disponibilidad ahora de ${productos[1].stock}`
        );
        agregarAlCarrito(productos[1]);
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
      if (cant > productos[2].stock) {
        alert(`Existen ${productos[2].stockl} en almacén. 
                  Para otra compra vuelva a accedera nuestra tienda. Una disculpa`);
      } else {
        productos[2].actualizarStock(cant);
        alert(
          `Gracias por su compra.
           Precio a pagar: ${productos[2].calcularMonto(cant)}
           Tenemos disponibilidad ahora de ${productos[2].stock}`
        );
        agregarAlCarrito(productos[2]);
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
      if (cant > productos[3].stock) {
        alert(`Existen ${productos[3].stock} en almacén. 
                Para otra compra vuelva a accedera nuestra tienda. Una disculpa`);
      } else {
        productos[3].actualizarStock(cant);
        /* cantTinte -= cant; */
        alert(
          `Gracias por su compra.
          Precio a pagar: ${productos[3].calcularMonto(cant)}
           Tenemos disponibilidad ahora de ${productos[3].stock}`
        );
        agregarAlCarrito(productos[3]);
      }

      break;

    case "5":
      eliminarCarrito();
      break;

    case "6":
      alert(`Hasta la proxima. Presione aceptar para ver su carrito`);
      if (carrito.length == 0) alert(`No tiene productos en su carrito`);
      else alert(`Productos de su carrito --- ${mostrarProductos()}`);
      break;
    default:
      alert(`No ha elegido ninguna opcion anterior. 
             Salga y vuelva a intentarlo`);
      break;
  }
};

/////////////////////////////////////////////////////////////////////////////////////////

/* Entrada de datos */
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

//////////////////////////////////////////////////////////////////////////////////////////////

/* declaracion de objetos cliente y cliente corte */
const cliente = new Usuario(nombre, apellido, edad);
const clienteCorte = new Usuario_barberia(
  cliente.nombre,
  cliente.apellido,
  cliente.edad,
  []
);

////////////////////////////////////////////////////////////////////////////////

/* ciclo principal del programa */

while (terminar == "no") {
  let opcion = prompt(`
  
  Seleccione la opción que desee.
    1 - Acceder al menú de servicios de corte
    2 - Consultar citas
    3 - Acceder a nuestra tienda
    4 - Salir`);

  switch (opcion) {
    case "1":
      let res = cliente.consultarEdad();
      if (res == "menor") {
        alert(`Es usted menor de edad, por lo que cuenta con sus servicios diferenciados.
               Presione Aceptar para continuar`);

        serviciosMenor();
      } else servicioMayor();
      break;

    case "2":
      alert(
        `Usted tiene lo(s) siguiente(s) servicios agendados(s) -- ${clienteCorte.mostrarServicios()}`
      );
      if (clienteCorte.servicios.length != 0) {
        let cancelar = prompt(
          `Escriba el servicio que desea cancelar o no/NO para salir:`
        );
        cancelar = cancelar.toLowerCase();
        console.log(cancelar);
        if (cancelar !== "no") {
          let result = clienteCorte.eliminarServicio(cancelar);
          if (result == true) {
            alert(`Servicio eliminado.
            Usted tiene lo(s) siguiente(s) servicios agendados(s) -- ${clienteCorte.mostrarServicios()}`);
          } else {
            alert(`Servicio no existente`);
          }
        }
      }

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

/////////////////////////////////////////////////////////////////////////////////
import { menu } from "./menu.js";
import { scrollTop } from "./scroll.js";

menu(".menu-btn", ".nav");
scrollTop(".header", ".nav");
