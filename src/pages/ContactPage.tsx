import {useCallback, useEffect} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {ContactCard} from 'src/components/ContactCard';
import {Empty} from 'src/components/Empty';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks/hooks';
import { fetchContactFailureAction, setContactSuccessAction } from 'src/redux/actions/actions';


export const ContactPage = () => {
  const {contactId} = useParams<{ contactId: string }>();
  const dispatch = useAppDispatch();
  const { contacts,  current } = useAppSelector(state => state.contacts)


  const fetchContactById = useCallback((id: string) => {
    const contact = contacts.find(data => data.id === id);
    if (contact) {
      dispatch(setContactSuccessAction(contact));
    } else {
      dispatch(fetchContactFailureAction('Contact not found'));
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
