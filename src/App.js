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

  const Notification = ({ message }) => {
    if (message === null){
      return null
    }
    return (
      <div style={{ color: 'red' }}> {message} </div>
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

  // const addNewBlog = (blogObject) => {

  //     blogService.create(blogObject).then(returnedBlog => {
  //         setBlogs(blogs.concat(returnedBlog))
  //         setMessage('a new blog has been added.')
  //     })

  // }


  const addNewBlog = async(blogObject) => {

    // const newAddedBlog =  await blogService.create(blogObject)

    const afterAddedBlogs = await blogService.create(blogObject)

    // setBlogs(blogs.concat(newAddedBlog))
    setBlogs(afterAddedBlogs)
    setMessage('a new blog has been added.')

  }

  const loginForm =  () => (
    <Togglable buttonLabel="Log in">
      <LoginForm
        loginAction={handleLogIn}
      />
    </Togglable>

  )

  const createNewBlogForm = () => (
    // <Togglable buttonLabel="create">
    //     <CreateNewBlogForm addNewBlog={addNewBlog}/>
    // </Togglable>

    <Togglable buttonLabel="create">
      <CreateNewBlogForm addNewBlog={addNewBlog}/>
    </Togglable>

  )

  const likeBlog = async(blog) => {
    const updateLikeBlog = await blogService.update(blog)



    const updatedBlogLists = blogs.map(blog => blog.id === updateLikeBlog.id? updateLikeBlog:blog)
    setBlogs(updatedBlogLists)
  }

  const sortByLikes = (blogs) => {
    // console.log(blogs)
    // console.log(typeof(blogs[0].likes))
    const sortedBlogs = [].slice.call(blogs).sort((a,b) => b.likes-a.likes)

    // console.log(sortedBlogs)
    setBlogs(sortedBlogs)

  }

  const deleteBlog = async(blog) => {

    if (window.confirm(`Remove blog ${blog.title}`)) {
      await blogService.remove(blog)
      console.log('delete finished')
      // const newBlogs = blogs.filter(blog => blog.id !== blog.id)
      const newBlogs = blogs.filter(b => b.id !== blog.id)
      // console.log(newBlogs)
      setBlogs(newBlogs)
    }
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



      <div>
                sort: most like <button onClick={() => sortByLikes(blogs)}> sort </button>
      </div>


      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
        />
      )}


    </div>
  )
}
export default App