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
      searchOptions: [],
      error: null,
      lastError: null,
    };

    this.doSearch = this.doSearch.bind(this);
    this.clearError = this.clearError.bind(this);
    this.getSearchOptions = this.getSearchOptions.bind(this);
    this.addSearchOption = this.addSearchOption.bind(this);
  }

  getSearchOptions() {
    let searchOptions = localStorage.getItem('searchOptions');
    try {
      searchOptions = searchOptions ? JSON.parse(searchOptions) : [];
      this.setState({searchOptions});
      return searchOptions;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  addSearchOption(item) {
    let options = this.getSearchOptions();
    if (options.indexOf(item) !== -1) return;
    options.unshift(item);
    options = options.slice(0, 10);
    localStorage.setItem('searchOptions', JSON.stringify(options));
    this.getSearchOptions();
  }
  componentDidMount() {
    this.getSearchOptions();
  }

  clearError() {
    this.setState({error: null});
  }

  async doSearch(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let q = formData.get('q');
    this.addSearchOption(q);
    let inputElem = document.getElementById('q');
    inputElem.blur();
    inputElem.select();
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

    let searchOptions = this.state.searchOptions.map((e, key) => (
      <option key={key} value={e} />
    ));
    return (
      <div>
        <header>
          <h1>Book Finder</h1>
          <div id="searchbox">
            <form onSubmit={this.doSearch}>
              <input
                id="q"
                type="text"
                list="search-options"
                name="q"
                placeholder="Search"
                autoComplete="off"
                spellCheck="false"
                required="true"
              />
              <Button type="submit" disabled={this.state.loading}>
                Search
              </Button>
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
        <datalist id="search-options">{searchOptions}</datalist>
      </div>
    );
  }
}

export default hot(App);

/*
 *
 * Need a function to get from localStorange and return an empty array or current array.  This needs to be called at componentDidMount and result used to set the state.  Also called after an add.
 * Need a function to add to localStorage.  This needs called after a search.  The operation of add.  Check if exists with indexOf before adding.
 *
 *
 */
