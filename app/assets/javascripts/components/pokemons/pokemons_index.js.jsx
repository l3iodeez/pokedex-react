var PokemonIndex = React.createClass({

  getInitialState: function () {
    return {pokemons: PokemonStore.all() };
  },
  _onChange: function () {
    this.setState({ pokemons: PokemonStore.all() });
  },
  componentDidMount: function () {
    PokemonStore.addPokemonsIndexChangeListener(this._onChange);
    ApiUtil.fetch();
  },
  componentWillUnmount: function () {
    PokemonStore.removePokemonsIndexChangeListener(this._onChange);
  },
  render: function () {
      return (
        <div>
        {this.state.pokemons.map(function (pokemon) {
          return <PokemonListItem pokemon={pokemon} />
        })}
        </div>
      );
  }

});
