import { PlusOutlined } from '@ant-design/icons';
import { Button, Select, Tag } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProFormInstance } from '@ant-design/pro-form';
import AddSourceModelForm from '../components/AddSourceModelForm';
import useRequest from '@ahooksjs/use-request';

import { commonRequestList } from '@/utils/index';
import { pagination } from '@/constant/index';
import { Message, STATUS } from '@/constant/common';

import { sourceList, categoryList, activityList } from '@/services/course';

const Source: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [type, setType] = useState<string>('new');
  const [title, setTitle] = useState('');
  const [currentRow, setCurrentRow]: any = useState();
  const [setModalVisible, handleSetModalVisible] = useState<boolean>(false);
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();

  const [categoryData, setData] = useState({});
  const [activityData, setActivityData] = useState();

  const { run, data } = useRequest(categoryList, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.success) {
        console.log('ssssss', result, params);
      }
    },
  });

  const { run: runActivity, data: list } = useRequest(activityList, {
    manual: true,
  });

  useEffect(() => {
    run();
    runActivity();
  }, []);

  useEffect(() => {
    let tmp = {};
    data?.data.map(({ id, name }: any) => {
      tmp[id] = {
        text: name,
        status: id,
      };
    });
    setData(tmp);
  }, [data]);

  //
  // 大类
  useEffect(() => {
    let tmp = {};
    list?.data.map(({ id, name }: any) => {
      tmp[id] = {
        text: name,
        status: id,
      };
    });
    setActivityData(list?.data);
  }, [list?.data]);
  const onChange = (e: any, type: string) => {
    console.log('onChange', e, type);
    //
  };
  const MySelect: React.FC<{
    state: {
      type: number;
    };
    /** Value 和 onChange 会被自动注入 */
    value?: string;
    onChange?: (value: string) => void;
  }> = (props) => {
    const { state } = props;

    const [innerOptions, setOptions] = useState<
      {
        label: React.ReactNode;
        value: number;
      }[]
    >([]);

    useEffect(() => {
      const { type } = state || {};
      if (type === 2) {
        setOptions([]);
      } else {
        setOptions([]);
      }
    }, [JSON.stringify(state)]);

    return <Select options={innerOptions} value={props.value} onChange={props.onChange} />;
  };
  const columns: ProColumns[] = [
    {
      title: '课程编号',
      dataIndex: 'code',
      hideInSearch: false,
    },
    {
      title: '课程名称',
      dataIndex: 'name',
      hideInSearch: false,
    },
    {
      title: '课程分类',
      dataIndex: 'category',
      hideInSearch: false,
      valueEnum: { ...categoryData },
      render: (_, record) => <>{record?.category?.name}</>,
    },
    {
      title: '活动大类',
      dataIndex: 'activity',
      hideInSearch: false,
      // valueEnum: { ...activityData },
      renderFormItem: (_, { defaultRender }) => {
        return (
          <Select onChange={(e) => onChange(e, 'onChange')} key="search">
            {list?.data.map((i: any) => (
              <Select.Option key={i.id} value={i.id}>
                {i.name}
              </Select.Option>
            ))}
          </Select>
        );
      },
      render: (_, record) => <>{record?.activity?.parent?.name}</>,
    },
    // {
    //   title: '活动小类',
    //   dataIndex: 'activity',
    //   hideInSearch: false,
    //   render: (_, record) => <>{record?.activity?.name}</>,
    // },
    // {
    //   title: '状态',
    //   hideInSearch: false,
    //   dataIndex: 'status',
    //   valueEnum: { ...STATUS },
    //   render: (_, record) => (
    //     <Tag color={record.status == 'ENABLED' ? 'green' : 'red'}>{STATUS[record.status].text}</Tag>
    //   ),
    // },
    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   render: (_, record) => [
    //     <a
    //       key="config"
    //       onClick={() => {
    //         // setTitle('编辑');
    //         // setType('edit');
    //         // handleModalVisible(true);
    //         // setCurrentRow(record);
    //       }}
    //     >
    //       编辑
    //     </a>,
    //     <a
    //       key="delete"
    //       onClick={() => {
    //         // handleSetModalVisible(true);
    //         // setCurrentRow(record);
    //       }}
    //     >
    //       删除
    //     </a>,
    //   ],
    // },
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

      {/* <AddSourceModelForm
        title={title}
        visible={createModalVisible}
        type={type}
        onSubmit={async (value: any) => {
          console.log('onSubmit', currentRow);
        }}
        onCancel={() => {
          handleModalVisible(false);
          // if (!showDetail) {
          //   setCurrentRow(undefined);
          // }
        }}
        values={currentRow || {}}
      /> */}
    </div>
  );
};

export default Source;
