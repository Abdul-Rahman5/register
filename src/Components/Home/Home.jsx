import axios from "axios";
import React, { useEffect, useState } from "react";
import MediaItem from "../MediaItem/MediaItem";

export default function Home() {
  const [tredingMovis, settredingMovis] = useState([]);
  const [tredingTv, settredingTv] = useState([]);
  const [tredingPerson, settredingPerson] = useState([]);
  async function getTrendung(mediaType, fun) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=6405b6ccfd5dc803fa746c73bc6b9b1c`
    );
    fun(data.results);
    console.log(data.results);
  }
  useEffect(() => {
    getTrendung("movie", settredingMovis);
    getTrendung("tv", settredingTv);
    getTrendung("person", settredingPerson);
  }, []);

  return (
    <>
      <div className="row ">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="bord mb-3 w-25 text-muted "></div>
            <h2 className="h4">
              Trending <br /> Movies <br /> To Watch Right Now{" "}
            </h2>
            <p className="text-muted py-3">post Watched Movies by Days</p>
            <div className="bord mt-3 w-100 text-muted "></div>
          </div>
        </div>
        {tredingMovis.slice(0, 10).map((movie, index) => (
          <MediaItem movie={movie} key={index} />
        ))}
      </div>
      <div className="row py-5 ">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="bord mb-3 w-25 text-muted "></div>
            <h2 className="h4">
              Trending <br /> TV <br /> To TV Right Now{" "}
            </h2>
            <p className="text-muted py-3">post TV Movies by Days</p>
            <div className="bord mt-3 w-100 text-muted "></div>
          </div>
        </div>
        {tredingTv.slice(0, 10).map((movie, index) => (
          <MediaItem movie={movie} key={index} />
        ))}
      </div>
      <div className="row py-5 ">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="bord mb-3 w-25 text-muted "></div>
            <h2 className="h4">
              Trending <br /> Peoplr <br /> To Peoplr Right Now{" "}
            </h2>
            <p className="text-muted py-3">post Watched Peoplr by Days</p>
            <div className="bord mt-3 w-100 text-muted "></div>
          </div>
        </div>
        {tredingPerson.slice(0, 10).map((movie, index) => (
          <MediaItem movie={movie} key={index} />
        ))}
      </div>
    </>
  );
}
