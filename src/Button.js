import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {onClick, type, children} = this.props;

    return (
      <button type={type} className="btn" onClick={onClick}>
        {children}
      </button>
    );
  }
}

export default Button;
