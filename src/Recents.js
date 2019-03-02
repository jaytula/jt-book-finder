import React from 'react';

class Recents extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(event) {
    console.log(event.target.value);
    await this.props.doSearch(event.target.value);
  }

  render() {
    let {data, doSearch} = this.props;

    return (
      <div className="recents">
        <div className="recents-header" title="Your Recent Searches">
          Recent:
        </div>
        <div className="recent-items">
          {data.map((e, key) => (
            <button title={e} key={key} onClick={this.handleClick} value={e}>
              {e}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default Recents;
