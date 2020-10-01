import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'

import LoginForm from './components/LoginForm'
import CreateNewBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [Message, setMessage] = useState(null)
    const [user, setUser] = useState(null)

 
    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )   
    }, [])

    const Notification = ({message}) => {
        if (message === null){
            return null
        }
        return (
            <div style={{color: 'red'}}> {message} </div>
        )
    }


    const handleLogIn = async(userInfo) => {
        // event.preventDefault()
        console.log('login')

        try {
            const user = await loginService.login(userInfo)

            window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
        } catch (expection) {
            setMessage('wrong username or password.')
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        }
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedNoteappUser')
    }

    const addNewBlog = (blogObject) => {

        blogService.create(blogObject).then(returnedBlog => {
            setBlogs(blogs.concat(returnedBlog))
            setMessage('a new blog has been added.')
        })

    }

    const loginForm =  () => (
        <Togglable buttonLabel="Log in">
            <LoginForm
                loginAction={handleLogIn}
            />
        </Togglable>

    )

    const createNewBlogForm = () => (
        <Togglable buttonLabel="create">
            <CreateNewBlogForm addNewBlog={addNewBlog}/>
        </Togglable>

    )

    const likeBlog = async(blog) => {
        console.log('app like blog')

        const updateLikeBlog = await blogService.update(blog)

        

        const updatedBlogLists = blogs.map(blog=> blog.id === updateLikeBlog.id? updateLikeBlog:blog)
        setBlogs(updatedBlogLists)
    }


    return (
        <div>
            <h2>blogs</h2>
            <Notification message={Message}></Notification>


            {user === null? 
                loginForm():
                <div>
                    {user.username} logged in
                    <button onClick={handleLogout}>
            log out
                    </button>
                    {createNewBlogForm()}
                </div>}

          

      

            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} user={user} likeBlog={likeBlog}/>
            )}
      
      
        </div>
    )
}

export default App