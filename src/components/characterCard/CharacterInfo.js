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
          <div className="row d-flex justify-content-between align-items-center pt-5">
            <Link
              to="/"
              className="col-xs-6 col-sm-6 col-md-6 col-lg-6 header__logo"
            >
              <img src={logo} alt="logo" />
            </Link>
            <div className="d-flex col-xs-6 col-sm-6 col-md-6 col-lg-6 justify-content-end header__btns">
              {" "}
              <div className="m-4">
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
              <div className="mw-50 m-3">
                <CustomizedSwitches />
              </div>
            </div>

            <div className="character-info d-flex col-12 col-md-12 col-lg-12">
              <div className="col-sm-12 col-md-6 col-lg-6 p-4 character-info__image">
                <img
                  src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                  alt=""
                  className="w100 "
                />
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 p-4 character-info__content">
                <h1>{item.name}</h1>
                <p>{item.description}</p>
              </div>
            </div>

            <div className="row d-flex my-4 mx-auto">
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
