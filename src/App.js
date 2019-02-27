import {hot} from 'react-hot-loader/root';
import React from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import Button from './Button';

require('./style.css');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      volumes: [],
    };

    this.doSearch = this.doSearch.bind(this);
  }

  componentDidMount() {}

  async doSearch(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let q = formData.get('q');
    try {
      let result = await axios.get('/lookup', {params: {q}});
      let {data} = result;
      this.setState({volumes: data.items});
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    let volumeElems = this.state.volumes.map((vol, key) => (
      <BookCard key={key} data={vol} />
    ));
    return (
      <div>
        <header>
          <h1>Book Finder</h1>
          <div id="searchbox">
            <form onSubmit={this.doSearch}>
              <input id="q" type="text" name="q" placeholder="Search" />
              <Button type="submit">Search</Button>
            </form>
          </div>
        </header>

        <div id="results">{volumeElems}</div>
      </div>
    );
  }
}

export default hot(App);
