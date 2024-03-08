// Importar el módulo 'fs' (FileSystem)
const fs = require('fs');

// Clase Product (lo uso como receta para crear productos)
class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.id = ProductManager.generateProductId();
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

// Clase ProductManager (ente organizador y quien maneja los productos)
class ProductManager {
    // Propiedades que comparten todos los ProductManagers
    static nextProductId = 1;
    static products = [];

    // Constructor para crear un ProductManager con un archivo para guardar la información
    constructor(filePath) {
        this.products = [];
        this.path = filePath; // Se guarda la ubicación del archivo
        this.loadFromFile(); // Método para cargar productos desde el archivo
    }

    // Método para añadir un nuevo producto o actualizar uno existente
    addProduct(title, description, price, thumbnail, code, stock) {
        const existingProductIndex = this.products.findIndex((product) => product.code === code); // Busco si ya existe un producto con el mismo código
    
        if (existingProductIndex !== -1) {
            // Si existe, actualizo sus detalles
            this.products[existingProductIndex].title = title;
            this.products[existingProductIndex].description = description;
            this.products[existingProductIndex].price = price;
            this.products[existingProductIndex].thumbnail = thumbnail;
            this.products[existingProductIndex].stock = stock;
    
            console.log(`Producto con código ${code} actualizado.`);
        } else {
            // Si no existe, se crea un nuevo producto con un ID único
            const newProduct = new Product(title, description, price, thumbnail, code, stock);
    
            // Se agrega el nuevo producto a la lista de productos
            this.products.push(newProduct);
    
            console.log(`Producto "${title}" añadido.`);
        }
    
        // Después de agregar o actualizar, guarda la información en el archivo
        this.saveToFile();
    
        // Se actualiza el ID siguiente segun en el máximo ID actual
        ProductManager.nextProductId = Math.max(...this.products.map(product => product.id)) + 1;
    }

    // Metodo para traer todos los productos
    getAllProducts() {
        return this.products;
    }

    // Método para traer los productos ordenados por ID
    getProducts() {
        return this.products.slice().sort((a, b) => a.id - b.id);
    }

    // Método para buscar un producto por su ID o codigo
    getProductById(identifier) {
        // El identificador debe ser un número
        const productId = parseInt(identifier);

        // Se busca  el producto por su ID o código
        const product = this.products.find(
            product => product.id === productId || product.code === identifier
        );

        if (product) {
            console.log("Producto encontrado", product);
            return product;
        } else {
            console.error('Producto no encontrado.');
            return null;
        }
    }

    // Método para actualizar un producto por su ID
    updateProduct(productId, updatedFields) {
        // Encuentro producto en la lista
        const productIndex = this.products.findIndex(product => product.id === productId);

        if (productIndex !== -1) {
            // Los campos que se pueden actualizar
            const allowedFields = ['price', 'description', 'stock'];

            // Actualiza solo los campos permitidos
            const updatedProduct = {
                ...this.products[productIndex],
                ...Object.fromEntries(
                    Object.entries(updatedFields)
                        .filter(([key]) => allowedFields.includes(key))
                ),
                id: productId // el campo 'id' no se actualiza
            };

            // Se actualiza el producto en la lista
            this.products[productIndex] = updatedProduct;

            // Después de actualizar, se guarda la informacion en el archivo
            this.saveToFile();

            // Se devuelve el producto actualizado
            console.log(`Producto con ID ${productId} actualizado con éxito.`);
            return updatedProduct;
        } else {
            console.error(`Producto con ID ${productId} no encontrado. No se pudo actualizar.`);
            // Si el producto no se encuanetra
            return null;
        }
    }


    // Método para eliminar un producto por su ID
    deleteProduct(productId) {
        // busncadp el indice del producto en la lista
        const productIndex = this.products.findIndex(product => product.id === productId);
    
        if (productIndex !== -1) {
        // para eliminar producto de la lista utilizando el ID
        this.products.splice(productIndex, 1);
    
        console.log(`Producto con ID ${productId} eliminado.`);
        // Después de eliminar, se guarda la información en el archivo
        this.saveToFile();
        } else {
        console.error(`Producto con ID ${productId} no encontrado. No se pudo eliminar.`);
        }
    }

