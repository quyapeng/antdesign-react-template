import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Select, Tag, TreeSelect } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProFormInstance } from '@ant-design/pro-form';
import AddSourceModelForm from '../components/AddSourceModelForm';
import useRequest from '@ahooksjs/use-request';

import { commonRequestList } from '@/utils/index';
import { pagination } from '@/constant/index';
import { Message, STATUS } from '@/constant/common';

import { sourceList, categoryList, activityList, handleSource } from '@/services/course';

const Source: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [type, setType] = useState<string>('new');
  const [title, setTitle] = useState('');
  const [currentRow, setCurrentRow]: any = useState();
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();

  const [categoryData, setData] = useState({});
  const [activityData, setActivityData] = useState({});
  const [, setActivitySub] = useState({});
  const [activityId, setId] = useState();

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

  const { run: source } = useRequest(sourceList, {
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
    setActivityData(tmp);
  }, [list?.data]);

  // 小类
  useEffect(() => {
    let tmp = {};
    list?.data.map(({ id, name }: any) => {
      tmp[id] = {
        text: name,
        status: id,
      };
    });
    setActivitySub(tmp);
  }, [list?.data]);

  const onChange = (e: any, type: string, form: any) => {
    console.log(e, type, form);
    setId(e);
    form.setFieldsValue({
      activityId: e || undefined,
    });
  };

  const onSubmit = (value: any) => {
    handleSource('POST', value).then((res) => {
      console.log('res', res);
      const { status } = res;
      if (status == 200) {
        message.success(Message.New);
        source();
      }
    });
  };

  //
  const deleteSource = (detail: any) => {
    try {
      Modal.confirm({
        title: '确定要进行删除操作吗',
        onOk() {
          console.log('ok');
          const { id } = detail;
          if (id) {
            handleSource('DELETE', { id }).then((res) => {
              console.log('res', res);
              const { status } = res;
              if (status == 200) {
                message.success(Message.Delete);
                source();
              }
            });
          }
        },
        onCancel() {},
      });
    } catch (error) {
      console.log(error);
    }
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
      dataIndex: 'categoryId',
      hideInSearch: false,
      valueEnum: { ...categoryData },
      render: (_, record) => <>{record?.category?.name}</>,
    },
    {
      title: '活动大类',
      key: 'parent',
      dataIndex: 'parent',
      hideInSearch: true,
      valueEnum: { ...activityData },
      render: (_, record) => <>{record?.activity?.parent?.name}</>,
    },
    {
      title: '活动小类',
      key: 'activityId',
      valueType: 'treeSelect',
      dataIndex: 'activityId',
      valueEnum: { ...activityData },
      hideInSearch: false,
      renderFormItem: (_, record, form) => {
        return (
          <TreeSelect
            treeData={list?.data}
            treeDefaultExpandAll
            allowClear
            value={activityId}
            placeholder="请选择活动类"
            onChange={(e: any) => onChange(e, 'onChange', form)}
            key="activity"
            treeLine
            showCheckedStrategy={TreeSelect.SHOW_CHILD}
            fieldNames={{ label: 'name', value: 'id', children: 'subActivities' }}
          ></TreeSelect>
        );
      },
      render: (_, record) => <>{record?.activity?.name}</>,
    },
    {
      title: '状态',
      hideInSearch: false,
      dataIndex: 'status',
      valueEnum: { ...STATUS },
      render: (_, record) => (
        <Tag color={record.status == 'ENABLED' ? 'green' : 'red'}>{STATUS[record.status].text}</Tag>
      ),
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
            // setType('edit');
            handleModalVisible(true);
            setCurrentRow(record);
          }}
        >
          编辑
        </a>,
        <a key="delete" onClick={() => deleteSource(record)}>
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
                setCurrentRow({
                  courseDates: [{ fromDate: undefined, toDate: undefined }],
                });
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

      <AddSourceModelForm
        title={title}
        visible={createModalVisible}
        type={type}
        onSubmit={async (value: any) => {
          console.log('onSubmit', value);
          const { dateRange } = value;
          let courseDates = [{ fromDate: dateRange[0], endDate: dateRange[1] }];
          value.courseDates = courseDates;
          delete value.dateRange;
          console.log(value);
          onSubmit(value);
        }}
        onCancel={() => {
          handleModalVisible(false);
          // if (!showDetail) {
          //   setCurrentRow(undefined);
          // }
        }}
        categoryList={data?.data}
        activityList={list?.data}
        values={currentRow || {}}
      />
    </div>
  );
};

export default Source;
