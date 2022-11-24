import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import avatar from "../../av.png";

export default function MovieDetals() {
  let params = useParams();
  const [itemDetails, setitemDetails] = useState({});
  const [similar, setSimilar] = useState([]);
  async function getItemDetails() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${params.media_type}/${params.id}?api_key=6405b6ccfd5dc803fa746c73bc6b9b1c`
    );
    setitemDetails(data);
  }
  async function getSimilar() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/${params.media_type}/${params.id}/similar?api_key=6405b6ccfd5dc803fa746c73bc6b9b1c`
    );
    setSimilar(data.results);
  }
  useEffect(() => {
      getItemDetails();
      getSimilar()
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          {itemDetails.poster_path ? (
            <img
              className="w-100 rounded-5"
              src={`https://image.tmdb.org/t/p/w500${itemDetails.poster_path}`}
            />
          ) : (
            ""
          )}
          {itemDetails.profile_path ? (
            <img
              className="w-100 rounded-5"
              src={`https://image.tmdb.org/t/p/w500${itemDetails.profile_path}`}
            />
          ) : (
            ""
          )}
          {!itemDetails.poster_path && !itemDetails.profile_path ? (
            <img className="w-100 rounded-5" src={avatar} alt="" />
          ) : (
            ""
          )}
          {/* <img
            src={`https://image.tmdb.org/t/p/w500${itemDetails.poster_path}`}
            className="w-100"
            alt=""
          /> */}
        </div>
        <div className="col-md-8">
          <h2>
            {itemDetails.title}
            {itemDetails.name}
          </h2>
          {/* <button className="btn btn-info mx-2 my-2">
            {" "}
            {itemDetails.genres[0].name}{" "}
          </button>
          <button className="btn btn-info mx-2 my-2">
            {" "}
            {itemDetails.genres[1].name}{" "}
          </button> */}
          {/* <button className="btn btn-info mx-2 my-2"> {itemDetails.genres[2].name}</button> */}
          {/* <p className=" fa-1x">{itemDetails.vote_average}</p> */}
          <p className=" lead mt-2">Vote : {itemDetails.vote_average}</p>
          <p className=" lead ">Vote Count : {itemDetails.vote_count}</p>
          <p className=" lead">popularity : {itemDetails.popularity}</p>
          <p className="mb-2 lead">release_date : {itemDetails.release_date}</p>
          <p className="text-muted lead">{itemDetails.overview}</p>
        </div>
      </div>
      <div className="row mt-5">
        {similar.slice(0, 12).map((movie) => (
          <div className="col-md-2">
            <Link to={`movieDetals/${movie.id}/${params.media_type}`}>
              <div className="movie position-relative">
                {movie.poster_path ? (
                  <img
                    className="w-100 rounded-3"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                ) : (
                  ""
                )}
                {movie.profile_path ? (
                  <img
                    className="w-100"
                    src={`https://image.tmdb.org/t/p/w500${movie.profile_path}`}
                  />
                ) : (
                  ""
                )}
                {!movie.poster_path && !movie.profile_path ? (
                  <img src={avatar} alt="" />
                ) : (
                  ""
                )}
                <h6 className="h6 my-2 text-muted">
                  {movie.title}
                  {movie.name}
                </h6>
                {movie.vote_average ? (
                  <div className="vote p-2 text-center rounded-3 position-absolute top-0 end-0">
                    {movie.vote_average?.toFixed(1)}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
