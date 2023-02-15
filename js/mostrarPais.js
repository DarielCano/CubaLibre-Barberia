const d = document,
  n = navigator;

export function mostrarPais() {
  let key = "77894d358b535f22b04a3809825e5b62";

  /* A PARTIR DE .JSON CON ISO DE PAISES IMPRIMIR EL PAIS */
  function getCountryName(countryCode) {
    fetch("./paises.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.hasOwnProperty(countryCode)) {
          mostrarMensaje(data[countryCode]);
        }
      });
  }

  /* OBTENIENDO LAS COORDENADAS PARA API */
  n.geolocation.getCurrentPosition(success);

  /* CAPTURA DEL ISO DEL PAIS PARA IMPRIMIR EN PANTALLA */
  function success(pos) {
    const crd = pos.coords;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${key}`
    )
      .then((res) => res.json())
      .then((data) => {
        getCountryName(data.sys.country);
      });
  }

  function mostrarMensaje(pais) {
    Toastify({
      text: `Gracias por visitarnos desde ${pais}. BIENVENIDO!`,
      duration: 5000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      offset: {
        x: 600,
        y: 40,
      },

      style: {
        background: "rgb(65, 115, 249, 0.9)",
      },
    }).showToast();
  }
}
