import { UPDATE_FILTER } from './types';


export const updateFilter = (filter) => dispatch => {
  dispatch({
    type: UPDATE_FILTER,
    payload: filter,
  });

}
