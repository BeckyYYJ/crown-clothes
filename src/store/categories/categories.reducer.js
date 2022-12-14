import CATEGORIES_ACTION_TYPES from "./categories.types";
import {setCategoriesMap} from "./categories.action";

export const CATEGORIES_INITIAL_STATE = {
    categories: [{
        title:1,
        items:{

        }
    }],
};

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE,action={})=>{
  const {type,payload} = action;
  switch(type)
  {
      case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
          return {
              ...state,
              categories: payload
          };
      default:
          return state;
  }
};