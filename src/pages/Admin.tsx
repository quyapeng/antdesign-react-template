import React from 'react';
import { Card } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const Admin: React.FC = (props) => {
  return (
    <PageHeaderWrapper>
      <Card>{props.children}</Card>
    </PageHeaderWrapper>
  );
};

export default Admin;
