import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { useAppSelector } from 'src/redux/hooks/hooks';

export const FavoritListPage = (() => {
  const favorites = useAppSelector((state) => state.favorites.items);

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
