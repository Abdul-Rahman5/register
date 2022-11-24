import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../../av.png";

export default function Tv() {
  const [movieTv, setmovieTv] = useState([]);

  async function getTrendingTv() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=6405b6ccfd5dc803fa746c73bc6b9b1c`
    );
    setmovieTv(data.results);
    console.log(data);
  }
  useEffect(() => {
    getTrendingTv();
  }, []);
  return (
    <>
      <div className="row">
        {movieTv.map((movie, index) => (
          <div key={index} className="col-md-3 mt-5">
            <div className="movie">
              <Link to={`/movieDetals/${movie.id}/${movie.media_type}`}>
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
                      className="w-100  rounded-3"
                      src={`https://image.tmdb.org/t/p/w500${movie.profile_path}`}
                    />
                  ) : (
                    ""
                  )}
                  {!movie.poster_path && !movie.profile_path ? (
                    <img className=" rounded-3 w-100" src={avatar} alt="" />
                  ) : (
                    ""
                  )}
                  <h6 className="h6 my-2 text-muted fa-bolder">
                    {movie.title}
                    {movie.name}
                  </h6>
                  {movie.vote_average ? (
                    <div className="vote p-2 text-center  rounded-3  position-absolute top-0 end-0">
                      {movie.vote_average?.toFixed(1)}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
