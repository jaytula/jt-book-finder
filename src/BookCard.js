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
      <div>
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
        <div className="book-card-left">{imageElem}</div>
        <div className="book-card-right">
          <h3>
            <a href={canonicalVolumeLink}>{title}</a>
          </h3>
          {authorsElem}
          <div className="publisher">
            Publisher: {publisher || 'Unavailable'}
          </div>
        </div>
      </div>
    );
  }
}

export default BookCard;
