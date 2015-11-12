(function (root) {

  var ApiUtil = root.ApiUtil = {};

  ApiUtil.fetch= function () {
    $.ajax({
      url: "/api/pokemon",
      method: "GET",
      dataType: "json",
      contentType: "json",
      success: function (data) {
        ApiActions.receiveAllPokemons(data);
      }
    });
  };

  ApiUtil.fetchPokemon= function (pokemonId) {
    $.ajax({
      url: "/api/pokemon/" + pokemonId,
      method: "GET",
      dataType: "json",
      contentType: "json",
      success: function (data) {
        ApiActions.receiveSinglePokemon(data);
      }
    });
  };
  ApiUtil.createPokemon = function (pokemon, callback) {
    $.ajax({
      url: "/api/pokemon",
      method: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({pokemon: pokemon}),
      success: function (data) {
        ApiActions.receiveSinglePokemon(data);
        callback && callback(data.id);
      }
    });
  };
})(this);
