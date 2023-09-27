import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Comics from "./Comics";

const CharacterInfo = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=ba9129e72667df3ce251058a90350325&hash=40c90ea382c6aedf8e37c3cc497de90f`
        );
        if (!response.ok) throw new Error(`Error! Status: ${response.status}`);
        const dataJson = await response.json();
        setItem(dataJson.data.results[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      {item ? (
        <div className="container">
          <div className="row mt-4">
            <div className="col-12 d-flex justify-content-end mb-4">
              <Link to="/" className="btn btn-primary ">
                Back
              </Link>
            </div>

            <div className="col-12 col-md-6 mb-4">
              <img
                src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                alt=""
                className="w-100 "
              />
            </div>
            <div className="col-12 col-md-6">
              <h1>{item.name}</h1>
              <h4>{item.description}</h4>
            </div>

            <div className="row d-flex">
              <Comics />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default CharacterInfo;
