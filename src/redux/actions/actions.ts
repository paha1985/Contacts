import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import {ContactDto} from '../../types/dto/ContactDto'
import {DATA_CONTACT, DATA_GROUP_CONTACT} from 'src/__data__';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';

export const FETCH_CONTACTS_REQUEST = "FETCH_CONTACTS_REQUEST";
export const FETCH_CONTACTS_SUCCESS = "FETCH_CONTACTS_SUCCESS";
export const FETCH_CONTACTS_FAILURE = "FETCH_CONTACTS_FAILURE";

export const SET_CONTACT_REQUEST = "SET_CONTACT_REQUEST";
export const SET_CONTACT_SUCCESS = "SET_CONTACT_SUCCESS";
export const SET_CONTACT_FAILURE = "SET_CONTACT_FAILURE";

export const FETCH_GROUPS_REQUEST = "FETCH_GROUPS_REQUEST";
export const FETCH_GROUPS_SUCCESS = "FETCH_GROUPS_SUCCESS";
export const FETCH_GROUPS_FAILURE = "FETCH_GROUPS_FAILURE";

export const FETCH_FAVORITES_REQUEST = 'FETCH_FAVORITES_REQUEST';
export const FETCH_FAVORITES_SUCCESS = 'FETCH_FAVORITES_SUCCESS';
export const FETCH_FAVORITES_FAILURE = 'FETCH_FAVORITES_FAILURE';
export const SET_FAVORITES = 'SET_FAVORITES';


interface fetchContactsRequestActionType {
    type: typeof FETCH_CONTACTS_REQUEST;
}

interface fetchContactsSuccessActionType {
    type: typeof FETCH_CONTACTS_SUCCESS;
    payload: ContactDto[];
}

interface fetchContactsFailureActionType {
    type: typeof FETCH_CONTACTS_FAILURE;
    payload: string;
    error?: boolean;
}

interface fetchContactRequestActionType {
    type: typeof SET_CONTACT_REQUEST;
}

interface fetchContactSuccessActionType {
    type: typeof SET_CONTACT_SUCCESS;
    payload: ContactDto;
}

interface fetchContactFailureActionType {
    type: typeof SET_CONTACT_FAILURE;
    payload: string;
    error?: boolean;
}

interface fetchGroupsRequestActionType {
    type: typeof FETCH_GROUPS_REQUEST;
}

interface fetchGroupsSuccessActionType {
    type: typeof FETCH_GROUPS_SUCCESS;
    payload: GroupContactsDto[];
}

interface fetchGroupsFailureActionType {
    type: typeof FETCH_GROUPS_FAILURE;
    payload: string;
    error?: boolean;
}

interface FetchFavoritesRequestAction {
  type: typeof FETCH_FAVORITES_REQUEST;
}

interface FetchFavoritesSuccessAction {
  type: typeof FETCH_FAVORITES_SUCCESS;
  payload: ContactDto[];
}

interface FetchFavoritesFailureAction {
  type: typeof FETCH_FAVORITES_FAILURE;
  payload: string;
}


interface SetFavoritesAction {
  type: typeof SET_FAVORITES;
  payload: ContactDto[];
}

export function fetchContactsRequestAction(): fetchContactsRequestActionType {
    return {type: FETCH_CONTACTS_REQUEST}
}

export function fetchContactsSuccessAction(contacts: ContactDto[]): fetchContactsSuccessActionType {
    return {
        type: FETCH_CONTACTS_SUCCESS,
        payload: contacts,
    }
}

export function fetchContactsFailureAction(error: string): fetchContactsFailureActionType {
    return {
        type: FETCH_CONTACTS_FAILURE,
        payload: error,
        error: true,
    }
}

export function fetchContactRequestAction(): fetchContactsRequestActionType {
    return {type: FETCH_CONTACTS_REQUEST}
}

export function setContactSuccessAction(current: ContactDto): fetchContactSuccessActionType {
    return {
        type: SET_CONTACT_SUCCESS,
        payload: current,
    }
}

export function fetchContactFailureAction(error: string): fetchContactsFailureActionType {
    return {
        type: FETCH_CONTACTS_FAILURE,
        payload: error,
        error: true,
    }
}

export function fetchGroupsRequestAction(): fetchGroupsRequestActionType {
    return {type: FETCH_GROUPS_REQUEST}
}

export function fetchGroupsSuccessAction(groupContacts: GroupContactsDto[]): fetchGroupsSuccessActionType {
    return {
        type: FETCH_GROUPS_SUCCESS,
        payload: groupContacts,
    }
}

export function fetchGroupsFailureAction(error: string): fetchGroupsFailureActionType {
    return {
        type: FETCH_GROUPS_FAILURE,
        payload: error,
        error: true,
    }
}

export const fetchFavoritesRequest = (): FetchFavoritesRequestAction => ({
  type: FETCH_FAVORITES_REQUEST
});

export const fetchFavoritesSuccess = (contacts: ContactDto[]): FetchFavoritesSuccessAction => ({
  type: FETCH_FAVORITES_SUCCESS,
  payload: contacts
});

export const fetchFavoritesFailure = (error: string): FetchFavoritesFailureAction => ({
  type: FETCH_FAVORITES_FAILURE,
  payload: error
});

export const setFavorites = (contacts: ContactDto[]): SetFavoritesAction => ({
  type: SET_FAVORITES,
  payload: contacts
});


export const fetchContacts = (): ThunkAction<void, RootState, void, ProjectActions> => {
  return async (dispatch) => {
    dispatch(fetchContactsRequestAction());
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch(fetchContactsSuccessAction(DATA_CONTACT));
    } catch (error) {
      dispatch(fetchContactsFailureAction(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
};

export const fetchGroups = (): ThunkAction<void, RootState, void, ProjectActions> => {
  return async (dispatch) => {
    dispatch(fetchGroupsRequestAction());
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch(fetchGroupsSuccessAction(DATA_GROUP_CONTACT));
    } catch (error) {
      dispatch(fetchGroupsFailureAction(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
};

export const fetchFavorites = (): ThunkAction<void, RootState, void, ProjectActions> => {
  return async (dispatch, getState) => {
    dispatch(fetchFavoritesRequest());
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const { ids } = getState().favorites;
      const { contacts } = getState().contacts;
      const favorites = contacts.filter(contact => ids.includes(contact.id));
      dispatch(fetchFavoritesSuccess(favorites));
    } catch (error) {
      dispatch(fetchFavoritesFailure(error instanceof Error ? error.message : 'Unknown error'));
    }
  };
};

interface SetFavoriteIdsAction {
  type: 'SET_FAVORITE_IDS';
  payload: string[];
}

export const setFavoriteIds = (ids: string[]): SetFavoriteIdsAction => ({
  type: 'SET_FAVORITE_IDS',
  payload: ids
});

export type ProjectActions = fetchContactsRequestActionType 
                           | fetchContactsSuccessActionType 
                           | fetchContactsFailureActionType
                           | fetchContactRequestActionType 
                           | fetchContactSuccessActionType 
                           | fetchContactFailureActionType
                           | fetchGroupsRequestActionType
                           | fetchGroupsSuccessActionType
                           | fetchGroupsFailureActionType
                           | FetchFavoritesRequestAction
                           | FetchFavoritesSuccessAction
                           | FetchFavoritesFailureAction
                           | SetFavoritesAction
                           | SetFavoriteIdsAction;