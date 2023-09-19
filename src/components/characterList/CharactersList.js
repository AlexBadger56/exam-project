import React from 'react'
import './charactersList.module.scss'

function CharactersList(props) {
  return (
    <div>
      <h1>Test</h1>
      {props.items?.map((item) => (
        <li>
          {item.name}
        </li>
      ))}
    </div>
  )
}

export default CharactersList
