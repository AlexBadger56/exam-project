import React, { useEffect, useState } from 'react';
import "./charactersCard.scss"

function CharacterCard(props) {

  return (
  <>

      {props.items?.map((item) => (
       <div className='card'>
       <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt='Hero Avatar' className='card__img'/>
       <div className='card__title'>
         <h3>{item.name}</h3>
       </div>
     </div>
      ))}
    
</>
  )
      }

export default CharacterCard
