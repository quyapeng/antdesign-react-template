import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProFormInstance } from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { commonRequestList } from '@/utils/index';
import { pagination } from '@/constant/index';
import { Message } from '@/constant/common';

import { getCalendarList, allSchool } from '@/services/school';

const Calendar: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow]: any = useState();
  const [setModalVisible, handleModalVisible] = useState<boolean>(false);
  const [title, setTitle] = useState('新增教师');
  const [type, setType] = useState('new');

  const { run, data, loading } = useRequest(getCalendarList, {
    manual: true,
  });

  const { run: runSchool, data: schoolData } = useRequest(allSchool, {
    manual: true,
  });
  useEffect(() => {
    runSchool();
  }, []);

  const columns: ProColumns[] = [
    {
      title: '园所名称',
      dataIndex: 'schoolId',
      valueType: 'select',
      hideInSearch: false,
      fieldProps: {
        options: schoolData,
        fieldNames: {
          label: 'name',
          value: 'id',
        },
      },
      render: (_, record) => <>{record?.school?.name}</>,
    },
    {
      title: '年份',
      dataIndex: 'year',
      hideInSearch: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 160,
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            history.push(``);
          }}
        >
          设置校历
        </a>,
      ],
    },
  ];

  return (
    <div>
      <ProTable<any, API.PageParams>
        rowKey="id"
        loading={loading}
        search={{
          labelWidth: 120,
        }}
        request={(params) => commonRequestList(getCalendarList, params)}
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
                setTitle('新增校历');
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
    </div>
  );
};

export default Calendar;
