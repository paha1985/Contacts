import { useCallback, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ContactCard } from 'src/components/ContactCard';
import { Empty } from 'src/components/Empty';
import contactStore from 'src/store/contactStore';


export const ContactPage = () => {
  const { contactId } = useParams<{ contactId: string }>();

  const current = contactStore.current;
  const contacts = contactStore.contacts;

  const fetchContactById = useCallback((id: string) => {
    const contact = contacts.find(data => data.id === id);
    if (contact) {
      contactStore.setCurrentContact(contact);
    }
  }, [contacts]);

  useEffect(() => {
    if (contactId) {
      fetchContactById(contactId);
    }
  }, [contactId, fetchContactById]);

  return (
    <Row xxl={3}>
      <Col className={'mx-auto'}>
        {current ? <ContactCard contact={current} /> : <Empty />}
      </Col>
    </Row>
  );
};
