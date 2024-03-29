const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log(`connecting to ${url}`)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((err) => {
    console.log('error connecting to MongoDB', err.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, 'Name is required']
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: (v) => {
        return /[0-9]{2,3}-[0-9]{6,}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'Number is required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)