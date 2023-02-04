import Post from './post'

export default function ListadoPosts({posts}) {

  return (
    <>
        <h2 className='heading'>Blog</h2>

        {posts?.length && (
      <div className='blog'>
        {posts.map(post => (
          <Post
            key={post.id}
            post={post.attributes}
          />
        ))}
      </div>    
      )}     
    </>
  )
}
