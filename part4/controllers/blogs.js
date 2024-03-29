const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findOne({ _id: request.params.id })
    response.json(blog)
})

blogsRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user

    if (!body.url && !body.title) {
        response.status(400).end()
    } else {
        const blog = new Blog({ ...request.body, likes: body.likes || 0, user: user._id })
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog)
        await user.save()

        response.status(201).json(savedBlog)
    }
})

blogsRouter.delete('/:id', tokenExtractor, userExtractor, async (request, response) => {
    if (!request.params.id) {
        return response.status(400).json({ error: 'id missing' })
    }

    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === user.id.toString()) {
        await Blog.deleteOne(blog)
        response.json(blog)
    } else {
        return response.status(401).json({ error: 'wrong token' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => console.log(error))
})

module.exports = blogsRouter