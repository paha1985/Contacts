import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import contactStore from 'src/store/contactStore';
import favoritesStore from 'src/store/favoritesStore';

export const FavoritListPage = observer(() => {

  useEffect(() => {
    contactStore.get();
  }, [])

  const contacts = contactStore.contacts;
  const contactsLoading = contactStore.isLoading;
  const contactsError = contactStore.isError;

  const favoriteIds = favoritesStore.ids;

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
