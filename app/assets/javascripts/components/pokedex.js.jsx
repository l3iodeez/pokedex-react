var Pokedex = React.createClass({
  render: function () {
    return (<ul>
            <PokemonIndex />
           </ul>);
  }
});

$(document).on('ready', function () {
  var root = document.getElementById('pokedex');
  React.render(<Pokedex />, root);
});
