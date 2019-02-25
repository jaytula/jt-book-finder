import React from 'react';

class BookCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id,
      volumeInfo: {
        canonicalVolumeLink,
        title,
        authors,
        description,
        publisher,
        imageLinks,
      },
    } = this.props.data;
    const imageElem =
      imageLinks && 'thumbnail' in imageLinks ? (
        <img src={imageLinks.thumbnail} />
      ) : null;
    const authorsElem = authors ? <h4>Authors: {authors.join(', ')}</h4> : null;

    return (
      <div className="book-card">
        {imageElem}
        <h3>
          <a href={canonicalVolumeLink}>{title}</a>
        </h3>
        {authorsElem}
        <h4>Publisher: {publisher || 'Unavailable'}</h4>
        <p>{description}</p>
      </div>
    );
  }
}

export default BookCard;
