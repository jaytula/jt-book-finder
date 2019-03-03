import {hot} from 'react-hot-loader/root';
import React from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import Button from './Button';
import Recents from './Recents';

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
      untouched: true,
    };

    this.submitHandler = this.submitHandler.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.clearError = this.clearError.bind(this);
    this.getSearchOptions = this.getSearchOptions.bind(this);
    this.addSearchOption = this.addSearchOption.bind(this);
    this.clearAction = this.clearAction.bind(this);
  }

  clearAction(event) {
    localStorage.removeItem('searchOptions');
    localStorage.removeItem('searched');
    localStorage.removeItem('searchedVolumes');
    this.setState({
      untouched: true,
      volumes: [],
      searchOptions: [],
    });
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
  async componentDidMount() {
    this.getSearchOptions();

    try {
      let q = localStorage.getItem('searched');
      let volumes = JSON.parse(localStorage.getItem('searchedVolumes'));
      if (q && volumes.length) {
        this.setState({
          volumes,
          untouched: false,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  clearError() {
    this.setState({error: null});
  }

  async submitHandler(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let q = formData.get('q');
    this.addSearchOption(q);
    await this.doSearch(q);
  }

  async doSearch(q) {
    let inputElem = document.getElementById('q');
    inputElem.select();
    inputElem.blur();
    try {
      this.setState({loading: true});
      let result = await axios.get('/lookup', {params: {q}});
      let {data} = result;
      this.setState({
        volumes: data.items,
        loading: false,
        error: null,
        untouched: false,
      });
      inputElem.value = q;
      localStorage.setItem('searched', q);
      localStorage.setItem('searchedVolumes', JSON.stringify(data.items));
    } catch (error) {
      this.setState({loading: false, error, lastError: error});
      setTimeout(this.clearError, 2000);
      console.error(error);
    }
  }

  render() {
    let volumeElems = this.state.volumes ? (
      this.state.volumes.map((vol, key) => <BookCard key={key} data={vol} />)
    ) : (
      <div className="no-results">No results</div>
    );

    let searchOptions = this.state.searchOptions.map((e, key) => (
      <option key={key} value={e} />
    ));
    return (
      <div id="app" className={this.state.untouched ? 'untouched' : ''}>
        <header>
          <h1>Book Finder</h1>
          <div id="searchbox">
            <form onSubmit={this.submitHandler}>
              <input
                id="q"
                type="text"
                name="q"
                disabled={this.state.loading}
                placeholder="Search"
                autoComplete="off"
                spellCheck={false}
                required={true}
              />
              <Button type="submit" disabled={this.state.loading}>
                Search
              </Button>
            </form>
          </div>
          {!this.state.untouched && this.state.searchOptions.length ? (
            <Recents
              data={this.state.searchOptions}
              doSearch={this.doSearch}
              clearAction={this.clearAction}
            />
          ) : null}
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
