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
      ) : (
        <div className="noThumbnail">Image Unavaliable</div>
      );
    const authorsElem = authors ? (
      <div className="book-info">
        by{' '}
        {authors.map((item, key) => (
          <span key={key} className="authorName">
            {item}
          </span>
        ))}
      </div>
    ) : null;

    return (
      <div className="book-card">
        <div className="book-card-left">
          <a href={canonicalVolumeLink}>{imageElem}</a>
        </div>
        <div className="book-card-right">
          <h3>
            <a href={canonicalVolumeLink}>{title}</a>
          </h3>
          {authorsElem}
          <div className="book-info">
            published by{' '}
            <span className="publisher">{publisher || 'Unavailable'}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default BookCard;
