var PokemonForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],
  getInitialState: function () {
    return({
      name: "",
      attack: "",
      defense: "",
      poke_type: -1,
      moves: [],
      image_url: ""
    });
  },
  _onSubmit: function (event) {
    event.preventDefault();
    var newPokemon = {
      name: this.state.name,
      attack: this.state.attack,
      defense: this.state.defense,
      poke_type: this.state.poke_type,
      moves: this.state.moves.split(' '),
      image_url: this.state.image_url
    };
    var callback = function (id) {
      this.history.pushState(null, "/pokemon/" + id);
    }.bind(this);
    ApiUtil.createPokemon(newPokemon, callback);
  },

  render: function () {
      return (
        <form onSubmit={this._onSubmit} className="new-pokemon">
          <label>Name
            <input type="text" name="name" valueLink={this.linkState("name")} />
          </label>
          <label>Attack
            <input type="text" name="attack" valueLink={this.linkState("attack")} />
          </label>
          <label>Defense
            <input type="text" name="defense" valueLink={this.linkState("defense")} />
          </label>
          <label>PokeType
            <select name="poke_type" valueLink={this.linkState("poke_type")}>
              {window.pokemonTypes.map(function (type) {
                return <option value={type}>{type}</option>;
              })}
            </select>
          </label>
          <label>Moves
            <input name="moves" type="text" valueLink={this.linkState("moves")} />
          </label>
          <label>Image URL
            <input name="image_url" type="text" valueLink={this.linkState("image_url")} />
          </label>
          <button>Create Pokemon</button>
        </form>
      );
  }
});
