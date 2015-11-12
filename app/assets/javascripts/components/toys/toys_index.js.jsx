var ToysIndex = React.createClass ({
  render: function () {
    var toys;
    if (this.props.toys) {
      toys = this.props.toys.map(function (toy) {
          return <ToyIndexItem toy={toy} key={toy.id} />;
        });
    }
    return (
        <div className="toy-index">
          {toys}
        </div>
    );
  }
});
