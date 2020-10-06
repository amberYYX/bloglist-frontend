import React, { useState }from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, likeBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const showDetails = { display:visible?'':'none' }


  // const likeChecked = (blog) => {
  //     console.log('like checked')
  //     console.log(blog)
  // }

  const deleteCheck = (blog) => {
    if(window.confirm('Do you really want to delete this blog?')){
      deleteBlog(blog)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>view</button>
      </div>

      <div style={showDetails}>
        {blog.url} <br/>
        {blog.likes} <button onClick={() => likeBlog(blog)}>like</button><br/>
        {`added by ${blog.user.name}`} <br/>
        {user !== null && user.name === blog.user.name ? <button onClick={() => deleteCheck(blog)}> remove</button>: null}
      </div>
    </div>
  )

}

Blog.propTypes = {
  blog:PropTypes.object.isRequired,
  user:PropTypes.object,
  likeBlog:PropTypes.func.isRequired,
  deleteBlog:PropTypes.func.isRequired
}



export default Blog