import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {onClick, type, disabled, children} = this.props;

    return (
      <button type={type} disabled={disabled} className="btn" onClick={onClick}>
        {children}
      </button>
    );
  }
}

export default Button;
