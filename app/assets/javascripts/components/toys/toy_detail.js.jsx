var ToyDetail = React.createClass({
  getStateFromStore: function () {

    var pokemon = PokemonStore.find(parseInt(this.props.params.pokemonId));

    var pokemonToy;
    if (pokemon) {
      pokemon.toys.find(function (toy) {
        if (toy.id === parseInt(this.props.params.toyId)) {
          pokemonToy = toy;
          return;
        }
      }.bind(this));
    }
    return pokemonToy;
  },

  _onChange: function () {
    this.setState({toy: this.getStateFromStore()});
  },

  getInitialState: function () {
    return {toy: this.getStateFromStore()};
  },

  componentDidMount: function () {
    PokemonStore.addPokemonsDetailChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    PokemonStore.removePokemonsDetailChangeListener(this._onChange);
  },

  componentWillReceiveProps: function () {
    this._onChange();
  },

  render: function () {
    var toyDetailView;
    if (this.state.toy) {
      toyDetailView = (
        <div className="detail">
          <li>Name: {this.state.toy.name}</li>
          <li>Price: {this.state.toy.price}</li>
          <li>Happiness: {this.state.toy.name}</li>
          <li><img src={this.state.toy.image_url}></img></li>
        </div>
     );
   }
    return (
      <div>{toyDetailView}</div>
    );
  }
});
