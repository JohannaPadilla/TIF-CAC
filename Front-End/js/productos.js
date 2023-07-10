const { createApp } = Vue;

// Crea una instancia de la aplicación Vue
createApp({
  data() {
    /* El código define una instancia de la aplicación Vue. Aquí se especifican los datos utilizados por la aplicación, incluyendo la lista de productos, la URL del backend, indicadores de error y carga, así como los atributos para almacenar los valores del formulario de producto.
     */
    return {
      terminoBusqueda:'',
      productos: [], // Almacena los productos obtenidos del backend
      // url:'http://localhost:5000/productos', // URL local
      url: "https://joha2804.pythonanywhere.com/productos", // URL del backend donde se encuentran los productos
      error: false,
      cargando: true,
      // Atributos para el almacenar los valores del formulario
      id: 0,
      nombre: "",
      imagen: "",
      stock: "",
      precio: "",
    };
  },

  computed: {
    filteredItems() {
      if (this.terminoBusqueda.trim() === '') {
        return this.productos;
      }

      const termino = this.terminoBusqueda.toLowerCase().trim();
      return this.productos.filter(producto =>
        producto.nombre.toLowerCase().includes(termino)
      );
    }
  },

  methods: {
    fetchData(url) {
      /**El método fetchData realiza una solicitud HTTP utilizando la función fetch a la URL especificada. Luego, los datos de respuesta se convierten en formato JSON y se asignan al arreglo productos. Además, se actualiza la variable cargando para indicar que la carga de productos ha finalizado. En caso de producirse un error, se muestra en la consola y se establece la variable error en true.
       *
       */
      fetch(url)
        .then((response) => response.json()) // Convierte la respuesta en formato JSON
        .then((data) => {
          // Asigna los datos de los productos obtenidos al arreglo 'productos'
          this.productos = data;
          this.cargando = false;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },

    eliminar(producto) {
      /* El método eliminar toma un parámetro producto y construye la URL para eliminar ese producto en particular. Luego, realiza una solicitud fetch utilizando el método HTTP DELETE a la URL especificada. Después de eliminar el producto, la página se recarga para reflejar los cambios.
       */
      // Construye la URL para eliminar el producto especificado
      const url = this.url + "/" + producto;
      var options = {
        method: "DELETE", // Establece el método HTTP como DELETE
      };

      Swal.fire({
        title: '¿Deseas eliminar este producto?',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        confirmButtonColor: '#DC3545',
        cancelButtonText: 'Cancelar',
        icon: 'warning',
        iconColor: '#DC3545',
      }).then((result) => {
        if (result.isConfirmed) {
          // Realizar la solicitud fetch para eliminar el producto
          fetch(url, options)
            .then((res) => res.text()) // Convierte la respuesta en texto (or res.json())
            .then((res) => {
              Swal.fire({
                icon: 'success',
                title:'Producto eliminado exitosamente!',
                confirmButtonText: 'OK',
                confirmButtonColor: '#157342',
              }).then(() =>{
                location.reload(); // Recarga la página actual después de eliminar el producto
              })
            });
        }
      });
    },

    cargarImagen(event) {
      const file = event.target.files[0];
      this.imagen = URL.createObjectURL(file);
    },


    grabar() {
      /* El método grabar se encarga de guardar los datos de un nuevo producto en el servidor. Primero, se crea un objeto producto con los datos ingresados en el formulario. Luego, se configuran las opciones para la solicitud fetch, incluyendo el cuerpo de la solicitud como una cadena JSON, el método HTTP como POST y el encabezado Content-Type como application/json. Después, se realiza la solicitud fetch a la URL especificada utilizando las opciones establecidas. Si la operación se realiza con éxito, se muestra un mensaje de éxito y se redirige al usuario a la página de productos. Si ocurre algún error, se muestra un mensaje de error.
       */
      // Crear un objeto 'producto' con los datos del formulario
      let producto = {
        nombre: this.nombre,
        precio: this.precio,
        stock: this.stock,
        imagen: this.imagen,
      };

      // Configurar las opciones para la solicitud fetch
      var options = {
        body: JSON.stringify(producto), // Convertir el objeto a una cadena JSON
        method: "POST", // Establecer el método HTTP como POST
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };

      // Realizar una solicitud fetch para guardar el producto en el servidor
      fetch(this.url, options)
        .then(function () {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro guardado exitosamente!',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            window.location.href = "./productos.html"; // Redirigir a la página de productos
          })
        })
        .catch((err) => {
          console.error(err);
          alert("Error al Grabar.");
        });
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount("#app");