    // Método estático para generar un nuevo ID de producto
    static generateProductId() {
        return ProductManager.nextProductId++;
    }

    // Método privado para guardar la información en el archivo
    saveToFile() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8'); //llevado a formato array
            console.log('Productos guardados en el archivo.');
        } catch (error) {
            console.error('Error al guardar productos en el archivo:', error.message);
        }
    }

    // Método para cargar productos desde el archivo
    loadFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            if (data.trim() !== '') {
                const loadedProducts = JSON.parse(data);

                // con esto se controla que el id sea mayor que el máximo ID cargado
                ProductManager.nextProductId = Math.max(...loadedProducts.map(product => product.id), ProductManager.nextProductId);

                // Luego se asignan los productos cargados y genero nuevos IDs 
                this.products = loadedProducts.map(product => {
                    // verificar si ya existe un producto con el mismo ID en los productos cargados
                    if (!product.id) {
                        product.id = ++ProductManager.nextProductId;
                    }
                    return product;
                });
            }
            console.log('Productos cargados desde el archivo.');
        } catch (error) {
            console.error('Error al cargar productos desde el archivo:', error.message);
        }
    }
}

// Inicializo la propiedad estática nextProductId
ProductManager.nextProductId = 1;

// Ruta del archivo donde guardo la información
const filePath = 'productos.json';

// Instancia de ProductManager con la ruta del archivo
const productManager = new ProductManager(filePath);

// productos de ejemplo utilizando el método addProduct
productManager.addProduct('Perfume de Perros', 'Perfume Oh My Dog', 21.50, 'thumbnail1.jpg', 'code1', 10);
productManager.addProduct('Shampoo de Perros', 'Shampoo de perros pelo risado', 17.50, 'thumbnail2.jpg', 'code2', 30);
productManager.addProduct('Correa', 'Correa multicolor', 9, 'thumbnail2.jpg', 'code3', 20);
productManager.addProduct('Alimento Balanceado', 'Alimento Balanceado 5kg cordero', 14, 'thumbnail2.jpg', 'code4', 5);

// Para obetener todos los productos
console.log(productManager.getAllProducts());



/////////TESTING/////////TESTING/////////TESTING/////////TESTING/////////TESTING/////////TESTING


// //DESAFIO 1:

// // Instancia de la clase ProductManager:
// const manager = new ProductManager(filePath);

// console.log(manager.getProducts());

// //Método addProduct
// manager.addProduct("producto de prueba1", "descripcion producto prueba", 30.50, "sin imagen", "code3", 30);
// manager.addProduct("producto de prueba2", "descripcion producto prueba2", 20.50, "sin imagen", "code1", 40);
// manager.addProduct("producto de prueba3", "descripcion producto prueba3", 10.50, "sin imagen", "code5", 50);
// console.log(manager.getProducts());

// //Evaluar que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
// manager.getProductById(2);
// manager.getProductById(300);





// DESAFIO 2:

// Creo una instancia de la clase "ProductManager"
const manager = new ProductManager('productos.json');

// Llamo al método "getProducts" después de crear la instancia
const initialProducts = manager.getProducts();
console.log('Productos cargados desde el archivo:', initialProducts);

// 3. Llamo al método "addProduct" con los campos especificados
manager.addProduct('Producto de Prueba', 'Este es un producto de prueba', 200, 'Sin imagen', 'abc123', 25);

// 4. Llamo al método "getProducts" nuevamente
const updatedProducts = manager.getProducts();
console.log('Lista de productos actualizada:', updatedProducts);

// 5. Llamo al método "getProductById" y corroboro su funcionamiento
try {
const productIdToFind = updatedProducts[8].id; // Usamos el ID de un producto que no exista.
const foundProduct = manager.getProductById(productIdToFind - 1);
} catch (error) {
console.error('Producto no encontrado con ID informado:', error.message);
}

// 6. Llamo al método "updateProduct" e intento cambiar un campo de algún producto
const productIdToUpdate = 1; // Aquí el ID del producto que quiero actualizar.
const updatedProduct = manager.updateProduct(productIdToUpdate, {
price: 150,
stock: 5,
id: 10
});

// 7. Llamo al método "deleteProduct" para eliminar un producto
manager.deleteProduct(2);