 var Router = ReactRouter.Router;
 var Route =  ReactRouter.Route;
var Pokedex = React.createClass({
  componentDidMount: function () {
  },
  render: function () {
    return (
      <div>
        <PokemonForm />
        <PokemonIndex />
        {this.props.children}
      </div>
      );
  }
});

$(document).on('ready', function () {
  var root = document.getElementById('pokedex');
  React.render((<Router>
                  <Route path="/" component={Pokedex}>
                    <Route path="/pokemon/:pokemonId" component={PokemonDetail}/>
                    <Route path="/pokemon/:pokemonId/toys/:toyId" components={{pokeDetail: PokemonDetail, toyDetail: ToyDetail}} />
                  </Route>
                </Router>), root);
});
