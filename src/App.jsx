import { useState, useEffect } from "react"
import axios from "axios"

function App() {
  const [films, setFilms] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const filterMovies = (title) => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=033450f6a231abdb3bb2b8319239d639&query=${title}&language=it-IT`).then((res) => {
      setFilms(res.data.results);
    });
  }

  const handleChange = (e) => {
    setSearchTitle(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    filterMovies(searchTitle);
    setSearchTitle("");
  }

  return (
    <>
      <div className="container-fluid">
        <header>
          <div className="">
            <div className="row justify-content-between">
              <div className="col-3">logo</div>
              <div className="col-4">
                <form className="input-group d-flex" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    onChange={handleChange}
                    value={searchTitle}
                  />
                  <button
                    className="btn btn-primary"
                    type="submit"
                  >Aggiungi</button>
                </form>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="row">
            {films.map((film) => (
              <div className="col-3" key={film.id}>
                <div className="card">
                  <div className="card-img">
                    <img src="" alt="" />
                  </div>
                  <div className="card-body">
                    <h3>{film.title}</h3>
                    <p>{film.original_title}</p>
                    <p>{film.original_language}</p>
                    <p>{film.vote_average}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}

export default App