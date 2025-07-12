import { DATA_GROUP_CONTACT } from "src/__data__";
import { FETCH_GROUPS_REQUEST, FETCH_GROUPS_SUCCESS, FETCH_GROUPS_FAILURE, ProjectActions } from "../actions/actions";

const initialState = {
  loadingGroups: false,
  groupContacts: DATA_GROUP_CONTACT,
  errorGroups: "",
};

const groupsReducer = (state = initialState, action: ProjectActions) => {
  switch (action.type) {
    case FETCH_GROUPS_REQUEST:
      return {
        ...state,
        loadingGroups: true,
      };
    case FETCH_GROUPS_SUCCESS:
      return {
        loadingGroups: false,
        groupContacts: action.payload,
        errorGroups: "",
      };
    case FETCH_GROUPS_FAILURE:
      return {
        loadingGroups: false,
        groupContacts: [],
        errorGroups: action.payload,
      };
    default:
      return state;
  }
};

export default groupsReducer;
