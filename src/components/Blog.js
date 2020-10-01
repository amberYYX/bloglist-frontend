import React, { useState } from 'react'
import userService from '../services/users'

const Blog = ({ blog, user }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [blogUser, setBlogUser] = useState(null)

    const findBlogUser = async() => {
        const blogUser = await userService.findUserbyID(`${blog.user}`)
        setBlogUser(blogUser)
        console.log(`user ${blogUser}`)
    }

    return (
        <div style={blogStyle}>
            <div>
                {blog.title} {blog.author} <button>view</button>
            </div>

            <div>
                <p>details</p>
                {blog.url} <br/>
                {blog.likes} <button>like</button><br/>
                {/* {findBlogUser} */}
                {user===null? null:user.name}
                {/* {`added by ${blogUser.name}`} <br/> */}
                {/* {blog.user.name === user.name? <button> remove</button>: null}  */}
            </div>
        </div>
    )
    
}

export default Blog