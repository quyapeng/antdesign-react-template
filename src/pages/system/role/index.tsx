import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import AddRoleForm from '../components/AddRoleForm';
import SetForm from '../components/SetForm';

import { role, addRole, updateRole, menuList } from '@/services/api';
import { commonRequestList } from '@/utils/index';
import { pagination } from '@/constant/index';
import { Message } from '@/constant/common';

import { ProFormInstance } from '@ant-design/pro-form';
import { useRequest } from 'umi';

const Role: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [type, setType] = useState<string>('new');
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow]: any = useState();
  const [setModalVisible, handleSetModalVisible] = useState<boolean>(false);
  const formRef = useRef<ProFormInstance>();
  // const [currentRecord, setCurrentRecord]: any = useState();
  const { data } = useRequest(menuList);
  const [title, setTitle] = useState('');

  const columns: ProColumns[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '角色名称',
      dataIndex: 'title',
      hideInSearch: false,
    },
    {
      title: '角色编码',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '状态',
      hideInSearch: true,
      dataIndex: 'status',
      valueEnum: {
        NORMAL: {
          text: <Tag color="green">正常</Tag>,
          status: 'NORMAL',
        },
        SUSPENDED: {
          text: <Tag color="red">禁用</Tag>,
          status: 'SUSPENDED',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            setTitle('编辑角色');
            setType('edit');
            handleModalVisible(true);
            setCurrentRow(record);
          }}
        >
          编辑
        </a>,
        <a
          key="set"
          onClick={() => {
            handleSetModalVisible(true);
            setCurrentRow(record);
          }}
        >
          权限分配
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
        request={(params) => commonRequestList(role, params)}
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
                setTitle('新增角色');
                setCurrentRow({});
                setType('new');
                handleModalVisible(true);
              }}
            >
              <PlusOutlined /> 新增
            </Button>,
          ],
          settings: [],
        }}
      />

      <AddRoleForm
        title={title}
        visible={createModalVisible}
        type={type}
        onSubmit={async (value) => {
          console.log('onSubmit', currentRow);
          const success =
            type == 'new'
              ? await addRole(value)
              : await updateRole({ ...value, id: currentRow.id });
          console.log(success);
          if (success) {
            message.success({
              content: type == 'new' ? Message.New : Message.Edit,
            });
            handleModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              //手动
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleModalVisible(false);
          // if (!showDetail) {
          //   setCurrentRow(undefined);
          // }
        }}
        values={currentRow || {}}
      />

      <SetForm
        title={'权限分配'}
        menu={data}
        visible={setModalVisible}
        onSubmit={async (value) => {
          console.log('onSubmit', value);
        }}
        onCancel={() => {
          handleSetModalVisible(false);
        }}
        values={currentRow || {}}
      />
    </div>
  );
};

export default Role;
