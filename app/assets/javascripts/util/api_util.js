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

})(this);
