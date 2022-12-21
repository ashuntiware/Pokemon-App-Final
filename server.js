require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const db = mongoose.connection;
const methodOverride = require("method-override");

const Pokemon = require('./models/pokemon.js');
// Set up middleware

app.use((req, res, next) => {
    console.log('I run for all routes')
    next()
})

app.use(express.urlencoded({extended:false}))

app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

// Setting up Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.once('open', ()=> {
    console.log('connected to mongo')
})
mongoose.set('strictQuery', true)

// Index route = Show all records
app.get('/pokemon/', (req,res) => {
Pokemon.find({}, (error, allPokemon)=> {
    res.render("Index", {
        allPokemon: allPokemon // getting all pokemon from db to pass as props
    })
})
})

// New - Get a form to create a new record
app.get('/pokemon/new', (req,res) =>{
    res.render('New')
})
// Delete - Delete this one record

// Update - Modifying a record

// Create - send the filled form to db and create a new record
app.post('/pokemon', (req,res) => {
    pokemon.create(req.body, (error, createdPokemon) => {
        res.redirect('/pokemon')
    })
    
})
// Edit - Get the form with the record to update

// Show route - Show me a particular record
app.get('/pokemon/:indexOfPokemonArray', function(req, res){
    pokemon.findById(req.params.indexOfPokemonArray, (err, foundPokemon)=> {
        res.render('Show', {
            pokemon: foundPokemon
        })
    })
})
// THIS CODE WAS TO CONNECT TO MONGO DB; NO LONGER NEEDED.
// const pokemonArray = [
//     {name: "bulbasaur", img: "http://img.pokemondb.net/artwork/bulbasaur"},
//     {name: "ivysaur", img: "http://img.pokemondb.net/artwork/ivysaur"},
//     {name: "venusaur", img: "http://img.pokemondb.net/artwork/venusaur"},
//     {name: "charmander", img: "http://img.pokemondb.net/artwork/charmander"},
//     {name: "charizard", img: "http://img.pokemondb.net/artwork/charizard"},
//     {name: "squirtle", img: "http://img.pokemondb.net/artwork/squirtle"},
//     {name: "wartortle", img: "http://img.pokemondb.net/artwork/wartortle"}
//  ]

//  //THIS CODE WAS ALSO USED TO CONNECT DATA TO MONGO DB; NO LONGER NEEDED
// Pokemon.insertMany(pokemonArray)
// // if database transaction succeeds
// .then((pokemon) => {
//   console.log(pokemon)
// })
// // if database transaction fails
// .catch((error) => {
//   console.log(error)
// })
// // close db connection either way
// .finally(() => {
// //  db.close()
// })

app.listen(port, () => {
    console.log('listening')
})

