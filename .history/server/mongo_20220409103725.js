const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the required arguments: [Database password], [Person Name], [Phone Number]'
  )
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://mariocapitbrok:${password}@testcluster.kj2xo.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (name) {
  const newPerson = new Person({
    name: name,
    number: number,
  })

  newPerson.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
