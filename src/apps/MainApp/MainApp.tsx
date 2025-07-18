import { useEffect } from 'react';
import './MainApp.scss';
import { ThemeProvider } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'src/components/Layout';
import { ContactListPage, GroupPage, ContactPage, FavoritListPage, GroupListPage } from 'src/pages';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks/hooks';
import { fetchContacts, fetchFavorites, fetchGroups } from 'src/redux/actions/actions';
import { setFavorites } from 'src/redux/reducers/favorite-reducer';


export const MainApp = () => {

  const dispatch = useAppDispatch();

  const { contacts, loading, error } = useAppSelector(state => ({
    contacts: state.contacts?.contacts || [],
    groups: state.groups?.groupContacts || [],
    loading: state.contacts?.loading || state.groups?.loadingGroups || false,
    error: state.contacts?.error || state.groups?.errorGroups || null
  }));

  const favoriteIds = useAppSelector(state => state.favorites.ids);

  useEffect(() => {
    dispatch(fetchContacts());
    dispatch(fetchGroups());
    if (contacts.length > 0 && favoriteIds.length > 0) {
      const favorites = contacts.filter(contact =>
        favoriteIds.includes(contact.id)
      );
      dispatch(setFavorites(favorites));
    }
  }, [dispatch, favoriteIds, contacts]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center">
        Ошибка: {error}
        <button
          className="btn btn-sm btn-outline-danger ms-2"
          onClick={() => {
            dispatch(fetchContacts());
            dispatch(fetchGroups());
            dispatch(fetchFavorites());
          }}
        >
          Повторить
        </button>
      </div>
    );
  }

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <ContactListPage />
            } />
            <Route path="contact">
              <Route index element={
                <ContactListPage />
              } />
              <Route path=":contactId" element={
                <ContactPage />
              } />
            </Route>
            <Route path="groups">
              <Route index element={
                <GroupListPage
                />
              } />
              <Route path=":groupId" element={
                <GroupPage />
              } />
            </Route>
            <Route path="favorit" element={
              <FavoritListPage />
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
