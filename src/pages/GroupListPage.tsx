import { useMemo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { useGetGroupQuery } from 'src/redux/reducers/groups-reducer';

export const GroupListPage = () => {
  const { data: groupsData } = useGetGroupQuery();
  const groups = useMemo(() =>
    (groupsData && Array.isArray(groupsData)) ? groupsData : [],
    [groupsData]
  );

  return (
    <Row xxl={4}>
      {groups.map((groupContacts) => (
        <Col key={groupContacts.id}>
          <GroupContactsCard groupContacts={groupContacts} withLink />
        </Col>
      ))}
    </Row>
  );
};
