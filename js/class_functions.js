export class Usuario {
  constructor(nombre, apellido, telefono, email, password) {
    (this.nombre = nombre),
      (this.apellido = apellido),
      (this.telefono = telefono),
      (this.email = email),
      (this.password = password);
  }
}

export class Usuario_barberia extends Usuario {
  constructor(nombre, apellido, telefono, email, password, servicios) {
    super(nombre, apellido, telefono, email, password);
    this.servicios = servicios;
  }

  agregarServicio(servicio) {
    this.servicios.push(servicio);
  }

  eliminarServicio(servicio) {
    console.log(this.servicios.findIndex((element) => element == servicio));
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
/////////////////////////////////////////////////////////////////////////////////////////////

export const leerTexto = (e) => {
  datosUser[e.target.id] = e.target.value;
};

export const leerDatos = () => {
  console.log(localStorage.length);

  if (localStorage.length == 0) {
    users.push(datosUser);
    usersString = JSON.stringify(users);
    localStorage.setItem("usuarios", usersString);
    return false;
  } else {
    let usuarios = localStorage.getItem("usuarios");
    /*     console.log(JSON.parse(usuarios)); */
    return (usuarios = JSON.parse(usuarios));
  }
};

export const inicioSesion = () => {
  let userActual = sessionStorage.getItem("usuarioSesion");

  return userActual == null ? false : JSON.parse(userActual);
};
