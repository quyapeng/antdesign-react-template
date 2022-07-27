import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Tag } from 'antd';
import React, { useState, useRef, Fragment, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProFormInstance } from '@ant-design/pro-form';

import { commonRequestList } from '@/utils/index';
import { pagination } from '@/constant/index';
import { Message, STATUS, SCHOOL_TYPE } from '@/constant/common';
import { useRequest } from 'umi';

import { categoryList } from '@/services/course';
import { classroomList, allSchool, foodTemplate, handleClassroom } from '@/services/school';
import ClassroomForm from './components/ClassroomForm';

const Classroom: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow]: any = useState();
  const [setModalVisible, handleModalVisible] = useState<boolean>(false);
  const [title, setTitle] = useState('新增');
  const [type, setType] = useState('new');

  const { run, loading } = useRequest(classroomList, {
    manual: true,
  });

  const { run: runFoodTemplate, data: foodTemData } = useRequest(foodTemplate, {
    manual: true,
  });

  const { run: runSchool, data: schoolData } = useRequest(allSchool, {
    manual: true,
  });

  const { run: runCategory, data: categoryData } = useRequest(categoryList, {
    manual: true,
  });

  //

  useEffect(() => {
    runSchool();
    runCategory();
    runFoodTemplate();
  }, []);

  const columns: ProColumns[] = [
    {
      title: '园所名称',
      dataIndex: 'schoolId',
      valueType: 'select',
      hideInSearch: false,
      fieldProps: {
        fieldNames: {
          label: 'name',
          value: 'id',
        },
        options: schoolData,
      },
      render: (_, record) => <>{record?.school?.name}</>,
    },
    {
      title: '教室名称',
      dataIndex: 'name',
      hideInSearch: false,
    },
    {
      title: '课程分类',
      dataIndex: 'courseCategoryId',
      valueType: 'select',
      hideInSearch: false,
      fieldProps: {
        fieldNames: {
          label: 'name',
          value: 'id',
        },
        options: categoryData,
      },
      render: (_, record) => <>{record?.courseCategory?.name}</>,
    },
    {
      title: '食谱模版名称',
      dataIndex: 'recipeId',
      valueType: 'select',
      hideInSearch: false,
      fieldProps: {
        fieldNames: {
          label: 'name',
          value: 'id',
        },
        options: foodTemData,
      },
      render: (_, record) => <>{record?.recipe?.name}</>,
    },
    {
      title: '监控设备数',
      dataIndex: 'schoolMonitors',
      hideInSearch: true,
      render: (_, record) => <>{record?.schoolMonitors?.length}</>,
    },
    {
      title: '状态',
      hideInSearch: false,
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: STATUS,
      render: (_, record) => (
        <Tag color={record.status == 'ENABLED' ? 'green' : 'red'}>
          {STATUS[record.status]?.text}
        </Tag>
      ),
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
            setType('edit');
            setTitle('编辑');
            setCurrentRow({
              ...record,
              schoolId: record.school.id,
              courseCategoryId: record.courseCategory.id,
              recipeId: record.recipe.id,
              schoolMonitorIds: record.schoolMonitors?.map((i: any) => i.id),
            });
            handleModalVisible(true);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            deleteClassroom(record);
          }}
        >
          删除
        </a>,
      ],
    },
  ];
  const deleteClassroom = (detail: any) => {
    try {
      Modal.confirm({
        title: '确定要进行删除操作吗',
        onOk() {
          console.log('ok');
          const { id } = detail;
          if (id) {
            handleClassroom('DELETE', { id }).then((res) => {
              console.log('res', res);
              const { status } = res;
              if (status == 200) {
                message.success(Message.Delete);
                handleModalVisible(false);
                setCurrentRow(undefined);
                if (actionRef.current) actionRef.current.reload();
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

  const submitClassroom = async (method: string, value: any) => {
    try {
      const success = await handleClassroom(method, value);
      if (success) {
        message.success({
          content: type == 'new' ? Message.New : Message.Edit,
        });
        handleModalVisible(false);
        setCurrentRow(undefined);
        if (actionRef.current) actionRef.current.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ProTable<any, API.PageParams>
        scroll={{ x: 900 }}
        rowKey="id"
        loading={loading}
        search={{
          labelWidth: 120,
        }}
        request={(params) => commonRequestList(classroomList, params)}
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
      <ClassroomForm
        type={type}
        title={title}
        values={currentRow || {}}
        visible={setModalVisible}
        onSubmit={async (value: any) => {
          submitClassroom(type == 'new' ? 'POST' : 'PATCH', value);
        }}
        onCancel={() => {
          handleModalVisible(false);
        }}
        schoolData={schoolData}
        categoryData={categoryData}
        foodTemData={foodTemData}
      />
    </div>
  );
};

export default Classroom;
