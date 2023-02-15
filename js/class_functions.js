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
  constructor(
    nombre,
    apellido,
    telefono,
    email,
    password,
    servicios,
    datosUsuario
  ) {
    super(nombre, apellido, telefono, email, password);
    this.servicios = servicios;
    this.datosUsuario = datosUsuario;
  }

  agregarServicio(servicio) {
    if (this.servicios.findIndex((element) => element == servicio) == -1) {
      this.servicios.push(servicio);
    }
  }

  eliminarServicio(servicio) {
    if (this.servicios.length == 1) this.servicios.length = 0;
    else if (this.servicios.length > 1)
      this.servicios = this.servicios.filter(
        (element) => element.nombre != servicio.nombre
      );
  }
  mostrarServicios = () => {
    if (this.servicios.length == 0) return ``;
    else {
      let string = ``;
      for (let servicio of this.servicios) {
        string =
          string +
          `<li class="list"> ${servicio.nombre} </li> 
          `;
      }
      return string;
    }
  };
}

export class Usuario_Tienda extends Usuario {
  constructor(nombre, apellido, telefono, email, password, productos) {
    super(nombre, apellido, telefono, email, password);
    this.productos = productos;
  }

  agregarProducto(producto) {
    /*  const { nombre, precio, cantidad } = producto; */
    if (
      !this.productos ||
      this.productos.findIndex(
        (element) => element.nombre == producto.nombre
      ) == -1
    ) {
      producto.cantidad = 1;

      this.productos.push(producto);
    } else {
      producto.cantidad = Number(producto.cantidad);
      producto.cantidad++;
    }
  }

  incrementoProd(producto, cantActual) {
    producto.cantidad = Number(producto.cantidad) + Number(cantActual);
  }

  sumarProductos() {
    let acc = 0;
    if (this.productos.length > 0) {
      this.productos.forEach((element) => {
        acc += parseInt(element.cantidad);
      });
    } else {
      acc = 0;
    }
    return acc;
  }

  eliminarProducto(nombre) {
    this.productos = this.productos.filter(
      (element) => element.nombre != nombre
    );
  }

  calcularMonto() {
    let monto = 0;
    if (this.productos.length > 0) {
      this.productos.forEach((el) => {
        monto = monto + el.cantidad * parseInt(el.precio.slice(1));
      });
    }
    return monto;
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////

export const leerDatos = (clave) => {
  let datos = localStorage.getItem(clave);
  return JSON.parse(datos);
};

export const inicioSesion = (clave) => {
  let userActual = sessionStorage.getItem(clave);
  return userActual == null ? false : JSON.parse(userActual);
};

export const guardarDatos = (clave, dato) => {
  localStorage.setItem(clave, JSON.stringify(dato));
};

export const getData = (clave) => {
  let data = localStorage.getItem(clave);
  return data == null ? false : JSON.parse(data);
};

export const setData = (clave, user) => {
  localStorage.setItem(clave, JSON.stringify(user));
};
