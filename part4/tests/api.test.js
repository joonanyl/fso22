const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.blogs)
})

test('content-type of returned blogs is json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('correct number of blogs is returned', async () => {
    const returnedBlogs = (await api.get('/api/blogs')).body
    expect(returnedBlogs).toHaveLength(helper.blogs.length)
})

test('id field is correctly named', async () => {
    const returnedBlog = (await api.get('/api/blogs')).body[0]
    expect(returnedBlog.id).toBeDefined()
})

test('a new blog can be added', async () => {
    const newBlog = {
        id: 12123,
        title: "Test title",
        author: "Joona",
        url: "https://joonasblog.com/123123",
        likes: 3,
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    // Hakee tietokannassa olevat blogit ja vertaa pituutta kovakoodattuihin blogeihin
    const totalBlogs = await helper.getBlogs()
    expect(totalBlogs).toHaveLength(helper.blogs.length + 1)
})

test('Empty likes field will be replaced with 0', async () => {
    const newBlog = {
        id: 12123,
        title: "Empty like test",
        author: "Joona",
        url: "https://joonasblog.com/000",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const returnedBlog = (await api.get('/api/blogs')).body[helper.blogs.length]
    console.log(returnedBlog)
    expect(returnedBlog.likes).toBe(0)
})

test('Trying to POST an object with empty title and url will return status code 400', async () => {
    const initialBlogs = await helper.getBlogs()
    const initialLength = initialBlogs.length

    const newBlog = {
        id: 12123,
        author: "Joona",
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    expect(initialBlogs).toHaveLength(initialLength)
})

test('Blog deletion is working correctly', async () => {
    const blogsAtBeginning = await helper.getBlogs()
    const blogToDelete = blogsAtBeginning[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.getBlogs()
    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(blogToDelete.title)
})

test.only('A singular blog can be updated', async () => {
    const blogsAtBeginning = await helper.getBlogs()
    const blogToUpdate = blogsAtBeginning[0]
    blogToUpdate.title = "Updated title"

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.getBlogs()

    expect(blogsAtEnd[0].title).toBe("Updated title")
})

afterAll(() => {
    mongoose.connection.close()
})