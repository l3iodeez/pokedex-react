var ToyIndexItem = React.createClass({
  mixins: [ReactRouter.History],
  showDetail: function () {
    this.history.pushState(null, "/pokemon/" + this.props.toy.pokemon_id + "/toys/" + this.props.toy.id);
  },
  render: function () {
    return (
      <li onClick={this.showDetail} className="toy-list-item">
        Name: {this.props.toy.name}
        Happiness: {this.props.toy.happiness}
        Price: {this.props.toy.price}
      </li>
    );
  }
});
