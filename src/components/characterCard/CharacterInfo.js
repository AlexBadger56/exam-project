import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Comics from "./Comics";
import CustomizedSwitches from "../ThemeToggle/ThemeToggle";
import logo from "../../assets/images/marvel-logo.png";

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
          <div className="row d-flex justify-content-between pt-5">
            <div className="col-1 col-md-1 col-lg-10 header__logo me-5">
              <img src={logo} alt="logo" />
            </div>
            <div className="d-flex col-1 col-md-1 col-lg-2">
              {" "}
              <div className="m-4 pe-3">
                <Link
                  to="/"
                  className="btn btn-primary "
                  style={{
                    backgroundColor: "#379683",
                    color: "#ffffff",
                    border: "none",
                  }}
                >
                  Back
                </Link>
              </div>
              <div className="mw-50 p-3">
                <CustomizedSwitches />
              </div>
            </div>

            <div className="character-info__bg d-flex col-12 col-md-12 col-lg-12 m-4">
              <div className="col-6 col-sm-12 col-md-6 col-lg-6 m-4">
                <img
                  src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                  alt=""
                  className="w100 "
                />
              </div>
              <div className="col-5 col-md-5 col-lg-5 p-4">
                <h1>{item.name}</h1>
                <p>{item.description}</p>
              </div>
            </div>

            <div className="row d-flex m-4 ">
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
