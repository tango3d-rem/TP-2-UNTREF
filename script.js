document.addEventListener('DOMContentLoaded', function () {
    const listaProductos = document.getElementById('lista-productos');

    // Agregar un retraso de (100 milisegundos) para simular una carga más lenta.
    setTimeout(() => {
        // Cargar productos desde el archivo JSON utilizando fetch.
        fetch('productos.json')
            .then(response => response.json())
            .then(data => {
                listaProductos.innerHTML = ''; // Limpiar contenido anterior.

                data.forEach(producto => {
                    const productoDiv = document.createElement('div');
                    productoDiv.classList.add('producto');
                    productoDiv.innerHTML = `
                        <h2>${producto.código}</h2>
                        <img src="${producto.imagen}" alt="${producto.código}" style="max-width: 100px; height: auto;">
                        <button class="ver-detalle" data-producto='${JSON.stringify(producto)}'>Ver Detalles</button>
                    `;

                    const botonVerDetalle = productoDiv.querySelector('.ver-detalle');
                    botonVerDetalle.addEventListener('click', () => {
                        mostrarDetalle(producto);
                    });

                    listaProductos.appendChild(productoDiv);
                });
            })
            .catch(error => console.error('Error al cargar productos:', error));
    }, 100); // 100 milisegundos de retraso.
});

function mostrarDetalle(producto) {
    localStorage.setItem('productoSeleccionado', JSON.stringify(producto));
    window.location.href = 'detalle.html';
}; 

// Agregar el código para mostrar detalles en detalle.html
document.addEventListener('DOMContentLoaded', function () {
    const detalleContainer = document.getElementById('detalle-container');
    const volverButton = document.querySelector('.volver');

    // Recuperar el producto seleccionado almacenado en localStorage.
    const productoSeleccionado = JSON.parse(localStorage.getItem('productoSeleccionado'));

    // Comprobar si se ha seleccionado un producto.
    if (productoSeleccionado) {
        // Mostrar los detalles del producto en el contenedor.
        detalleContainer.innerHTML = `
            <h2>${productoSeleccionado.código}</h2>
            <p>${productoSeleccionado.detalle}</p>
            <p>Precio: ${productoSeleccionado.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
            <p>Puntuación: ${productoSeleccionado.puntuación}</p>
            <img src="${productoSeleccionado.imagen}" alt="${productoSeleccionado.código}" style="max-width: 400px; height: auto;">
        `;

        // Agregar un evento al botón de volver para regresar al listado principal.
        volverButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    } else {
        // Si no se seleccionó ningún producto, redirigir de nuevo al index.
        window.location.href = 'index.html';
    }
});