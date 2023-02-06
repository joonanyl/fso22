import { useState } from "react"
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, removeBlog, username }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showMore, setShowMore] = useState(false)
  const [buttonText, setButtonText] = useState('show')

  const handleShow = () => {
    setShowMore(!showMore)
    buttonText === 'show' ? setButtonText('hide') : setButtonText('show')
  }

  const handleLike = () => {
    blog.likes++
    likeBlog({
      ...blog,
      likes: blog.likes++
    })
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} className={'blog'}>
      {blog.title} {blog.author}
      <button onClick={handleShow}>{buttonText}</button>
      {showMore &&
        <div>
          <br />
          {blog.url}
          <br />
          {blog.likes}
          <button onClick={handleLike}>like</button>
          <br />
          {blog.user.name}
          <br />
          {username === blog.user.username && <button onClick={handleRemove}>remove</button>}
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired

}

export default Blog