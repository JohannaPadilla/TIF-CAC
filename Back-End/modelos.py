from app import db, app

class Producto(db.Model):  # Producto hereda de db.Model
    """
    Definición de la tabla Producto en la base de datos.
    La clase Producto hereda de db.Model.
    Esta clase representa la tabla "Producto" en la base de datos.
    """
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100))
    precio = db.Column(db.Integer)
    stock = db.Column(db.Integer)
    imagen = db.Column(db.String(400))

    def __init__(self, nombre, precio, stock, imagen):
        """
        Constructor de la clase Producto.

        Args:
            nombre (str): Nombre del producto.
            precio (int): Precio del producto.
            stock (int): Cantidad en stock del producto.
            imagen (str): URL o ruta de la imagen del producto.
        """
        self.nombre = nombre
        self.precio = precio
        self.stock = stock
        self.imagen = imagen

# Se pueden agregar más clases para definir otras tablas en la base de datos
with app.app_context():
    db.create_all()  # Crea todas las tablas en la base de datos