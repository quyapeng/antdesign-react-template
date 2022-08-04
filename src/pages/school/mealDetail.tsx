import React, { useEffect, useState } from 'react';
import { ProColumns } from '@ant-design/pro-table';
import { Message } from '@/constant/common';

import { getRecipeDetail, setRecipeWall } from '@/services/school';
import TabPane from '@ant-design/pro-card/lib/components/TabPane';
import TableMeal from './components/TableMeal';
import { message, Tabs } from 'antd';
import { useParams, history } from 'umi';

const mealDetail: React.FC = () => {
  const [currentRow, setCurrentRow]: any = useState();

  const params: { id: string | undefined } = useParams();
  useEffect(() => {
    console.log('history', history);
    getDetail(params.id);
  }, [params]);

  const getDetail = async (id: string | undefined) => {
    getRecipeDetail(id).then((res) => {
      setCurrentRow(res.data);
    });
  };
  const submit = async (param: any, data: []) => {
    param.recipeId = params?.id;
    param.data = formatData(data);
    try {
      const success = await setRecipeWall(param);
      if (success) {
        message.success({
          content: Message.Edit,
        });
        getDetail(params.id);
      } else {
        console.log(success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatData = (data: []) => {
    return [
      ...data?.map(
        ({ mondayData, tuesdayData, wednesdayData, thursdayData, fridayData, meal }: any) => {
          return {
            mealId: meal.id,
            mondayData,
            tuesdayData,
            wednesdayData,
            thursdayData,
            fridayData,
          };
        },
      ),
    ];
  };
  const columns: ProColumns & { editable?: boolean }[] = [
    {
      title: '餐次',
      dataIndex: 'meal',
      hideInSearch: true,
      width: '80px',
      render: (_: any, record: any) => <>{record?.meal?.name}</>,
    },
    {
      title: '周一',
      dataIndex: 'mondayData',
      editable: true,
      hideInSearch: true,
    },

    {
      title: '周二',
      dataIndex: 'tuesdayData',
      editable: true,
      hideInSearch: true,
    },
    {
      title: '周三',
      dataIndex: 'wednesdayData',
      editable: true,
      hideInSearch: true,
    },
    {
      title: '周四',
      dataIndex: 'thursdayData',
      editable: true,
      hideInSearch: true,
    },
    {
      title: '周五',
      dataIndex: 'fridayData',
      editable: true,
      hideInSearch: true,
    },
    {
      title: '周六',
      dataIndex: 'sta',
      hideInSearch: true,
    },
    {
      title: '周日',
      dataIndex: 'sun',
      hideInSearch: true,
    },
  ];
  return (
    <div>
      <h2>{currentRow && currentRow[0]?.year ? `${currentRow[0]?.year}年` : '暂无数据'}</h2>
      <Tabs key={'month'} tabPosition="top">
        {currentRow?.map((i: any) => (
          <TabPane tab={` ${i.month}月 `} key={i.month}>
            {child(i.details, columns, i.month, submit)}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

const child = (i: any, columns: any, month: string | number, onSubmit: any) => {
  return i && i.length > 0 ? (
    <Tabs tabPosition="left" key={'week'}>
      {i?.map((j: any) => (
        <TabPane tab={`第${j.week}周`} key={j.week} style={{ height: '600px', overflow: 'auto' }}>
          <h2>{`${month}月 第${j.week}周`}</h2>
          <h2>
            {j.fromDate} ~ {j.endDate}
          </h2>
          <TableMeal
            columns={columns}
            data={j.schoolRecipes}
            month={month}
            values={j}
            onSubmit={async (month: string | number, values: any, data: []) => {
              let param = { month, week: values.week };
              onSubmit(param, data);
            }}
          />
        </TabPane>
      ))}
    </Tabs>
  ) : (
    '暂无数据'
  );
};

export default mealDetail;
