import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProFormInstance } from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { commonRequestList } from '@/utils/index';
import { pagination } from '@/constant/index';
import { Message } from '@/constant/common';

import { getCalendarList, allSchool, handleCalendar } from '@/services/school';
import AddCalendar from './components/AddCalendar';

const Calendar: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();
  const [setModalVisible, handleModalVisible] = useState<boolean>(false);

  const { loading } = useRequest(getCalendarList, {
    manual: true,
  });

  const { run: runSchool, data: schoolData } = useRequest(allSchool, {
    manual: true,
  });
  useEffect(() => {
    runSchool();
  }, []);

  const submitCalendar = async (value: any) => {
    try {
      const success: any = await handleCalendar(value);
      if (success) {
        message.success({
          content: Message.New,
        });
        handleModalVisible(false);
        if (actionRef.current) actionRef.current.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            history.push(`/business/detailCalendar/${record.id}`);
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
                handleModalVisible(true);
              }}
            >
              <PlusOutlined /> {Message.Action}
            </Button>,
          ],
          settings: [],
        }}
      />
      <AddCalendar
        title="新增校历"
        visible={setModalVisible}
        onSubmit={async (value: any) => {
          console.log(value);
          submitCalendar(value);
        }}
        onCancel={() => {
          handleModalVisible(false);
        }}
        schoolData={schoolData}
      />
    </div>
  );
};

export default Calendar;
