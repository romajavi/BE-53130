// Clase Product
class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.id = 0; // El id se asignará posteriormente con el método generateProductId
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

// Clase ProductManager
class ProductManager {
    constructor() {
        this.products = [];
    }

    // Método para agregar un nuevo producto
    addProduct(title, description, price, thumbnail, code, stock) {
        // Validaciones
        if (![title, description, price, thumbnail, code, stock].every(Boolean) || price < 0 || stock < 0) {
            console.error('Todos los campos son obligatorios y el precio y el stock deben ser números positivos.');
            return;
        }

        if (this.products.some(product => product.code === code)) {
            console.error('Ya existe un producto con este código.');
            return;
        }

        // Producto con un id autoincremental
        const newProduct = new Product(title, description, price, thumbnail, code, stock);
        newProduct.id = ProductManager.generateProductId();

        // Se agrega producto al arreglo
        this.products.push(newProduct);

        console.log(`Producto "${title}" añadido.`);
    }

    // Método para obtener todos los productos
    getAllProducts() {
        return this.products;
    }

    // Método estático de ejemplo
    static exampleStaticMethod() {
        console.log("Este es un método estático de la clase ProductManager.");
    }

    // Método para obtener los productos ordenados por ID
    getProducts() {
        return this.products.slice().sort((a, b) => a.id - b.id);
    }

    // Método para buscar un producto por ID o código
    getProductById(identifier) {
        const productId = parseInt(identifier);  // Asegurémonos de que el identificador sea un número
    
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

    // Método estático para generar un nuevo ID de producto
    static generateProductId() {
        return this.nextProductId++;
    }
}

// Inicializar la propiedad estática nextProductId
ProductManager.nextProductId = 1;

// Crear una instancia de ProductManager
const productManager = new ProductManager();

// Añadir productos utilizando el método addProduct
productManager.addProduct('Perfume de Perros', 'Perfume Oh My Dog', 25.50, 'thumbnail1.jpg', 'code1', 10);
productManager.addProduct('Shampoo de Perros', 'Shampoo de perros pelo risado', 15.50, 'thumbnail2.jpg', 'code2', 20);

// Obtener todos los productos
console.log(productManager.getAllProducts());


ProductManager.exampleStaticMethod();





// TETSING 

// Instancia de la clase ProductManager:
const manager = new ProductManager(); 

console.log(manager.getProducts());

// Método addProduct
manager.addProduct("producto de prueba1", "descripcion producto prueba", 30.50, "sin imagen", "code3", 25);
manager.addProduct("producto de prueba2", "descripcion producto prueba2", 20.50, "sin imagen", "code4", 20);
manager.addProduct("producto de prueba3", "descripcion producto prueba3", 10.50, "sin imagen", "code5", 15);
console.log(manager.getProducts());

// Evaluar que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
manager.getProductById(3);
manager.getProductById(300);