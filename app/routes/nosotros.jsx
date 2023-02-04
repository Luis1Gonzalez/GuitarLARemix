import imagen from '../../public/img/nosotros.jpg'
import styles from '~/styles/nosotros.css'


export function meta(){
  return{
    title:'GuitarLA - Sobre Nosotros',
    description: 'Venta de guitarras, blog de música'
  }
}
// La funcion meta es para la meta informacion en este caso de la pagina 'nosotros'
//Se usa {} en vez de (), se puede usar cualquiera.
export function links(){
  return[
    {
      rel:'stylesheet',
      href:styles
    },
    {
      rel: 'preload',
      href: imagen,
      as: 'image'
    }
  ]
}
//Con este link estamos importando la hoja de estilos de nosotros.css
//Tambien se pude cargar preloaders que mandan a cargar por ejemplo a una imagen que muy pesada, previamente 

function Nosotros() {

  return (
    <main className='contenedor nosotros'>
      <h2 className='heading'>Nosotros</h2>

      <div className='contenido'>
        <img src={imagen} alt="imagen sobre nosotros" />
      
      <div>
        <p>Fusce finibus euismod cursus. Sed in lacus ut tellus cursus gravida. Proin consectetur viverra eros molestie vulputate. Aenean convallis porttitor gravida. Nulla in convallis enim. Nam dictum lacus et ultrices facilisis.  </p>

        <p>Ut nec cursus arcu. Mauris consequat quam in varius vehicula. Aenean nec ultricies diam. Curabitur facilisis semper dui, ut varius ex malesuada vel. Sed et metus quam. Mauris porta ligula orci. </p>

      </div>

      </div>

    </main>
  )
}

export default Nosotros