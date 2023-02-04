import { useLoaderData } from '@remix-run/react'
import { getPost } from '~/models/posts.server'
import { formatearFecha } from '~/utils/helpers'

export function meta({data}) {
  if(!data) {
      return {
          title: 'GuitarLA - Entrada no encontrada',
          description: `Guitarras, venta de guitarras, entrada no encontrada`
      }
  }
  return {
      title: `GuitarLA - ${data?.data[0]?.attributes.titulo}`,
      description: `Guitarras, venta de guitarras, entrada ${data.data[0].attributes.titulo}`
  }
}

export async function loader({params}) {
    const { postUrl } = params
    const post = await getPost(postUrl)
    if(post.data.length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'Entrada no encontrada'
        })
    }
    return post
}


export default function Post() {
  const post = useLoaderData()
  const { titulo, contenido, imagen, publishedAt } = post?.data[0]?.attributes
  return (
    <article className='post mt-3'>
        <img className="imagen" src={imagen?.data?.attributes?.url} alt={`imagen blog ${titulo}`} />
            <div className="contenido">
                <h3>{titulo}</h3>
                <p className='fecha'>{formatearFecha(publishedAt)}</p>
                <p className="texto">{contenido}</p>
            </div>
    </article>
  )
}






























// import { getPost } from '~/models/posts.server'
// import { useLoaderData } from '@remix-run/react'
// import { formatearFecha } from '~/utils/helpers'


// export async function loader({ params }) {  // Se filtra la url con los params y la forma con la que se obtiene la url es con el miosmo nombre de este archivo.
//   const { postUrl } = params
//   console.log(postUrl)
//   const post = await getPost(postUrl) // De esta forma le pasamos la url a la función getPost del archivo posts.server.js

//   if (post.data.length === 0) {
//     throw new Response('', {
//       status: 404,
//       statusText: 'Post No Encontrado'
//     })
//   }

//   return post
// }

// export function meta({ data }) {
//   if (!data) {
//     return {
//       title: 'GuitarLA - Post No Encontrado',
//       description: 'Guitarras, venta de guitarras, post no encontrado'
//     }
//   }
//   return {
//     title: `GuitarLA - ${data.data[0].attributes.titulo}`,
//     description: `Guitarras, venta de guitarras, post ${data.data[0].attributes.titulo}`
//   }
// }



// export default function Post() {

//   const post = useLoaderData()
//   const { titulo, contenido, publishedAt, imagen } = post?.data[0]?.attributes
//   return (
//     <article className='post mt-3'>
//       <img className='imagen' src={imagen?.data.attributes.url} alt={`imagen blog ${titulo}`} />
//       <div className='contenido'>
//         <h3>{titulo}</h3>
//         <p className='fecha'>{formatearFecha(publishedAt)}</p>
//         <p className="texto">{contenido}</p>

//       </div>
//     </article>
//   )
// }
