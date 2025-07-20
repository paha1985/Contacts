import { useCallback, useEffect, useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ContactCard } from 'src/components/ContactCard';
import { Empty } from 'src/components/Empty';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks/hooks';
import { setCurrentContact, useGetContQuery } from 'src/redux/reducers/contacts-reducer';

export const ContactPage = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const dispatch = useAppDispatch();
  const { current } = useAppSelector(state => state.contacts)

  const { data: contactsData } = useGetContQuery();
  const contacts = useMemo(() => (contactsData && Array.isArray(contactsData)) ? contactsData : [], [contactsData]);


  const fetchContactById = useCallback((id: string) => {
    const contact = contacts.find(data => data.id === id);
    if (contact) {
      dispatch(setCurrentContact(contact));
    }
  }, [contacts, dispatch]);

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
