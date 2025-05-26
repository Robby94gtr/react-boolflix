import { useState } from "react"

function App() {


  return (
    <>
      <div className="container-fluid">
        <header>
          <div className="">
            <div className="row justify-content-between">
              <div className="col-3">logo</div>
              <div className="col-4">
                <form className="imput-group d-flex">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                  />
                  <button className="btn btn-primary">Aggiungi</button>
                </form>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  )
}

export default App