import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import AddModelForm from '../components/AddModelForm';

import { type, addType, updateType } from '@/services/course';
import { commonRequestList } from '@/utils/index';
import { pagination } from '@/constant/index';
import { Message } from '@/constant/common';

import { ProFormInstance } from '@ant-design/pro-form';
import { useParams } from 'umi';

const Theme: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [type, setType] = useState<string>('new');
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow]: any = useState();
  const formRef = useRef<ProFormInstance>();
  const [title, setTitle] = useState('');

  const columns: ProColumns[] = [
    {
      title: '主题类型',
      dataIndex: 'title',
      hideInSearch: false,
    },
    {
      title: '主题内容',
      dataIndex: 'title',
      hideInSearch: false,
    },
    {
      title: '展示开始日期',
      dataIndex: 'title',
      hideInSearch: false,
    },
    {
      title: '展示结束日期',
      dataIndex: 'title',
      hideInSearch: false,
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            setTitle('编辑');
            setType('edit');
            handleModalVisible(true);
            setCurrentRow(record);
          }}
        >
          编辑
        </a>,

        <a
          key="delete"
          onClick={() => {
            //
          }}
        >
          删除
        </a>,
      ],
    },
  ];
  const params = useParams();

  return (
    <div>
      <p>{params.id}</p>
      <ProTable<any, API.PageParams>
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={(params) => commonRequestList(type, params)}
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

      <AddModelForm
        title={title}
        visible={createModalVisible}
        type={type}
        onSubmit={async (value) => {
          console.log('onSubmit', currentRow);
          const success =
            type == 'new'
              ? await addType(value)
              : await updateType({ ...value, id: currentRow.id });
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
        }}
        values={currentRow || {}}
      />
    </div>
  );
};

export default Theme;
