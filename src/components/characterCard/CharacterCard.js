import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./charactersCard.scss";

function CharacterCard(props) {
  const navigate = useNavigate();

  return (
    <>
      {props.items?.map((item) => (
        <div
          className='card'
          key={item.id}
          onClick={() => navigate(`/${item.id}`)}
        >
          <img
            src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
            alt='Hero Avatar'
            className='card__img'
          />
          <div className='card__title'>
            <h3>{item.name}</h3>
          </div>
        </div>
      ))}
    </>
  );
}

export default CharacterCard;
