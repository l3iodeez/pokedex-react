(function(root){

  var ApiActions = root.ApiActions = {};

  ApiActions.receiveAllPokemons = function(pokemons) {
    AppDispatcher.dispatch({
      actionType: PokemonConstants.POKEMONS_RECEIVED,
      pokemons: pokemons
    })
  }

})(this);
