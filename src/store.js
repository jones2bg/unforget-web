import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Action} from './actions'

function reducer(state, action) {
  switch (action.type) {
    case Action.ShowMemories:
      return {
        ...state,
        memories: action.payload,
      };
    case Action.StartMemoryEdit:
      return {
        ...state,
        memories: state.memories.map(memory => {
          if (memory.id === action.payload) {
            return {...memory, isEditing: true};
          } else {
            return memory;
          }
        }),
      };
    case Action.CancelMemoryEdit:
      return {
        ...state,
        memories: state.memories.map(memory => {
          if (memory.id === action.payload) {
            return {...memory, isEditing: false};
          } else {
            return memory;
          }
        }),
      };
    case Action.ReplaceMemory:
      return {
        ...state,
        memories: state.memories.map(memory => {
          if (memory.id === action.payload.id) {
            return action.payload;
          } else {
            return memory;
          }
        }),
      };
    default:
      return state;
  }
}

const initialState = {
  memories: [
    {
      id: 1,
      year: 2010,
      month: 9,
      day: 21,
      entry: "Today I had a soccer tournament. I was about to score a goal when lightning struck the ball. Now my hair won't settle down.",
      isEditing: true,
    },
    {
      id: 2,
      year: 2011,
      month: 9,
      day: 21,
      entry: "It's been a year since the lightning incident, and my hair hasn't changed.",
      isEditing: true,
    },
  ],
};

export const store = createStore(reducer, initialState, applyMiddleware(thunk));