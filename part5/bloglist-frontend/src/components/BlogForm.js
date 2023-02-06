import { useState, useRef } from "react"
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const BlogForm = ({ user, handleLogout, createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const blogFormRef = useRef()

    const addBlog = (event) => {
        event.preventDefault()
        blogFormRef.current.toggleVisibility()
        createBlog({
            title: title,
            author: author,
            url: url,
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div className="formDiv">
            <h2>blogs</h2>
            <div>
                <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
            </div>
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <div>
                    <h2>create new</h2>
                    <form onSubmit={addBlog}>
                        <div>
                            title
                            <input
                                type="text"
                                value={title}
                                name="Title"
                                id="title"
                                onChange={({ target }) => setTitle(target.value)}
                                placeholder={'Blog title'}
                            />
                        </div>
                        <div>
                            author
                            <input
                                type="text"
                                value={author}
                                name="Author"
                                id="author"
                                onChange={({ target }) => setAuthor(target.value)}
                                placeholder={'Blog author'}
                            />
                        </div>
                        <div>
                            url
                            <input
                                type="text"
                                value={url}
                                name="Url"
                                id="url"
                                onChange={({ target }) => setUrl(target.value)}
                                placeholder={'Blog URL'}
                            />
                        </div>
                        <button id="createbtn" type='submit'>create</button>
                    </form>
                </div>
            </Togglable>
        </div>
    )
}

BlogForm.propTypes = {
    user: PropTypes.object.isRequired,
    handleLogout: PropTypes.func.isRequired,
    createBlog: PropTypes.func.isRequired
}

export default BlogForm