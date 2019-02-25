import React from 'react';

class BookCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      volumeInfo: {title, authors, description, publisher, imageLinks},
    } = this.props.data;
    const imageElem =
      imageLinks && 'thumbnail' in imageLinks ? (
        <img src={imageLinks.thumbnail} />
      ) : null;
    const authorsElem = authors ? <h4>Authors: {authors.join(', ')}</h4> : null;

    return (
      <div>
        {imageElem}
        <h3>{title}</h3>
        {authorsElem}
        <h4>Publisher: {publisher || 'Unavailable'}</h4>
        <p>{description}</p>
      </div>
    );
  }
}

export default BookCard;
