import { DATA_CONTACT } from "src/__data__";
import { SET_CONTACT_FAILURE, SET_CONTACT_REQUEST, SET_CONTACT_SUCCESS, 
  FETCH_CONTACTS_FAILURE, FETCH_CONTACTS_REQUEST, FETCH_CONTACTS_SUCCESS, 
  ProjectActions } from "../actions/actions";

const initialState = {
  current: DATA_CONTACT[3],
  loading: false,
  contacts: DATA_CONTACT,
  error: "",
};

const contactsReducer = (state = initialState, action: ProjectActions) => {
  console.log(state)
  switch (action.type) {
    case FETCH_CONTACTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CONTACTS_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: action.payload,
        error: "",
      };
    case FETCH_CONTACTS_FAILURE:
      return {
        ...state,
        loading: false,
        contacts: [],
        error: action.payload,
      };
    case SET_CONTACT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SET_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.payload,
        error: "",
      };
    case SET_CONTACT_FAILURE:
      return {
        ...state,
        loading: false,
        current: null,
        error: action.payload,
      };      
    default:
      return state;
  }
};

export default contactsReducer;
