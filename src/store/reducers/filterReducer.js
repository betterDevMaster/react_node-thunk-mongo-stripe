import { UPDATE_FILTER } from "../actions/types";

const initialState = {
  item: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_FILTER:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
}
