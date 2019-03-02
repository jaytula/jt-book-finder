import React from 'react';

class Recents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(event) {
    this.setState({disabled: true});
    await this.props.doSearch(event.target.value);
    this.setState({disabled: false});
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
            <button
              title={e}
              key={key}
              onClick={this.handleClick}
              disabled={this.state.disabled}
              value={e}>
              {e}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default Recents;
