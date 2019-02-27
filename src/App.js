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
      loading: false,
      error: null,
      lastError: null,
    };

    this.doSearch = this.doSearch.bind(this);
    this.clearError = this.clearError.bind(this);
  }

  componentDidMount() {}

  clearError() {
    this.setState({error: null});
  }

  async doSearch(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let q = formData.get('q');
    try {
      this.setState({loading: true});
      let result = await axios.get('/lookup', {params: {q}});
      let {data} = result;
      this.setState({volumes: data.items, loading: false, error: null});
    } catch (error) {
      this.setState({loading: false, error, lastError: error});
      setTimeout(this.clearError, 2000);
      console.error(error);
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
        <div
          className={`loading-toast ${
            this.state.loading ? 'd-block' : 'd-none'
          }`}>
          Loading
        </div>
        <div
          className={`error-toast ${this.state.error ? 'd-block' : 'd-none'}`}>
          {this.state.error && this.state.error.message}
        </div>
      </div>
    );
  }
}

export default hot(App);
