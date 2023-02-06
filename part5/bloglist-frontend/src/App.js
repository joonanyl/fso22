import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError(true)
      setErrorMessage('wrong username and/or password')
      setTimeout(() => {
        setErrorMessage(null)
        setError(!error)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken(null)
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat({ ...returnedBlog, user }))
      })

    setErrorMessage(`A new blog "${blogObject.title} by ${blogObject.author} was created!`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const likeBlog = (blogObject) => {
    blogService
      .update(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : { ...blog, likes: returnedBlog.likes }))
      })
  }

  const removeBlog = (id) => {
    blogService
      .remove(id)
      .then(returnedBlog => {
        setBlogs(blogs.filter(blog => blog.id !== returnedBlog.id))
      })
  }

  const sortLikes = (a, b) => b.likes - a.likes

  if (user === null) {
    return (
      <>
        <Notification message={errorMessage} error={error} />
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </>
    )
  }

  return (
    <>
      <Notification message={errorMessage} />
      <BlogForm
        user={user}
        handleLogout={handleLogout}
        createBlog={addBlog}
        blogs={blogs}
      />
      {
        blogs
          .sort(sortLikes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} username={user.username} />
          )
      }
    </>
  )
}

export default App
