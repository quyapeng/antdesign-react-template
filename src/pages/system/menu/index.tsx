import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
// import type { FormValueType } from './components/UpdateForm';
import UpdateForm from '../components/SetForm';
import { rule, addRule, updateRule, removeRule } from '@/services/api';
import { commonRequestList } from '@/utils/index';
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

  console.log('rule', commonRequestList);
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns[] = [
    {
      title: 'Rule name',
      dataIndex: 'name',
      tip: 'The rule name is the unique key',
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
      title: 'Description',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: 'Number of service calls',
      dataIndex: 'callNo',
      sorter: true,
      hideInForm: true,
      renderText: (val: string) => `${val}' 万 '`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: 'Shut down',
          status: 'Default',
        },
        1: {
          text: 'Running',
          status: 'Processing',
        },
        2: {
          text: 'Online',
          status: 'Success',
        },
        3: {
          text: 'Abnormal',
          status: 'Error',
        },
      },
    },
    {
      title: 'Last scheduled time',
      sorter: true,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');
        if (`${status}` === '0') {
          return false;
        }
        if (`${status}` === '3') {
          return <Input {...rest} placeholder={'Please enter the reason for the exception!'} />;
        }
        return defaultRender(item);
      },
    },
    {
      title: 'Operating',
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
          配置
        </a>,
      ],
    },
  ];

  return (
    <div>
      <ProTable<any, API.PageParams>
        headerTitle={'Enquiry form'}
        actionRef={actionRef}
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
        // request={(params) => {
        //   rule, params;
        // }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows: any) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
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
              // await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            Batch deletion
          </Button>
          <Button type="primary">Batch approval</Button>
        </FooterToolbar>
      )}
      
     
    </div>
  );
};

export default Menu;
function handleAdd(arg0: any) {
  throw new Error('Function not implemented.');
}

