import { ContactDto } from 'src/types/dto/ContactDto';
import { ProjectActions } from '../actions/actions';
import { DATA_CONTACT } from 'src/__data__';

interface FavoritesState {
  items: ContactDto[];
  ids: string[]; 
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  ids: [DATA_CONTACT[0].id, DATA_CONTACT[1].id, DATA_CONTACT[2].id, DATA_CONTACT[3].id], 
  loading: false,
  error: null
};

export const favoritesReducer = (
  state = initialState,
  action: ProjectActions
): FavoritesState => {
  switch (action.type) {
    case 'FETCH_FAVORITES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_FAVORITES_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.payload
      };
    case 'FETCH_FAVORITES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'SET_FAVORITES':
      return {
        ...state,
        items: action.payload
      };          
          case 'SET_FAVORITE_IDS':
      return {
        ...state,
        ids: action.payload
      };
    default:
      return state;
  }
};