/* SIMULANDO BARBERIA, CON CITAS Y CON TIENDA DE PRODUCTOS INCLUIDA */

/* funciones */
const consultarEdad = () => {
  let edad = parseInt(prompt(`Inserte su edad`));
  if (edad < 18) return "menor";
  else if (edad >= 18) return "mayor";
  else return "Incorrecto";
};
/////////////////////////////////////////////////////////////////////////////////////////

/*Ingresando datos de cliente  */
let nombre = prompt(
  `Bienvenido a CubaLibre Barbería. Inserte sus datos. Nombre: `
);
let apellido = prompt(`Inserte sus datos. Apellido: `);

let terminar = "no";

/* ciclo principal del programa */
while (terminar == "no") {
  let opcion = prompt(`Seleccione la opción que desee.\n
    1- Acceder al menú de servicios de corte\n
    2- Acceder a nuestra tienda
    3- Salir`);

  switch (opcion) {
    case "1":
      consultarEdad();

      break;

    default:
      break;
  }
}
