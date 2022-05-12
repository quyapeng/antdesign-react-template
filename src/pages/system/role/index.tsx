import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from '../components/UpdateForm';
import { role } from '@/services/api';
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
 
   /**
    * @en-US International configuration
    * @zh-CN 国际化配置
    * */
 
   const columns: ProColumns[] = [
     {
       title: '角色名称',
       dataIndex: 'name',
       render: (dom, entity) => {
         return (
           <a
             onClick={() => {
               setCurrentRow(entity);
               setShowDetail(true);
             }}
           >
             {dom}
           </a>
         );
       },
     },
     {
       title: '角色编码',
       dataIndex: 'code',
       hideInSearch: true,
       valueType: 'code',
     },
    
     {
       title: '状态',
       hideInSearch: true,
       dataIndex: 'status',
       valueEnum: {
         0: {
           text: '正常',
           status: 'NORMAL',
         },
         1: {
           text: 'Running',
           status: 'Processing',
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
         rowKey="key"
         search={{
           labelWidth: 120,
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
        //  request={role}
         columns={columns}
         
       />
       {/* {selectedRowsState?.length > 0 && (
         <FooterToolbar
           extra={
             <div>
               选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项 &nbsp;&nbsp;
               <span>
                 Total number of service calls{' '}
                 {selectedRowsState.reduce((pre, item: any) => pre + item.callNo!, 0)} 万
               </span>
             </div>
           }
         >
           <Button
             onClick={async () => {
               await handleRemove(selectedRowsState);
               setSelectedRows([]);
               actionRef.current?.reloadAndRest?.();
             }}
           >
             Batch deletion
           </Button>
           <Button type="primary">Batch approval</Button>
         </FooterToolbar>
       )} */}
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
