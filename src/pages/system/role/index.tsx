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
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
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

      <AddRoleForm
        title={title}
        visible={createModalVisible}
        onSubmit={async (value) => {
          console.log('onSubmit', value);
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
          handleModalVisible(false);
          // if (!showDetail) {
          //   setCurrentRow(undefined);
          // }
        }}
        values={currentRow || {}}
        // updateModalVisible={false}
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
