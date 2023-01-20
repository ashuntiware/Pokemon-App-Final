const React = require('react')

class Show extends React.Component {
    render() {
        const { pokemon } = this.props
        console.log(this.props)
        return(

            <div>
                <h1> Find All The Pokemon </h1>
                <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                <img src={'http://img.pokemondb.net/artwork/' + pokemon.name.toLowerCase() + ".jpg"} ></img>
                <a href='/pokemon/new'>Find a New Pokemon</a> | <a href="/pokemon">Back to Found Pokemon</a>
            </div>
        )
    }
}

module.exports = Show