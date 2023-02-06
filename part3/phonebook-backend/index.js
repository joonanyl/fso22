require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const errorHandler = (err, req, res, next) => {
  console.log(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'id is in wrong format' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  next(err)
}

app.use(errorHandler)

morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person)
        res.json(person)
      else
        res.status(404).end()
    })
    .catch(err => next(err))
})

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
        `)
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      console.log(result)
      res.status(204).end()
    })
    .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const person = new Person({
    'name': body.name,
    'number': body.number,
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(err => next(err))
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})