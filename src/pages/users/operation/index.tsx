import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProFormInstance } from '@ant-design/pro-form';

import { commonRequestList } from '@/utils/index';
import { pagination } from '@/constant/index';

import { Message, STATUS_USER } from '@/constant/common';

import { useRequest } from 'umi';
import { operationList, handleUser, roleOperationList } from '@/services/user';
import AddUserForm from '../components/AddUserForm';

const Operation: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow]: any = useState();
  const [setModalVisible, handleModalVisible] = useState<boolean>(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('new');

  const { run, loading } = useRequest(operationList, {
    manual: true,
  });

  const { data: rolesData } = useRequest(roleOperationList, {
    manual: false,
  });
  const freeze = (detail: any) => {
    try {
      Modal.confirm({
        title: '确定要进行冻结操作吗',
        onOk() {
          console.log('ok');
          const { userId, status } = detail;
          if (userId) {
            handleUser('PATCH', {
              userId,
              status:
                status == STATUS_USER.NORMAL.status
                  ? STATUS_USER.PENDING.status
                  : STATUS_USER.NORMAL.status,
            }).then((res: any) => {
              console.log('res', res);
              const { status } = res;
              if (status == 200) {
                message.success(Message.Options);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
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

  const submitUser = async (value: any, method: string) => {
    try {
      const params = type == 'new' ? value : { ...value, id: currentRow.id };
      if (!value.mobile) delete params.mobile;
      const success = await handleUser(method, params);
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
    } catch (error) {
      console.log(error);
    }
  };
  const columns: ProColumns[] = [
    {
      title: '账号',
      dataIndex: 'login',
      hideInSearch: false,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      hideInSearch: false,
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      hideInSearch: false,
    },
    {
      title: '角色',
      dataIndex: 'roleId',
      hideInSearch: false,
      valueType: 'select',
      fieldProps: {
        fieldNames: {
          label: 'title',
          value: 'id',
        },
        options: rolesData,
      },
      render: (_, record) => <>{record?.role?.title}</>,
    },
    {
      title: '状态',
      hideInSearch: false,
      dataIndex: 'status',
      valueEnum: STATUS_USER,
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
      fixed: 'right',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            //
            setType('edit');
            setTitle('编辑');
            setCurrentRow({ ...record, roleId: record.role.id });
            handleModalVisible(true);
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
          {record.status == STATUS_USER.NORMAL.status ? '冻结' : '解冻'}
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
                setTitle('新增');
                setType('new');
                setCurrentRow({});
                handleModalVisible(true);
              }}
            >
              <PlusOutlined /> {Message.Action}
            </Button>,
          ],
          settings: [],
        }}
      />
      <AddUserForm
        type={type}
        title={title}
        values={currentRow || {}}
        visible={setModalVisible}
        onSubmit={async (value) => {
          console.log('onSubmit', currentRow, value);
          const method = type == 'new' ? 'POST' : 'PATCH';
          submitUser(value, method);
        }}
        onCancel={() => {
          handleModalVisible(false);
        }}
      />
    </div>
  );
};

export default Operation;
