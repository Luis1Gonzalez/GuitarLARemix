import styles from '~/styles/carrito.css'
import { useOutletContext } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { ClientOnly } from 'remix-utils'

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

export function meta() {
    return {
        title: 'GuitarLA - Carrito de Compras',
        description: 'Venta de guitarras, música, blog, carrito de compras, tienda'
    }
}

export default function Carrito() {

    const [total, setTotal] = useState(0)

    const { carrito, actualizarCantidad, eliminarGuitarra } = useOutletContext()
    // Estas funciones vienen desde el root

    useEffect(() => {
        const calculoTotal = carrito.reduce((total, producto) => total + (producto.cantidad * producto.precio), 0)
        setTotal(calculoTotal)
    }, [carrito])

    return (
        <ClientOnly fallback={'cargando...'}>
            {() => (
        <main className='contenedor'>
            <h1 className='heading'>Carrito de Compras</h1>

            <div className='contenido'>
                <div className='carrito'>
                    <h2>Articulos</h2>

                    {carrito?.length === 0 ? 'Carrito Vacio' : (
                        carrito.map(producto => (
                            <div className='producto' key={producto.id}>

                                <div>
                                    <img src={producto.imagen} alt={`imagen del producto ${producto.nombre}`} />
                                </div>


                                <div>
                                    <p className='nombre'>{producto.nombre}</p>
                                    <p>Cantidad: </p>

                                    <select className='select' value={producto.cantidad} onChange={e => actualizarCantidad({
                                        // pasamos este objeto para modificar la cantidad
                                        cantidad: +e.target.value,
                                        // con el signo de + que precede el evento cambiamos el resultado de string a numero, por defecto un select siempre arroja un string
                                        id: producto.id
                                    })}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>

                                    <p className='precio'>$ <span>{producto.precio}</span></p>
                                    <p className='subtotal'>Subtotal: $ <span>{producto.cantidad * producto.precio}</span></p>
                                </div>

                                <button className='btn_eliminar' type='button' onClick={() => eliminarGuitarra(producto.id)}>X</button>

                            </div>
                        ))
                    )}
                </div>
                <aside className='resumen'>
                    <h3>Resumen del Pedido</h3>
                    <p>Total a pagar: $ {total}</p>
                </aside>

            </div>
        </main>
        )}
        </ClientOnly>
    )
}
