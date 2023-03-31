import React from "react";

/**
 *
 * @param {array} names - A list of character names
 * @param {string} toggled - Current toggled character
 * @param {function} setToggled - Function to set toggled character
 * @param {boolean} meetsReq - Boolean to determine if current character meets min requirements
 * @returns Component to select between different characters
 */
const CharacterName = ({ name, toggled, setToggled, meetsReq }) => (
  <h4
    onClick={() => {
      setToggled(name);
    }}
    style={{
      display: "inline",
      padding: "0 2px",
      textDecoration: toggled == name ? "underline" : "",
      color: meetsReq ? "red" : "",
    }}>
    {name}
  </h4>
);

export default CharacterName;
