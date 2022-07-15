import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import { commonRequestList } from '@/utils/index';
import { pagination } from '@/constant/index';
import { ProFormInstance } from '@ant-design/pro-form';
import { Message, STATUS_USER } from '@/constant/common';

import { operationList, handleUser } from '@/services/user';
import { useRequest } from '@/.umi/plugin-request/request';

const Operation: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();

  const { run: typeList, loading } = useRequest(operationList, {
    manual: true,
  });
  const freeze = (detail: any) => {
    try {
      Modal.confirm({
        title: '确定要进行删除操作吗',
        onOk() {
          console.log('ok');
          const { id } = detail;
          if (id) {
            handleUser('DELETE', { id }).then((res: any) => {
              console.log('res', res);
              const { status } = res;
              if (status == 200) {
                message.success(Message.Delete);
                typeList(pagination);
              }
            });
          }
        },
        onCancel() {},
      });
    } catch (error) {
      console.log(error);
    }
  };
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
      title: '角色',
      dataIndex: 'role',
      hideInSearch: true,
      render: (_, record) => <>{record?.role?.title}</>,
    },
    {
      title: '状态',
      hideInSearch: true,
      dataIndex: 'status',
      valueEnum: {
        STATUS_USER,
      },
      render: (_, record) => (
        <Tag color={record.status == 'NORMAL' ? 'green' : 'red'}>
          {STATUS_USER[record.status].text}
        </Tag>
      ),
    },
    {
      title: '最后一次登录',
      dataIndex: 'lastLoginTime',
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
            freeze(record);
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
        rowKey="userId"
        loading={loading}
        search={{
          labelWidth: 120,
        }}
        request={(params) => commonRequestList(operationList, params)}
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

export default Operation;
