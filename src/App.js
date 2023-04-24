import MoviesList from './components/MoviesList'
import { Container } from 'react-bootstrap';
import  NavBar  from './components/NavBar';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviesDetails from './components/MovieDetails';

function App() {
  const [movies, setMovies] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const getAllMovies = async () => {
    const res = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=7a1a5d8ebf2b1841bc0bc086d2714dd6&language=ar")
    setMovies(res.data.results)
    setPageCount(res.data.total_pages)

  }
  // get current page
  const getPage = async (page) => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=7a1a5d8ebf2b1841bc0bc086d2714dd6&language=ar&page=${page}`)
    setPageCount(res.data.total_pages)
  
    setMovies(res.data.results)
  }
  const search = async (keyword) => {
    if (keyword === "") {
      getAllMovies()
    } else {
    const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=7a1a5d8ebf2b1841bc0bc086d2714dd6&query=${keyword}&language=ar`)
    setMovies(res.data.results)
    setPageCount(res.data.total_pages)

    }
    
  }

  useEffect( () => {
    getAllMovies()
  }, [])

  return (
    <div className="font color-body">
      <NavBar search={search} />
      <Container>
        <Router>
          <Routes>
            <Route path='/' element={<MoviesList movies={movies} getPage={getPage} pageCount={pageCount} />}/>
            <Route path="/movie/:id" element={<MoviesDetails/>}/>
        </Routes>
        </Router>
    
        </Container>
        

    
    </div>
  );
}


export default App;
