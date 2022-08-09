import React, { useState, useRef, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProFormInstance } from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { commonRequestList } from '@/utils/index';
import { pagination } from '@/constant/index';

import { getFoodList, allSchool, allMeals, setMeal } from '@/services/school';
import SetMealsTimes from './components/SetMealsTimes';
import { message } from 'antd';
import { Message } from '@/constant/common';

const Food: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow]: any = useState();
  const [setModalVisible, handleModalVisible] = useState<boolean>(false);
  const { loading } = useRequest(getFoodList, {
    manual: true,
  });

  const { run: runSchool, data: schoolData } = useRequest(allSchool, {
    manual: true,
  });

  // allMeals
  const { run: runMeals, data: mealData } = useRequest(allMeals, {
    manual: true,
  });
  useEffect(() => {
    runSchool();
    runMeals();
  }, []);

  const setMeals = async (value: any) => {
    console.log(value);
    try {
      const success = await setMeal(value);
      if (success) {
        message.success({
          content: Message.Set,
        });
        handleModalVisible(false);
        setCurrentRow(undefined);
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
      title: '食谱模版',
      dataIndex: 'recipe',
      hideInSearch: true,
      render: (_, record) => <>{record?.recipe?.name}</>,
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
            const mealIds = record?.meals?.map((i: any) => {
              return i.id;
            });
            record.mealIds = mealIds;
            setCurrentRow(record);
            handleModalVisible(true);
          }}
        >
          设置餐次
        </a>,
        <a
          key="food"
          onClick={() => {
            history.push(`/business/mealDetail/${record.id}`);
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
      <SetMealsTimes
        title={'设置餐次'}
        values={currentRow || {}}
        visible={setModalVisible}
        onSubmit={async (value: any) => {
          setMeals(value);
        }}
        onCancel={() => {
          handleModalVisible(false);
          setCurrentRow({});
        }}
        mealData={mealData}
      />
    </div>
  );
};

export default Food;
