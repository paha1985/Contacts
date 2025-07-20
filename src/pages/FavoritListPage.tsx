import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { useAppSelector } from 'src/redux/hooks/hooks';
import { useGetContQuery } from 'src/redux/reducers/contacts-reducer';
import { ContactDto } from 'src/types/dto/ContactDto';

export const FavoritListPage = (() => {


  const {
    data: contactsResponse,
    isLoading: contactsLoading,
    isError: contactsError,
  } = useGetContQuery();

  const contacts: ContactDto[] = (contactsResponse && Array.isArray(contactsResponse))
    ? contactsResponse
    : [];

  const favoriteIds = useAppSelector(state => state.favorites.ids);

  const favorites = contacts.filter(contact =>
    favoriteIds.some(id => id === contact.id)
  );

  if (contactsLoading) {
    return <div>Loading favorites...</div>;
  }

  if (contactsError) {
    return <div>Error loading contacts</div>;
  }

  if (favorites.length === 0) {
    return <div>No favorites yet</div>;
  }

  return (
    <Row xxl={4} className="g-4">
      {favorites.map((contact) => (
        <Col key={contact.id}>
          <ContactCard contact={contact} withLink />
        </Col>
      ))}
    </Row>
  );
})
