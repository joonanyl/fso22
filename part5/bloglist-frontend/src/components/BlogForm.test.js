import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
    test('BlogForm calls the callback mock function with the right data', async () => {
        const user = userEvent.setup()
        const createMock = jest.fn()

        render(<BlogForm user={{}} handleLogout={() => { }} createBlog={createMock} />)

        const titleInput = screen.getByPlaceholderText('Blog title')
        const authorInput = screen.getByPlaceholderText('Blog author')
        const urlInput = screen.getByPlaceholderText('Blog URL')

        const createButton = screen.getByText('create')

        await user.type(titleInput, 'Testing creation of a blog with react testing library')
        await user.type(authorInput, 'Joona N')
        await user.type(urlInput, 'https://jnblog.dev')
        await user.click(createButton)

        expect(createMock.mock.calls).toHaveLength(1)
        expect(createMock.mock.calls[0][0].title).toBe('Testing creation of a blog with react testing library')
        expect(createMock.mock.calls[0][0].author).toBe('Joona N')
        expect(createMock.mock.calls[0][0].url).toBe('https://jnblog.dev')
    })
})