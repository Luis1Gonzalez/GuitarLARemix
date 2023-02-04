

export default function Curso({curso}) {
    
const {titulo, contenido, imagen} = curso

  return (
    <section className="curso">
        <style jsx="true">{`
            .curso {
                background-image: linear-gradient(to right, rgb(0 0 0 / .65), rgb(0 0 0 / .7)), url(${imagen.data.attributes.url})
            }
        `}</style>
        {/* Esta es la manera de asignar una iamagen traida desde una API porq en css no se puede. */}
        <div className="contenedor curso-grid">
            <div className="contenido">
                <h2 className="heading">{titulo}</h2>
                <p className="texto">{contenido}</p>
            </div>
        </div>
    </section>
  )
}
