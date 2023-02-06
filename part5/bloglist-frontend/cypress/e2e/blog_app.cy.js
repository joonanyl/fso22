describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user1 = {
            username: 'test',
            name: 'Testaaja Tester',
            password: 'secretpassword'
        }

        const user2 = {
            username: 'test2',
            name: 'Test McTester',
            password: 'secretpassword'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user1)
        cy.request('POST', 'http://localhost:3003/api/users/', user2)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('log in to application')
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('test')
            cy.get('#password').type('secretpassword')
            cy.get('#loginbtn').click()

            cy.contains('Testaaja Tester logged in')
        })

        it('fails with incorrect credentials', function () {
            cy.get('#username').type('asd')
            cy.get('#password').type('xd')
            cy.get('#loginbtn').click()

            cy.get('.error')
                .should('contain', 'wrong username and/or password')
                .should('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        })
    })

    describe.only('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'test', password: 'secretpassword' })
            cy.createBlog({ title: 'Test title', author: 'Some author', url: 'https://xd.com' })
        })

        it('A blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('Testing with cypress')
            cy.get('#author').type('Steve Jobs')
            cy.get('#url').type('https://localhost:3000')
            cy.get('#createbtn').click()
            cy.contains('Testing with cypress')
        })

        it('A blog can be liked', function () {
            cy.contains('show').click()
            cy.contains('0')
            cy.contains('like').click()
            cy.contains('1')
        })

        it('A blog can be removed', function () {
            cy.contains('Test title')
            cy.contains('Test title').contains('show').click()
            cy.contains('remove').click()
            cy.get('body').should('not.contain', 'Test title')
        })

        it('Remove button can only be seen if the blog is posted by the logged user', function () {
            cy.contains('Test title').contains('show').click()
            cy.contains('remove')
            cy.contains('logout').click()

            cy.login({ username: 'test2', password: 'secretpassword' })
            cy.visit('http://localhost:3000')

            cy.contains('Test title').contains('show').click()
            cy.get('body').should('not.contain', 'remove')
        })

        it.only('Blogs should be ordered by the amount of likes', function () {
            cy.contains('show').click()
            cy.contains('like').click()
            cy.contains('1')

            cy.createBlog({ title: 'Second blog', author: 'Random Tester', url: 'https://xd.com' })
            cy.get('.blog').eq(0).should('contain', 'Test title')
            cy.get('.blog').eq(1).should('contain', 'Second blog')

            cy.get('.blog').eq(1).contains('show').click()
            cy.contains('like').click()
            cy.contains('Second blog').contains('1')
            cy.contains('like').click()
            cy.contains('Second blog').contains('2')

            cy.get('.blog').eq(0).should('contain', 'Second blog')
        })
    })
})