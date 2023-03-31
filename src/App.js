import { useReducer, useState } from "react";
import { ACTIONS } from "./actions";
import "./App.css";
import Character from "./components/Character";
import CharacterName from "./components/CharacterName";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts.js";

// intial state for reducer
const initialState = {
  attribute: ATTRIBUTE_LIST.reduce((acc, curr) => ((acc[curr] = 0), acc), {}),
  modifier: ATTRIBUTE_LIST.reduce((acc, curr) => ((acc[curr] = 0), acc), {}),
  skills: {},
};

// reducer for each character
const characterReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return {
        ...state,
        attribute: {
          ...state.attribute,
          [action.payload.key]: state.attribute[action.payload.key] + 1,
        },
      };
    case ACTIONS.DECREMENT:
      return {
        ...state,
        attribute: {
          ...state.attribute,
          [action.payload.key]: state.attribute[action.payload.key] - 1,
        },
      };
    case ACTIONS.SET_MODIFIER:
      return {
        ...state,
        modifier: {
          ...state.modifier,
          [action.payload.key]: action.payload.value,
        },
      };
    default:
      throw new Error();
  }
};

function App() {
  // define our three character reducer hooks
  const [barbState, barbDispatch] = useReducer(characterReducer, initialState);
  const [wizState, wizDispatch] = useReducer(characterReducer, initialState);
  const [bardState, bardDispatch] = useReducer(characterReducer, initialState);

  // mapping from character to state
  const state = {
    Barbarian: barbState,
    Wizard: wizState,
    Bard: bardState,
  };

  // toggled character, initially set to first character in CLASS_LIST
  const [toggled, setToggled] = useState(Object.keys(CLASS_LIST)[0]);

  // character jsx
  // used so we can switch between different toggled characters
  const characters = {
    Barbarian: (
      <Character
        state={barbState}
        dispatch={barbDispatch}
        id={"barbarian"}></Character>
    ),
    Wizard: (
      <Character
        state={wizState}
        dispatch={wizDispatch}
        id={"wizard"}></Character>
    ),
    Bard: (
      <Character
        state={bardState}
        dispatch={bardDispatch}
        id={"bard"}></Character>
    ),
  };

  // helper function to determine if character meets requirements
  const meetsReq = (name) => {
    return Object.keys(CLASS_LIST[name]).every((key) => {
      if (state[name].attribute[key] >= CLASS_LIST[name][key]) {
        return true;
      } else {
        return false;
      }
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div className="Character-Names">
          {Object.keys(CLASS_LIST).map((name) => {
            return (
              <CharacterName
                key={name}
                name={name}
                toggled={toggled}
                setToggled={setToggled}
                meetsReq={meetsReq(name)}></CharacterName>
            );
          })}
        </div>
        <div className="Character-Requirements">
          <ul>
            {Object.entries(CLASS_LIST[toggled]).map((attr) => (
              <li key={attr[0]}>
                {attr[0]}:{attr[1]}
              </li>
            ))}
          </ul>
        </div>
        <div className="Character-Stats">{characters[toggled]}</div>
      </section>
    </div>
  );
}

export default App;
