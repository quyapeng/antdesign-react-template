import React, { useRef, useEffect } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { useRequest, useParams } from 'umi';
import { pagination } from '@/constant/index';
import { ACTIVED_STATUS, STUDENT_STATUS } from '@/constant/common';
import { getStudentList } from '@/services/school';
import { commonRequestList } from '@/utils';
import { Tag } from 'antd';

const studentList: React.FC = () => {
  const formRef = useRef<any>();
  const actionRef = useRef<any>();

  const { run, loading, data } = useRequest(getStudentList, {
    manual: true,
  });
  const formatData = (data: any, name: any, code: any) => {
    return data?.map((i: any) => {
      if (i.relation == code) {
        return i[name];
      }
    });
  };

  const params: any = useParams();
  useEffect(() => {}, [params]);

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '学生姓名',
      dataIndex: 'name',
      hideInSearch: true,
      render: (_, record) => <>{record?.user?.name}</>,
    },

    {
      title: '性别',
      dataIndex: '',
      hideInSearch: true,
      render: (_, record) => <>{record?.user?.sex}</>,
    },
    {
      title: '父亲姓名',
      dataIndex: 'FATHER',
      hideInSearch: true,
      render: (_, record) => <>{formatData(record?.user?.parents, 'name', 'FATHER')}</>,
    },
    {
      title: '父亲手机号',
      dataIndex: 'FATHER_m',
      hideInSearch: true,
      render: (_, record) => <>{formatData(record?.user?.parents, 'mobile', 'FATHER')}</>,
    },
    {
      title: '母亲姓名',
      dataIndex: 'MOTHER',
      hideInSearch: true,
      render: (_, record) => <>{formatData(record?.user?.parents, 'name', 'MOTHER')}</>,
    },
    {
      title: '母亲手机号',
      dataIndex: 'MOTHER_m',
      hideInSearch: true,
      render: (_, record) => <>{formatData(record?.user?.parents, 'mobile', 'MOTHER')}</>,
    },
    {
      title: '就读状态',
      dataIndex: 'status',
      hideInSearch: false,
      valueEnum: STUDENT_STATUS,
      render: (_, record) => <>{STUDENT_STATUS[record?.status].text}</>,
    },
    {
      title: '激活状态',
      dataIndex: 'actived',
      valueType: 'select',
      valueEnum: ACTIVED_STATUS,
      hideInSearch: false,
      render: (_, record) => (
        <Tag color={record.status ? 'green' : 'red'}>
          {ACTIVED_STATUS[record.actived ? 1 : 0]?.text}
        </Tag>
      ),
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
        beforeSearchSubmit={(p: any) => {
          p.studentId = params.id;
        }}
        request={(value) => {
          return commonRequestList(
            getStudentList,
            Object.assign(value, { classroomId: params?.id }),
          );
        }}
        columns={columns}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: pagination.size,
        }}
        // dataSource={data}
        actionRef={actionRef}
        formRef={formRef}
        toolbar={{
          actions: [],
          settings: [],
        }}
      />
    </div>
  );
};

export default studentList;
