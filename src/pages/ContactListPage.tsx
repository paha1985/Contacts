import { useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import {ContactCard} from 'src/components/ContactCard';
import {FilterForm, FilterFormValues} from 'src/components/FilterForm';
import {ContactDto} from 'src/types/dto/ContactDto';
import { useAppSelector } from 'src/redux/hooks/hooks';



export const ContactListPage = () => {

  const groupContacts = useAppSelector(state => state.groups.groupContacts)

    const { contacts, loading, error } = useAppSelector(state => ({
    contacts: state.contacts?.contacts || [],
    loading: state.contacts?.loading || false,
    error: state.contacts?.error || null
    }));

  const [filteredContacts, setFilteredContacts] = useState<ContactDto[]>(contacts)

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }
 
  const onSubmit = (fv: Partial<FilterFormValues>) => {
    let result = contacts;

    if (fv.name) {
      const nameFilter = fv.name.toLowerCase();
      result = result.filter(contact => 
        contact.name.toLowerCase().includes(nameFilter)
      );
    }

    if (fv.groupId) {
      const selectedGroup = groupContacts.find(group => group.id === fv.groupId);

      if (selectedGroup) {
        result = result.filter(({id}) => (
          selectedGroup.contactIds.includes(id)
        ))
      }
    }

    setFilteredContacts(result)
  }

  return (
    <Row xxl={1}>
      <Col className="mb-3">
        <FilterForm groupContactsList={groupContacts} initialValues={{}} onSubmit={onSubmit} />
      </Col>
      <Col>
        <Row xxl={4} className="g-4">
          {filteredContacts.map((contact) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} withLink />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}
