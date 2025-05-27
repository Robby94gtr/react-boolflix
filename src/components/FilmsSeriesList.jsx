import React, { use } from "react";
import axios from "axios";
import Stars from "./Stars";
import { useState, useEffect } from "react";
const FilmsSeriesList = ({ title, vote }) => {
    const [films, setFilms] = useState([]);
    const [series, setSeries] = useState([]);
    const [flippedFilmCard, setFlippedFilmCard] = useState(null);
    const [flippedSeriesCard, setFlippedSeriesCard] = useState(null);
    const filterMovies = (title) => {
        axios
            .get(
                `https://api.themoviedb.org/3/search/movie?api_key=033450f6a231abdb3bb2b8319239d639&query=${title}&language=it-IT`
            )
            .then((res) => {
                setFilms(res.data.results);
            });
    };
    useEffect(() => {
        filterMovies(title);
        filterSeries(title);
    }, [title]);
    const filterSeries = (title) => {
        axios
            .get(
                `https://api.themoviedb.org/3/search/tv?api_key=033450f6a231abdb3bb2b8319239d639&query=${title}&language=it-IT`
            )
            .then((res) => {
                setSeries(res.data.results);
            });
    };

    const handleFilmClick = (index) => {
        if (flippedFilmCard == index) {
            setFlippedFilmCard(null);
        } else {
            setFlippedFilmCard(index);
        }
    };
    const handleSeriesClick = (index) => {
        if (flippedSeriesCard == index) {
            setFlippedSeriesCard(null);
        } else {
            setFlippedSeriesCard(index);
        }
    };

    return (
        <>
            {films.length === 0 && series.length === 0 ? (
                <div className="bg-films film-not-found">
                    <div className="container-fluid">
                        <div className="row"></div>
                    </div>
                </div>
            ) : (
                <>
                    <h2 className="text-light">Films</h2>
                    {films.map((film, index) => (
                        <div className="col-4" key={film.id}>
                            <div className="card" onClick={() => handleFilmClick(index)}>
                                <div className="card-img front">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200/${film.poster_path}`}
                                        alt="film-poster"
                                    />
                                </div>
                                <div
                                    className={`card-body ${flippedFilmCard === index ? "" : "retro "
                                        }`}
                                >
                                    <h3>{film.title}</h3>
                                    <p>{film.original_title}</p>
                                    <p>
                                        {film.original_language === "it" ? (
                                            <span className="fi fi-it flag"></span>
                                        ) : (
                                            <span className="fi fi-us flag"></span>
                                        )}
                                    </p>
                                    <p>
                                        <Stars vote={film.vote_average} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <h2 className="text-light">Series</h2>
                    {series.map((serie, index) => (
                        <div className="col-4" key={serie.id}>
                            <div className="card" onClick={() => handleSeriesClick(index)}>
                                <div className="card-img">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200/${serie.poster_path}`}
                                        alt=""
                                    />
                                </div>
                                <div
                                    className={`card-body ${flippedSeriesCard === index ? "" : "retro"
                                        }`}
                                >
                                    <h3>{serie.name}</h3>
                                    <p>{serie.original_name}</p>
                                    <p>
                                        {serie.original_language === "it" ? (
                                            <span className="fi fi-it flag"></span>
                                        ) : (
                                            <span className="fi fi-us flag"></span>
                                        )}
                                    </p>
                                    <p>
                                        <Stars vote={serie.vote_average} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
};

export default FilmsSeriesList;