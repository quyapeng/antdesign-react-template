import { PlusOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

import { sourceList } from '@/services/course';
import { commonRequestList } from '@/utils/index';
import { pagination } from '@/constant/index';
import { Message } from '@/constant/common';

import { ProFormInstance } from '@ant-design/pro-form';

const Source: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [type, setType] = useState<string>('new');
  const [title, setTitle] = useState('');
  const [currentRow, setCurrentRow]: any = useState();
  const [setModalVisible, handleSetModalVisible] = useState<boolean>(false);
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();

  const columns: ProColumns[] = [
    {
      title: '课程编号',
      dataIndex: 'code',
      hideInSearch: true,
    },
    {
      title: '课程名称',
      dataIndex: 'name',
      hideInSearch: false,
    },
    {
      title: '课程分类',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '活动大类',
      dataIndex: 'category',
      hideInSearch: true,
    },
    {
      title: '活动小类',
      dataIndex: 'activity',
      hideInSearch: true,
    },
    {
      title: '状态',
      hideInSearch: true,
      dataIndex: 'status',
      valueEnum: {
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
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            // setTitle('编辑');
            // setType('edit');
            // handleModalVisible(true);
            // setCurrentRow(record);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            // handleSetModalVisible(true);
            // setCurrentRow(record);
          }}
        >
          删除
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
        request={(params) => commonRequestList(sourceList, params)}
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
              <PlusOutlined /> {Message.Action}
            </Button>,
          ],
          settings: [],
        }}
      />
    </div>
  );
};

export default Source;
