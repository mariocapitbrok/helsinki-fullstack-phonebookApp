const mongoose = require('mongoose')

//const url = `mongodb+srv://mariocapitbrok:${password}@testcluster.kj2xo.mongodb.net/phonebookApp?retryWrites=true&w=majority`
const url = process.env.MONGODB_URI

console.log('connecting to', url)

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
