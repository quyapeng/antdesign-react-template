import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Tag, TablePaginationConfig } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormRadio, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
// import type { FormValueType } from './components/UpdateForm';
import UpdateForm from '../components/UpdateForm';
import AddRoleForm from '../components/AddRoleForm';

import { role } from '@/services/api';
import { commonRequestList } from '@/utils/index';
import { pagination } from '@/constant/index';
import styles from './index.less';

const Role: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(true);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow]: any = useState();
  const [selectedRowsState, setSelectedRows] = useState<[]>([]);
  const [page, setPage] = useState(pagination);

  const [title, setTitle] = useState('');

  const columns: ProColumns[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      hideInSearch: false,
    },
    {
      title: '角色编码',
      dataIndex: 'code',
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
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          编辑
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
          defaultPageSize: page.size,
        }}
        toolbar={{
          actions: [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                setTitle('新增角色');
                handleModalVisible(true);
              }}
            >
              <PlusOutlined /> 新增
            </Button>,
          ],
          settings: [],
        }}
      />

      {/* <ModalForm
        title={title}
        width="500px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        {...{
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
        }}
        layout="horizontal"
        onFinish={async (value) => {
          console.log(value);
          // const success = await handleAdd(value as any);
          // if (success) {
          //   handleModalVisible(false);
          //   if (actionRef.current) {
          //     actionRef.current.reload();
          //   }
          // }
        }}
      >
        <ProFormText
          label="角色名称"
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormText
          label="角色编码"
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
          width="md"
          name="code"
        />
        <ProFormText
          label="角色前缀"
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
          width="md"
          name="accPrefix"
        />
        <ProFormText
          label="角色权重"
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
          width="md"
          name="weight"
        />
        <ProFormRadio.Group
          name="type"
          label="角色类型"
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
          options={[
            {
              value: '0',
              label: '系统角色',
            },
            {
              value: '1',
              label: '业务角色',
            },
          ]}
        />
        <ProFormRadio.Group
          label="状态"
          name="status"
          rules={[
            {
              required: true,
              message: '必填',
            },
          ]}
          options={[
            {
              value: '0',
              label: '待激活',
            },
            {
              value: '1',
              label: '正常',
            },
            {
              value: '2',
              label: '禁用',
            },
          ]}
        />
        <ProFormTextArea name="desc" width="md" label={'备注'} placeholder={'请输入备注'} />
      </ModalForm> */}
      <AddRoleForm
        title={title}
        visible={createModalVisible}
        // onVisibleChange={handleModalVisible}
        onSubmit={async (value) => {
          // const success = await handleUpdate(value);
          // if (success) {
          //   handleUpdateModalVisible(false);
          //   setCurrentRow(undefined);
          //   if (actionRef.current) {
          //     actionRef.current.reload();
          //   }
          // }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        values={currentRow || {}}
        updateModalVisible={false}
      />

      <UpdateForm
        onSubmit={async (value) => {
          // const success = await handleUpdate(value);
          // if (success) {
          //   handleUpdateModalVisible(false);
          //   setCurrentRow(undefined);
          //   if (actionRef.current) {
          //     actionRef.current.reload();
          //   }
          // }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        // values={currentRow || {}}
      />

      {/* <Drawer
         width={600}
         visible={showDetail}
         onClose={() => {
           setCurrentRow(undefined);
           setShowDetail(false);
         }}
         closable={false}
       >
         {currentRow?.name && (
           <ProDescriptions<any>
             column={2}
             title={currentRow?.name}
             request={async () => ({
               data: currentRow || {},
             })}
             params={{
               id: currentRow?.name,
             }}
             columns={columns as ProDescriptionsItemProps[]}
           />
         )}
       </Drawer> */}
    </div>
  );
};

export default Role;
