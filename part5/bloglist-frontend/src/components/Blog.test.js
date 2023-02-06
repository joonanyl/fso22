import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from "./Blog"

describe('<Blog />', () => {
    const blog = {
        title: "Testiblogi",
        author: "Joona",
        url: "https://testiblogi.com",
        likes: 100,
        user: {
            username: "joonanyl",
            name: "Joona Nylander",
            id: "637757c3eaea164c1bd9d99d"
        },
        id: "63775a6ea5415bb0e6cba882"
    }

    test('renders a blog', () => {
        const mockFunc = () => { }
        const { container } = render(<Blog blog={blog} likeBlog={mockFunc} removeBlog={mockFunc} loggedUsername={'joona'} />)

        const div = container.querySelector('.blog')
        expect(div).toHaveTextContent(blog.title)
        expect(div).toHaveTextContent(blog.author)
    })

    test('shows additional info after a button is pressed', async () => {
        const mockFunc = () => { }
        const { container } = render(<Blog blog={blog} likeBlog={mockFunc} removeBlog={mockFunc} loggedUsername={'joona'} />)

        const user = userEvent.setup()
        const button = screen.getByText('show')
        await user.click(button)

        const div = container.querySelector('.blog')
        expect(div).toHaveTextContent(blog.url)
        expect(div).toHaveTextContent(blog.likes)
        expect(div).toHaveTextContent(blog.user.username)
    })

    test('clicking like button two times calls event handler twice', async () => {
        const mockHandler = jest.fn()

        render(<Blog blog={blog} likeBlog={mockHandler} removeBlog={mockHandler} loggedUsername={'joona'} />)

        const user = userEvent.setup()

        const showButton = screen.getByText('show')
        await user.click(showButton)

        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})