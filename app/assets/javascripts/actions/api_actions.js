(function(root){

  var ApiActions = root.ApiActions = {};

  ApiActions.receiveAllPokemons = function(pokemons) {
    AppDispatcher.dispatch({
      actionType: PokemonConstants.POKEMONS_RECEIVED,
      pokemons: pokemons
    });
  };

  ApiActions.receiveSinglePokemon = function(pokemon) {
    AppDispatcher.dispatch({
      actionType: PokemonConstants.POKEMON_RECEIVED,
      pokemon: pokemon
    });
  };

})(this);
