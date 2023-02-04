import { useEffect, useState } from 'react'
import {
    Meta, //Para la meta información de la pagina
    Links, //Para importar hojas de estilos y esas cosas
    Outlet, //Para la navegación entre rutas
    Scripts, //Para evitar que se recargue la pagina
    LiveReload, //Para que actualice automaticamente
    useCatch,
    Link,
    Form
} from '@remix-run/react'
import styles from '~/styles/index.css'
import Header from '~/components/header'
import Footer from '~/components/footer'


export function meta() {
    return (
        {
            charset: 'utf-8',
            title: 'GuitarLA - Remix',
            viewport: "width=device-width,initial-scale=1"
        }
    )
}

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel: "preconnect",
            href: "https://fonts.googleapis.com"
        },
        {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossOrigin: 'true'
        },
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap"
        },
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

function App() {

    const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null
    // Si no haynada en el localStorage el resultado sera null afectando nuestra App por lo que se coloca el nulis coliseon o como se escriba.
//Este "typeof window !== 'undefined'" es porque remix actua tanto en el servidor como en el cliente pero como no tiene servidor configurado da un error y asi se resuleve.
    const [carrito, setCarrito] = useState(carritoLS)

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }, [carrito])

    const agregarCarrito = (guitarra) => {// guitarra viene desde $guitarraUrl.jsx
        if (carrito.some(guitarraState => guitarraState.id === guitarra.id)) {

            // Iterar sobre el arreglo, e identificar el elemento duplicado
            const carritoActualizado = carrito.map(guitarraState => {
                if (guitarraState.id === guitarra.id) {
                    //Reescribir la canidad
                    guitarraState.cantidad = guitarra.cantidad
                }
                return guitarraState
            })

            //Añadiendo al carrito
            setCarrito(carritoActualizado)

        } else {
            //Registro Nuevo, agregar al carrito.
            setCarrito([...carrito, guitarra])
        }
    }

    const actualizarCantidad = guitarra => {
        const carritoActualizado = carrito.map(guitarraState => {
            if (guitarraState.id === guitarra.id) {
                guitarraState.cantidad = guitarra.cantidad
            }
            return guitarraState
        })
        setCarrito(carritoActualizado)
    }

    const eliminarGuitarra = id => {
        const carritoActualizado = carrito.filter(guitarraState => guitarraState.id !== id)
        setCarrito(carritoActualizado)
    }

    return (
        <Document>
            <Outlet
                context={{
                    agregarCarrito,
                    carrito,
                    actualizarCantidad,
                    eliminarGuitarra
                }}
            />
        </Document>
    )
}

export default App

function Document({ children }) {    // children renderiza todo lo que esta en </Doument> 
    return (
        <html lang="es">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Header />
                {children}
                <Footer />

                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}

// Manejo de Errores
//Esto es para hacer la pagina de error
export function CatchBoundary() {
    const error = useCatch()
    return (
        <Document>
            <p className='error'>{error.status} {error.statusText}</p>
            <Link className='error-enlace' to='/'>Tal vez quieras volver a la pagina principal</Link>
        </Document>
    )
}

export function ErrorBoundary(error) {
    return (
        <document>
            <p className='error'>{error.status} {error.statusText}</p>
            <Link className='error-enlace' to='/'>Tal vez quieras volver a la pagina principal</Link>
        </document>
    )
}