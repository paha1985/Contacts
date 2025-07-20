import { useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { FilterForm, FilterFormValues } from 'src/components/FilterForm';
import { ContactDto } from 'src/types/dto/ContactDto';
import { useGetContQuery } from 'src/redux/reducers/contacts-reducer';
import { useGetGroupQuery } from 'src/redux/reducers/groups-reducer';



export const ContactListPage = () => {
  const { data: contactsData, isLoading, isError } = useGetContQuery();
  const { data: groupsData, isLoading: groupLoading, isError: groupError } = useGetGroupQuery();

  const contacts = useMemo(() =>
    (contactsData && Array.isArray(contactsData)) ? contactsData : [],
    [contactsData]
  );

  const groupContacts = useMemo(() =>
    (groupsData && Array.isArray(groupsData)) ? groupsData : [],
    [groupsData]
  );

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
}
