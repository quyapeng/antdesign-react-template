import React, { useState, useRef, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProFormInstance } from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { commonRequestList } from '@/utils/index';
import { pagination } from '@/constant/index';

import { getFoodList, allSchool } from '@/services/school';

const Food: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();

  const { run, data, loading } = useRequest(getFoodList, {
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
            // ('设置餐次');
          }}
        >
          设置餐次
        </a>,
        <a
          key="food"
          onClick={() => {
            history.push(``);
          }}
        >
          设置食谱
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
        request={(params) => commonRequestList(getFoodList, params)}
        columns={columns}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: pagination.size,
        }}
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

export default Food;
