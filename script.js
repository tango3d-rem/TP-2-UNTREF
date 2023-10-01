document.addEventListener('DOMContentLoaded', function () {
    const listaProductos = document.getElementById('lista-productos');
    const detalleContainer = document.getElementById('detalle-container');
    const volverButton = document.querySelector('.volver');
    let productos;

    // Función para convertir la puntuación en estrellas
    function convertirAEstrellas(puntuación) {
        const estrellasLlenas = puntuación.length;
        const estrellasVacias = 5 - estrellasLlenas;

        const estrellasHTML = '<span class="estrella-llena">★</span>'.repeat(estrellasLlenas) +
            '<span class="estrella-vacia">☆</span>'.repeat(estrellasVacias);

        return `<p class="puntuacion-estrellas">${estrellasHTML}</p>`;
    }

    // Función para mostrar los detalles de un producto
    function mostrarDetalle(producto) {
        localStorage.setItem('productoSeleccionado', JSON.stringify(producto));
        window.location.href = 'detalle.html';
    }

    // Función para cargar la lista de productos.
    const cargarProductos = async () => {
        // Cargar los productos desde el archivo JSON (productos.json) utilizando fetch.
        try {
            const response = await fetch('productos.json');
            productos = await response.json();
            // Limpia el contenido anterior de la lista.
            listaProductos.innerHTML = '';
            // Recorre la lista de productos y crea elementos para cada uno.
            productos.forEach(producto => {
                const productoDiv = document.createElement('div');
                productoDiv.classList.add('producto');
                productoDiv.innerHTML = `
                    <h2>${producto.código}</h2>
                    <img src="${producto.imagen}" alt="${producto.código}" style="max-width: 100px; height: auto;">
                    <p>${convertirAEstrellas(producto.puntuación)}</p>
                    <button class="ver-detalle" data-producto='${JSON.stringify(producto)}'>Ver Detalles</button>
                `;

                const botonVerDetalle = productoDiv.querySelector('.ver-detalle');
                botonVerDetalle.addEventListener('click', () => {
                    mostrarDetalle(producto);
                });

                listaProductos.appendChild(productoDiv);
            });
        } catch (error) {
            console.error('Error al cargar productos:', error);
        }
    }

    // Función para mostrar los detalles del producto en detalle.html
    const mostrarDetallesEnDetalleHTML = () => {
        const productoSeleccionado = JSON.parse(localStorage.getItem('productoSeleccionado'));

        if (productoSeleccionado) {
            detalleContainer.innerHTML = `
                <h2>${productoSeleccionado.código}</h2>
                <p>${productoSeleccionado.detalle}</p>
                <p>Precio: ${productoSeleccionado.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
                <p>${convertirAEstrellas(productoSeleccionado.puntuación)}</p>
                <img src="${productoSeleccionado.imagen}" alt="${productoSeleccionado.código}" style="max-width: 400px; height: auto;">
            `;

            volverButton.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        } else {
            // Si no se seleccionó ningún producto, redirigir de nuevo al index.
            window.location.href = 'index.html';
        }
    }

    // Cargar productos al inicio
    cargarProductos();

    // Mostrar detalles en detalle.html
    if (detalleContainer) {
        mostrarDetallesEnDetalleHTML();
    }
});