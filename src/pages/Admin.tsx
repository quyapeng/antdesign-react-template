import React from 'react';
import { Card } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const Admin: React.FC = () => {
  return (
    <PageHeaderWrapper content={'This page can only be viewed by admin'}>
      <Card>admin</Card>
    </PageHeaderWrapper>
  );
};

export default Admin;
