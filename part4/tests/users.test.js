const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')

const api = supertest(app)


describe('User tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('salis', 10)
        const user = new User({ username: "tester", passwordHash })

        await user.save()
    })

    test('creation of an user is working', async () => {
        const usersAtBeginning = await helper.getUsersFromDB()

        const user = {
            username: "testi",
            name: "Testi Testaaja",
            password: "testi123"
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.getUsersFromDB()
        expect(usersAtEnd).toHaveLength(usersAtBeginning.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(user.username)
    })

    test('creation of an user with duplicate username is not possible', async () => {
        const usersAtBeginning = await helper.getUsersFromDB()
        console.log(usersAtBeginning)

        const user = {
            username: "tester",
            name: "Testi Kayttaja",
            password: "testi123"
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(400)

        const usersAtEnd = await helper.getUsersFromDB()
        expect(usersAtEnd).toHaveLength(usersAtBeginning.length)
    })
})