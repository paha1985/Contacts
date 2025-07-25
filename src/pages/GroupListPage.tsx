import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import groupStore from 'src/store/groupStore';

export const GroupListPage = observer(() => {

  useEffect(() => {
    groupStore.get();
  }, [])

  const groups = groupStore.groupContacts;
  return (
    <Row xxl={4}>
      {groups.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
})
