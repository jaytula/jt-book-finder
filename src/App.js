import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import BookCard from './BookCard'

class App extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      volumes: [],
    };
    
    this.doSearch = this.doSearch.bind(this);
  }
  
  componentDidMount() {
    console.log('Mounted');
  }
  
  async doSearch(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let q = formData.get('q');
    try {
      let result = await axios.get('/lookup', {params: {q}});
      let {data} = result;
      this.setState({volumes: data.items});
    } catch(err) {
      console.error(err);
    }
  }
  
  render() {
    
    let volumeElems = this.state.volumes.map((vol, key) => <BookCard key={key} data={vol} />);
    return (
      <div>
        <h1>Book Search</h1>
        <form onSubmit={this.doSearch}>
          <label htmlFor="q">Search Query</label>
          <input id="q" type="text" name="q" />
          <button type="submit">Submit</button>
        </form>
        <div id="results">
          {volumeElems}
        </div>
      </div>
    )
  }
}

export default App