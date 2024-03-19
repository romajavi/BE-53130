const express = require('express');
const app = express();

// Importar los routers
const productsRouter = require('./src/routes/products');
const cartsRouter = require('./src/routes/carts');

// Configurar las rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


// Iniciar el servidor
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});


// ///////TESTING/////////TESTING/////////TESTING/////////TESTING/////////TESTING/////////TESTING


// //Tarea 1:

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





// //Tarea 2:

// // Creo una instancia de la clase "ProductManager"
// const manager = new ProductManager('productos.json');

// // Llamo al método "getProducts" después de crear la instancia
// const initialProducts = manager.getProducts();
// console.log('Productos cargados desde el archivo:', initialProducts);

// // 3. Llamo al método "addProduct" con los campos especificados
// manager.addProduct('Producto de Prueba', 'Este es un producto de prueba', 200, 'Sin imagen', 'abc123', 25);

// // 4. Llamo al método "getProducts" nuevamente
// const updatedProducts = manager.getProducts();
// console.log('Lista de productos actualizada:', updatedProducts);

// // 5. Llamo al método "getProductById" y corroboro su funcionamiento
// try {
// const productIdToFind = updatedProducts[8].id; // Usamos el ID de un producto que no exista.
// const foundProduct = manager.getProductById(productIdToFind - 1);
// } catch (error) {
// console.error('Producto no encontrado con ID informado:', error.message);
// }

// // 6. Llamo al método "updateProduct" e intento cambiar un campo de algún producto
// const productIdToUpdate = 1; // Aquí el ID del producto que quiero actualizar.
// const updatedProduct = manager.updateProduct(productIdToUpdate, {
// price: 150,
// stock: 5,
// id: 10
// });

// // 7. Llamo al método "deleteProduct" para eliminar un producto
// manager.deleteProduct(2);






//Tarea 3

// Se instalarán las dependencias a partir del comando npm install. COMPLETADO
// Se echará a andar el servidor. COMPLETADO
// Se revisará que el archivo YA CUENTE CON AL MENOS DIEZ PRODUCTOS CREADOS al momento de su entrega, es importante para que los tutores no tengan que crear los productos por sí mismos, y así agilizar el proceso de tu evaluación. COMPLETADO
// Se corroborará que el servidor esté corriendo en el puerto 8080. COMPLETADO
// Se mandará a llamar desde el navegador a la url http://localhost:8080/products sin query, eso debe devolver todos los 10 productos. OK
// Se mandará a llamar desde el navegador a la url http://localhost:8080/products?limit=5 , eso debe devolver sólo los primeros 5 de los 10 productos. OK
// Se mandará a llamar desde el navegador a la url http://localhost:8080/products/2, eso debe devolver sólo el producto con id=2. OK
// Se mandará a llamar desde el navegador a la url http://localhost:8080/products/34123123, al no existir el id del producto, debe devolver un objeto con un error indicando que el producto no existe. OK