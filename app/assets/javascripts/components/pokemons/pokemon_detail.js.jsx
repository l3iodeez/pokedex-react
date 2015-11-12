var PokemonDetail = React.createClass({
  getInitialState: function () {
    return {pokemon: this.getStateFromStore()};
  },

  componentWillReceiveProps: function (props) {
    ApiUtil.fetchPokemon(props.params.pokemonId);
    debugger
  },

  componentDidMount: function () {
    PokemonStore.addPokemonsIndexChangeListener(this.getStateFromStore);
    PokemonStore.addPokemonsDetailChangeListener(this.getStateFromStore);
  },
  getStateFromStore: function () {
    var pokemonId = parseInt(this.props.params.pokemonId);
    this.setState({pokemon: PokemonStore.find(pokemonId)});
  },

  render: function () {
    var pokemon = this.state.pokemon;
    var detailView;
    if (this.state.pokemon) {
      detailView = (
        <div className="detail">
          <img src={pokemon.image_url}></img>
          <li>Name: {pokemon.name}</li>
          <li>Attack: {pokemon.attack}</li>
          <li>Defense: {pokemon.defense}</li>
          <li>Type: {pokemon.poke_type}</li>
          <li>Moves: {pokemon.moves}</li>
        </div>
      );
    }
    return (
      <div>
      {detailView}
      </div>
    );
  }

});
