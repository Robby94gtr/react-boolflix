import FilmsSeriesList from "./components/FilmsSeriesList";
import { useState } from "react";

function App() {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchedTitle, setSearchedTitle] = useState("");

const handleChange = (e) => {
    setSearchTitle(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchedTitle(searchTitle);
    setSearchTitle("");
  };
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
                  <button className="btn btn-primary" type="submit">
                    Aggiungi
                  </button>
                </form>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="row g-3">
             <FilmsSeriesList title={searchedTitle} />
          </div>
        </main>
      </div>
    </>
  )
}

export default App