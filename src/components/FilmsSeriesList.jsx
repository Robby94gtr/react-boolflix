import React, { use } from "react";
import axios from "axios";
import Stars from "./Stars";
import { useState, useEffect } from "react";
const FilmsSeriesList = ({ title, vote }) => {
    const [films, setFilms] = useState([]);
    const [series, setSeries] = useState([]);
    const [popularFilms, setPopularFilms] = useState([]);
    const [flippedFilmCard, setFlippedFilmCard] = useState(null);
    const [flippedSeriesCard, setFlippedSeriesCard] = useState(null);
    const [flippedPopularFilmCard, setFlippedPopularFilmCard] = useState(null);
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

    const getPopularMovies = () => {
        axios
            .get(
                `https://api.themoviedb.org/3/movie/popular?api_key=033450f6a231abdb3bb2b8319239d639&language=it-IT`
            )
            .then((res) => {
                setPopularFilms(res.data.results);
            });
    };
    useEffect(() => {
        getPopularMovies();
    }, []);

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

    const handlePopularFilmsClick = (index) => {
        if (flippedPopularFilmCard == index) {
            setFlippedPopularFilmCard(null);
        } else {
            setFlippedPopularFilmCard(index);
        }
    };

    return (
        <>
            {films.length === 0 && series.length === 0 ? (
                <div className="bg-films film-not-found">
                    <div className="container-fluid">
                        <div className="row g-5">
                            <div className="col-12">
                                <h1 className="text-light">
                                    Cerca i tuoi film preferiti nella barra di ricerca!
                                </h1>
                            </div>
                            <div className="col-12 mt-5">
                                <h2 className="text-light">I nostri titoli migliori</h2>
                            </div>
                            {popularFilms.map((film, index) => (
                                <div className="col-lg-2 col-md-4 col-sm-6" key={film.id}>
                                    <div
                                        className={`card ${flippedPopularFilmCard === index ? "flipped" : ""
                                            }`}
                                        onClick={() => handlePopularFilmsClick(index)}
                                    >
                                        <div className="card-img card-front">
                                            <img
                                                src={`https://image.tmdb.org/t/p/w200/${film.poster_path}`}
                                                alt="popular-film-poster"
                                            />
                                        </div>
                                        <div className="card-body card-retro">
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
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="row g-5">
                        <div className="col-12">
                            <h2 className="text-light">Films</h2>
                        </div>
                        {films.map((film, index) => (
                            <div className="col-lg-2 col-md-4 col-sm-6" key={film.id}>
                                <div
                                    className={`card  ${flippedFilmCard === index ? "flipped" : ""
                                        }`}
                                    onClick={() => handleFilmClick(index)}
                                >
                                    <div className="card-img card-front">
                                        <img
                                            src={
                                                film.poster_path === null
                                                    ? `https://demofree.sirv.com/nope-not-here.jpg`
                                                    : `https://image.tmdb.org/t/p/w200/${film.poster_path}`
                                            }
                                            alt="film-poster"
                                        />
                                    </div>
                                    <div className={`card-body card-retro`}>
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
                    </div>

                    <div className="row g-5">
                        <div className="col-12">
                            <h2 className="text-light">Series</h2>
                        </div>
                        {series.map((serie, index) => (
                            <div className="col-lg-2 col-md-4 col-sm-6" key={serie.id}>
                                <div
                                    className={`card ${flippedSeriesCard === index ? "flipped" : ""
                                        }`}
                                    onClick={() => handleSeriesClick(index)}
                                >
                                    <div className="card-img card-front">
                                        <img
                                            src={
                                                serie.poster_path === null
                                                    ? `https://demofree.sirv.com/nope-not-here.jpg`
                                                    : `https://image.tmdb.org/t/p/w200/${serie.poster_path}`
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <div className={`card-body card-retro`}>
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
                    </div>
                </>
            )}
        </>
    );
};

export default FilmsSeriesList;