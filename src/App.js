import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [Message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

 
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
    <div style={{color: "red"}}> {message} </div>
    )
  }

  const handleUsernameInput = (event) => {
    setUserName(event.target.value)
  }

  const handlePasswordInput = (event) => {
    setPassword(event.target.value)
  }

  const handleLogIn = async(event) => {
    // console.log('login')
    event.preventDefault()

    try {
      console.log({username},{password})
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user);
      setUserName("");
      setPassword("");
    } catch (expection) {
      setMessage("wrong username or password.")
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedNoteappUser")
  }

  

  const handleTitleInput = (event) => {
    event.preventDefault();
    setTitle(event.target.value)
  }
  const handleAuthorInput = (event) => {
    event.preventDefault();
    setAuthor(event.target.value)
  }
  const handleUrlInput = (event) => {
    event.preventDefault();
    setUrl(event.target.value)
  }

  const createNewBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    blogService.create(newBlog).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setMessage('a new blog has been added.')
      setTitle('')
      setAuthor('')
      setUrl('')
    })

  }

  const loginForm =  () => (
    <form onSubmit={handleLogIn}>
          <p>username: 
            <input 
              type='text'
              value={username}
              onChange={handleUsernameInput}>
            </input>
          </p>
          <p>password:
            <input
              type='password'
              value={password}
              onChange={handlePasswordInput}>
            </input>
          </p>
          <button type='submit'>log in</button>
    </form>
  )

  const createNewBlogForm = () => (
    <form onSubmit={createNewBlog}>
        <h2>create new</h2>
        <p>title:
          <input
          value={title}
          onChange={handleTitleInput}></input>
        </p>
        <p>author:
          <input
          value={author}
          onChange={handleAuthorInput}></input>
        </p>
        <p>url:
          <input
          value={url}
          onChange={handleUrlInput}></input>
        </p>
        <button type='submit'>create</button>
    </form>

  )


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
        <Blog key={blog.id} blog={blog} />
      )}
      
      
    </div>
  )
}

export default App