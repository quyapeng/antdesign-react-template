import { message } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProFormInstance } from '@ant-design/pro-form';

import { commonRequestList } from '@/utils/index';
import { pagination } from '@/constant/index';
import { Message } from '@/constant/common';
import { useRequest, history } from 'umi';

import { categoryList } from '@/services/course';
import { classList, allSchool, handleClass, allTeacher } from '@/services/school';
import ClassForm from './components/ClassForm';

const Classroom: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow]: any = useState();
  const [setModalVisible, handleModalVisible] = useState<boolean>(false);
  const [title, setTitle] = useState('新增');
  const [, setType] = useState('new');
  const [teacherData, setTeacherData]: any = useState([]);

  const { loading } = useRequest(classList, {
    manual: true,
  });

  const { run: runTeacherTemplate, data } = useRequest(allTeacher, {
    manual: true,
  });

  const { run: runSchool, data: schoolData } = useRequest(allSchool, {
    manual: true,
  });

  const { run: runCategory, data: categoryData } = useRequest(categoryList, {
    manual: true,
  });

  // const { run: runClassroom, data: classroomData } = useRequest(allClassroom, {
  //   manual: true,
  // });

  //
  useEffect(() => {
    console.log('data', data);
    data?.map((i: any) => {
      i.name = i.user.name;
      return i;
    }),
      setTeacherData(data);
  }, [data]);

  useEffect(() => {
    runSchool();
    runCategory();
    runTeacherTemplate();
    // runClassroom();
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
      // valueType: 'select',
      // fieldProps: {
      //   fieldNames: {
      //     label: 'name',
      //     value: 'id',
      //   },
      //   options: classroomData,
      // },
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
      title: '带班教师',
      dataIndex: 'teacherId',
      valueType: 'select',
      hideInSearch: false,
      fieldProps: {
        fieldNames: {
          label: 'name',
          value: 'id',
        },
        options: teacherData,
      },
      render: (_, record) => [
        record?.teachers?.map((i: any) => {
          return `${i.user.name},`;
        }),
      ],
    },
    {
      title: '班级人数',
      dataIndex: 'currentStudentSize',
      hideInSearch: true,
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
            setTeacher(record);
          }}
        >
          设置教师
        </a>,
        <a
          key="list"
          onClick={() => {
            history.push(`/business/studentList/${record.id}`);
          }}
        >
          学生名单
        </a>,
      ],
    },
  ];
  const setTeacher = async (record: any) => {
    if (record?.school?.id) {
      allTeacher({ schoolId: record?.school?.id }).then((res: any) => {
        res.data.map((i: any) => {
          i.name = i.user.name;
          return i;
        });
        setTeacherData(res.data || []);
        setType('edit');
        setTitle('设置教师');
        setCurrentRow({
          ...record,
          teacherIds: record.teachers?.map((i: any) => i.id),
        });
        handleModalVisible(true);
      });
    }
  };

  const submitClass = async (value: any) => {
    try {
      const success = await handleClass(value);
      if (success) {
        message.success({
          content: Message.Edit,
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
        request={(params) => commonRequestList(classList, params)}
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
      <ClassForm
        title={title}
        values={currentRow || {}}
        visible={setModalVisible}
        onSubmit={async (value: any) => {
          submitClass(value);
        }}
        onCancel={() => {
          handleModalVisible(false);
        }}
        teacherData={teacherData}
      />
    </div>
  );
};

export default Classroom;
