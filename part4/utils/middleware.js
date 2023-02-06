const jwt = require("jsonwebtoken")
const User = require("../models/user")

const tokenExtractor = (request, response, next) => {
    const authHeader = request.headers['authorization']

    if (!authHeader.toLowerCase().startsWith('bearer ')) {
        return response.status(401)
    }

    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return response.status(401)
    }

    request.token = token
    next()
}

const userExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET)
        if (decodedToken) {
            request.user = await User.findById(decodedToken.id)
        }
    }

    next()
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({
            error: 'id is formatted wrong'
        })
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({
            error: error.message
        })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })
    }
    console.log(error.message)

    next(error)
}

module.exports = {
    tokenExtractor, errorHandler, userExtractor
}