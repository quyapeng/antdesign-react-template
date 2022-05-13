import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Tag, TablePaginationConfig } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
// import type { FormValueType } from './components/UpdateForm';
import UpdateForm from '../components/UpdateForm';
import { role } from '@/services/api';
import { commonRequestList } from '@/utils/index';
import { pagination } from '@/constant/index';
import styles from './index.less';

const Menu: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow]: any = useState();
  const [selectedRowsState, setSelectedRows] = useState<[]>([]);
  const [page, setPage] = useState(pagination);

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
        //  actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={(params) => commonRequestList(role, params)}
        columns={columns}
        // pagination={page}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: page.size,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新增
          </Button>,
        ]}
      />

      {/* <ModalForm
         title={'New rule'}
         width="400px"
         visible={createModalVisible}
         onVisibleChange={handleModalVisible}
         onFinish={async (value) => {
           const success = await handleAdd(value as any);
           if (success) {
             handleModalVisible(false);
             if (actionRef.current) {
               actionRef.current.reload();
             }
           }
         }}
       >
         <ProFormText
           rules={[
             {
               required: true,
               message: '必填',
             },
           ]}
           width="md"
           name="name"
         />
         <ProFormTextArea width="md" name="desc" />
       </ModalForm> */}
      {/* <UpdateForm
         onSubmit={async (value) => {
           const success = await handleUpdate(value);
           if (success) {
             handleUpdateModalVisible(false);
             setCurrentRow(undefined);
             if (actionRef.current) {
               actionRef.current.reload();
             }
           }
         }}
         onCancel={() => {
           handleUpdateModalVisible(false);
           if (!showDetail) {
             setCurrentRow(undefined);
           }
         }}
         updateModalVisible={updateModalVisible}
         values={currentRow || {}}
       /> */}

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

export default Menu;
