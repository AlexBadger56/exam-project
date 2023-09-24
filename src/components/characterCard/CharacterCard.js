import React from "react";
import { useNavigate } from "react-router-dom";
import "./charactersCard.scss";

function CharacterCard(props) {
  const navigate = useNavigate();

  return (
    <>
      {props.items?.map((item) => (
        <div
          className="col-12 col-md-6 col-lg-3 mb-4"
          key={item.id}
          onClick={() => navigate(`/${item.id}`)}
        >
          <div className="card-item">
            <img
              src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
              alt="Hero Avatar"
              className="card-item__img"
            />
            <div className="card-item__title">
              <h3>{item.name}</h3>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default CharacterCard;
