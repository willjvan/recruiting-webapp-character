import React from "react";
import { ACTIONS } from "../actions";
import { ATTRIBUTE_LIST, SKILL_LIST } from "../consts";

/**
 *
 * @param {object} state - The state of this character object (attributes, modifiers, skills)
 * @param {function} dispatch - Function to update state of this character object
 * @returns Component to manipulate attributes/skills of character
 */
const Character = ({ state, dispatch }) => {
  const onIncrement = (key) => {
    dispatch({
      type: ACTIONS.INCREMENT,
      payload: { key: key },
    });
    dispatch({
      type: ACTIONS.SET_MODIFIER,
      payload: {
        key: key,
        value: Math.floor((state.attribute[key] + 1 - 10) / 2),
      },
    });
  };

  const onDecrement = (key) => {
    dispatch({
      type: ACTIONS.DECREMENT,
      payload: { key: key },
    });
    dispatch({
      type: ACTIONS.SET_MODIFIER,
      payload: {
        key: key,
        value: Math.floor((state.attribute[key] - 1 - 10) / 2),
      },
    });
  };

  return (
    <>
      <ul className={"Character-Attributes"}>
        {ATTRIBUTE_LIST.map((attrKey) => {
          return (
            <li key={attrKey}>
              {attrKey}: {state.attribute[attrKey]} Modifier:
              {state.modifier[attrKey]}
              <br />
              <button onClick={() => onIncrement(attrKey)}>+</button>
              <button onClick={() => onDecrement(attrKey)}>-</button>
            </li>
          );
        })}
      </ul>
      <ul className={"Character-Skills"}>
        {SKILL_LIST.map((skill) => (
          <li key={skill.name}>
            {skill.name} - points: 0 modifier ({skill.attributeModifier}):
            {state.modifier[skill.attributeModifier]}
            <br />
            <button>+</button>
            <button>-</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Character;
