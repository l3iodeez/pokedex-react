(function(root) {

  var _pokemons = [];

  var PokemonStore = root.PokemonStore = $.extend({}, EventEmitter.prototype);
  var POKEMONS_INDEX_CHANGE_EVENT = "INDEX_CHANGE";

  PokemonStore.all = function () {
    return _pokemons.slice();
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

  PokemonStore._changed = function () {
    this.emit(POKEMONS_INDEX_CHANGE_EVENT);
  };

  PokemonStore.dispatcherId = AppDispatcher.register(function (payload) {
    switch (payload.actionType) {
      case PokemonConstants.POKEMONS_RECEIVED:
        
        PokemonStore.resetPokemons(payload.pokemons);
        PokemonStore._changed();
        break;
    }
  });
}(this));
