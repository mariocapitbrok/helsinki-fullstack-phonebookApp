const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the required arguments: [Database password], [Person Name], [Phone Number]'
  )
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://mariocapitbrok:${password}@testcluster.kj2xo.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Person = mongoose.model('Person', personSchema)

let entries = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.use(express.json())

app.use(express.static('build'))

app.use(cors())

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(
  morgan(
    ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'
  )
)

const date = new Date()

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0))
}

const existingName = (name) => {
  return entries.find((e) => e.name === name)
}

console.log(existingName('Artso Hellas'))

app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${entries.length} people<p>` + `<p>${date}</p>`
  )
})

app.get('/api/persons', (request, response) => {
  response.json(entries)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const entry = entries.find((e) => e.id === id)

  if (entry) {
    response.json(entry)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  entries = entries.filter((e) => e.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'The name is missing',
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'The number is missing',
    })
  }

  if (existingName(body.name)) {
    return response.status(400).json({
      error: 'The name already exists in the phonebook',
    })
  }

  const entry = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  entries = entries.concat(entry)

  response.json(entry)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
