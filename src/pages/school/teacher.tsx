import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Tag } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProFormInstance } from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { commonRequestList } from '@/utils/index';
import { pagination } from '@/constant/index';
import { Message, TEACHER_TYPE } from '@/constant/common';

import { getTeacherList, allSchool, handleTeacher } from '@/services/school';
import TeacherForm from './components/TeacherForm';
import ChangePWD from './components/ChangePWD';

const Teacher: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow]: any = useState();
  const [setModalVisible, handleModalVisible] = useState<boolean>(false);
  const [title, setTitle] = useState('新增教师');
  const [type, setType] = useState('new');
  const [pwdVisible, pwdModalVisible] = useState<boolean>(false);

  const { loading } = useRequest(getTeacherList, {
    manual: true,
  });

  const { run: runSchool, data: schoolData } = useRequest(allSchool, {
    manual: true,
  });

  //

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
      title: '教师名称',
      dataIndex: 'teacherName',
      hideInSearch: false,
      render: (_, record) => <>{record?.user?.name}</>,
    },

    {
      title: '手机号',
      dataIndex: 'mobile',
      hideInSearch: false,
      render: (_, record) => <>{record?.user?.mobile}</>,
    },
    {
      title: '带班班级',
      dataIndex: 'classroom',
      hideInSearch: true,
      render: (_, record) => <>{record?.classroom?.name}</>,
    },
    {
      title: '状态',
      hideInSearch: true,
      dataIndex: 'status',
      // valueType: 'select',
      // valueEnum: TEACHER_TYPE,
      render: (_, record) => (
        <Tag color={record.status == 'INCUMBENT' ? 'green' : 'red'}>
          {TEACHER_TYPE[record.status]?.text}
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
            setTitle('编辑教师');
            setCurrentRow({
              ...record,
              schoolId: record.school.id,
              name: record.user.name,
              mobile: record.user.mobile,
            });
            handleModalVisible(true);
          }}
        >
          编辑
        </a>,
        <a
          key="password"
          onClick={() => {
            setType('password');
            setTitle('修改密码');
            setCurrentRow(record);
            pwdModalVisible(true);
          }}
        >
          修改密码
        </a>,
      ],
    },
  ];

  const submitTeacher = async (method: string, value: any) => {
    try {
      const success = await handleTeacher(method, value);
      if (success) {
        message.success({
          content: type == 'new' ? Message.New : Message.Edit,
        });
        handleModalVisible(false);
        setCurrentRow(undefined);
        if (actionRef.current) actionRef.current.reload();
      } else {
        console.log(success);
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
        request={(params) => commonRequestList(getTeacherList, params)}
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
                setTitle('新增教师');
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
      <TeacherForm
        type={type}
        title={title}
        values={currentRow || {}}
        visible={setModalVisible}
        onSubmit={async (value: any) => {
          submitTeacher(type == 'new' ? 'POST' : 'PATCH', value);
        }}
        onCancel={() => {
          handleModalVisible(false);
        }}
        schoolData={schoolData}
      />
      <ChangePWD
        title={title}
        values={currentRow || {}}
        visible={pwdVisible}
        onSubmit={async (values: any) => {
          const { id, pwd } = values;
          submitTeacher('PATCH', { id, pwd });
        }}
        onCancel={() => {
          pwdModalVisible(false);
        }}
      />
    </div>
  );
};

export default Teacher;
