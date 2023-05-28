const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as an argument')
    process.exit(1)
}

console.log(process.argv)
const password = process.argv[2]
const action = process.argv[3]

const url = `mongodb+srv://bunnito:${password}@puhdb.ksj892o.mongodb.net/puhelinluetteloApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)

if (action === "add") {
    const name = process.argv[4]
    const number = process.argv[5]
    const person = new Person({
        name: name,
        number: number,
    })
    
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else if (action === "getAll") {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}

