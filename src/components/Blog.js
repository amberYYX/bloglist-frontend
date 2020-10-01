import React, {useState}from 'react'

const Blog = ({ blog, user, likeBlog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const [visible, setVisible] = useState(false)

    const showDetails = {display:visible?'':'none'}


    // const likeChecked = (blog) => {
    //     console.log('like checked')
    //     console.log(blog)
    // }
    
    return (
        <div style={blogStyle}>
            <div>
                {blog.title} {blog.author} <button onClick={()=>setVisible(!visible)}>view</button>
            </div>

            <div style={showDetails}>
                {blog.url} <br/>
                {blog.likes} <button onClick={()=>likeBlog(blog)}>like</button><br/>
                {`added by ${blog.user.username}`} <br/>
                {user !== null && user.name === blog.user.name ? <button> remove</button>: null}
            </div>
        </div>
    )
    
}

export default Blog