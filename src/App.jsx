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
      <header className="bg-dark">
        <div className="container-fluid">
          <div className="">
            <div className="row justify-content-between align-items-center">
              <div className="col-3 text-danger logo">BoolFlix</div>
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
        </div>
      </header>
      <main>
        <div className="row g-3">
          <FilmsSeriesList title={searchedTitle} />
        </div>
      </main>
    </>
  )
}

export default App