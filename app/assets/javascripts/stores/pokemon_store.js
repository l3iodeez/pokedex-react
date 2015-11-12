(function(root) {

  var _pokemons = [];

  var PokemonStore = root.PokemonStore = $.extend({}, EventEmitter.prototype);
  var POKEMONS_INDEX_CHANGE_EVENT = "INDEX_CHANGE";
  var POKEMON_DETAIL_CHANGE_EVENT = "DETAIL_CHANGE";

  PokemonStore.all = function () {
    return _pokemons.slice();
  };

  PokemonStore.find = function(pokemonId) {
    var pokemon = _pokemons.find(function(pokemon) {
      if (pokemon.id === pokemonId) {
        return pokemon;
      }
    });
    return pokemon;
  };

  PokemonStore.addPokemon = function (pokemon) {
    var idx = _pokemons.indexOf(pokemon);

    if (idx === -1) {
      _pokemons.push(pokemon);
    } else {
      _pokemons[idx] = pokemon;
    }
  };

  PokemonStore.resetPokemons = function (pokemons) {
    _pokemons = pokemons;
  };

  PokemonStore.addPokemonsIndexChangeListener = function (callback) {
    this.on(POKEMONS_INDEX_CHANGE_EVENT, callback);
  };
  PokemonStore.removePokemonsIndexChangeListener = function (callback) {
    this.removeListener(POKEMONS_INDEX_CHANGE_EVENT, callback);
  };
  PokemonStore.addPokemonsDetailChangeListener = function (callback) {
    this.on(POKEMON_DETAIL_CHANGE_EVENT, callback);
  };
  PokemonStore.removePokemonsDetailChangeListener = function (callback) {
    this.removeListener(POKEMON_DETAIL_CHANGE_EVENT, callback);
  };
  PokemonStore._indexChanged = function () {
    this.emit(POKEMONS_INDEX_CHANGE_EVENT);
  };

  PokemonStore._detailChanged = function () {
    this.emit(POKEMON_DETAIL_CHANGE_EVENT);
  };

  PokemonStore.dispatcherId = AppDispatcher.register(function (payload) {
    switch (payload.actionType) {
      case PokemonConstants.POKEMONS_RECEIVED:

        PokemonStore.resetPokemons(payload.pokemons);
        PokemonStore._indexChanged();
        break;

      case PokemonConstants.POKEMON_RECEIVED:

        PokemonStore.addPokemon(payload.pokemon);
        PokemonStore._detailChanged();
        break;
      }
  });

}(this));
