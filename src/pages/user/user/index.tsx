import { PlusOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import { userList } from '@/services/user';
import { commonRequestList } from '@/utils/index';
import { pagination } from '@/constant/index';
import { ProFormInstance } from '@ant-design/pro-form';
import { Message } from '@/constant/common';

const User: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();

  const columns: ProColumns[] = [
    {
      title: '账号',
      dataIndex: 'login',
      hideInSearch: true,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      hideInSearch: false,
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      hideInSearch: true,
    },
    {
      title: '状态',
      hideInSearch: true,
      dataIndex: 'status',
      valueEnum: {
        // PENDING, NORMAL, SUSPENDED
        ENABLED: {
          text: <Tag color="green">有效</Tag>,
          status: 'ENABLED',
        },
        DISABLED: {
          text: <Tag color="red">无效</Tag>,
          status: 'DISABLED',
        },
      },
    },
    {
      title: '最后一次登录',
      dataIndex: 'activity',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            //
          }}
        >
          编辑
        </a>,
        <a
          key="close"
          onClick={() => {
            //
          }}
        >
          冻结
        </a>,
        <a
          key="password"
          onClick={() => {
            //
          }}
        >
          修改密码
        </a>,
      ],
    },
  ];

  return (
    <div>
      <ProTable<any, API.PageParams>
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={(params) => commonRequestList(userList, params)}
        columns={columns}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: pagination.size,
        }}
        actionRef={actionRef}
        formRef={formRef}
        toolbar={{
          actions: [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                // setTitle('新增');
                // setCurrentRow({});
                // setType('new');
                // handleModalVisible(true);
              }}
            >
              <PlusOutlined /> {Message.Action}
            </Button>,
          ],
          settings: [],
        }}
      />
    </div>
  );
};

export default User;
