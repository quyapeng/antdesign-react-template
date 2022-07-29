import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProFormInstance } from '@ant-design/pro-form';
import { useRequest, useParams } from 'umi';
import { OPTION_DATE, pagination, STATUS_DATE, TYPE_LEAVE } from '@/constant/index';
import { Message, DIS_STYLE, ORDER_STATUS_EUM } from '@/constant/common';
import { getAttendance } from '@/services/school';
import { commonRequestList } from '@/utils';

const Check: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();
  const [user, setUser]: any = useState({});

  const { run, loading, data } = useRequest(getAttendance, {
    manual: true,
  });

  //
  const params: any = useParams();
  useEffect(() => {}, []);

  const columns: ProColumns[] = [
    {
      title: '学生名称',
      dataIndex: 'name',
      hideInSearch: true,
      render: (_, record) => <>{record?.student?.user?.name}</>,
    },
    {
      title: '所在班级',
      dataIndex: 'classroom',
      hideInSearch: true,
      render: (_, record) => <>{record?.student?.classroom?.name}</>,
    },
    {
      title: '日期',
      dataIndex: 'date',
      hideInSearch: true,
    },

    {
      title: '出缺勤状态',
      dataIndex: 'status',
      hideInSearch: false,
      valueEnum: OPTION_DATE,
      render: (_, record) => <>{STATUS_DATE[record?.status]}</>,
    },
    {
      title: '具体事由',
      dataIndex: 'status',
      hideInSearch: true,
      render: (_, record) => (
        <>
          {record?.status !== 'NORMAL'
            ? TYPE_LEAVE[record?.leave?.type] + record?.leave?.remark
            : '-'}
        </>
      ),
    },
    {
      title: '记录人',
      hideInSearch: true,
      render: (_, record) => <>{record?.createdBy?.name}</>,
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
        request={(values: any) =>
          commonRequestList(getAttendance, Object.assign(values, { studentId: params.id }))
        }
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
                //
              }}
            >
              <DownOutlined /> {Message.DownLoad}
            </Button>,
          ],
          settings: [],
        }}
      />
    </div>
  );
};

export default Check;
