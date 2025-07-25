import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { FilterForm, FilterFormValues } from 'src/components/FilterForm';
import { ContactDto } from 'src/types/dto/ContactDto';
import contactStore from 'src/store/contactStore';
import { observer } from 'mobx-react-lite';
import groupStore from 'src/store/groupStore';

export const ContactListPage = observer(() => {
  useEffect(() => {
    contactStore.get();
    groupStore.get();
  }, []);

  const groupContacts = groupStore.groupContacts;
  const groupLoading = groupStore.loadingGroups;
  const groupError = groupStore.errorGroups;

  const contacts = contactStore.contacts;
  const isLoading = contactStore.isLoading;
  const isError = contactStore.isError;

  const [filteredContacts, setFilteredContacts] = useState<ContactDto[]>(contacts)

  useEffect(() => {
    setFilteredContacts(contacts);
  }, [contacts]);

  if (isLoading || groupLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError || groupError) {
    return <div>Ошибка загрузки контактов</div>;
  }

  const onSubmit = (fv: Partial<FilterFormValues>) => {
    let result: ContactDto[] = contacts;

    if (fv.name) {
      const nameFilter = fv.name.toLowerCase();
      result = result.filter(contact =>
        contact.name.toLowerCase().includes(nameFilter)
      );
    }

    if (fv.groupId) {
      const selectedGroup = groupContacts.find(group => group.id === fv.groupId);

      if (selectedGroup) {
        result = result.filter(({ id }) => (
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
})
