import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Tag } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProFormInstance } from '@ant-design/pro-form';
import { useRequest, history } from 'umi';
import { commonRequestList } from '@/utils/index';
import { pagination } from '@/constant/index';
import {
  Message,
  STATUS,
  ACTIVED_STATUS,
  STUDENT_TYPE,
  STUDENT_STATUS,
  DIS_STYLE,
} from '@/constant/common';
import { productAll } from '@/services/product';
import { getStudentList, allSchool, handleStudent } from '@/services/school';
import StudentForm from './components/StudentForm';
import EnterClassroom from './components/EnterClassroom';

const Student: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow]: any = useState();
  const [setModalVisible, handleModalVisible] = useState<boolean>(false);
  const [enterModalVisible, handleEnterVisible] = useState<boolean>(false);
  const [title, setTitle] = useState('新增');
  const [type, setType] = useState('new');

  const { loading } = useRequest(getStudentList, {
    manual: true,
  });

  const { run: runSchool, data: schoolData } = useRequest(allSchool, {
    manual: true,
  });
  const { run: runProduct, data: productData } = useRequest(productAll, {
    manual: true,
  });

  //

  useEffect(() => {
    runSchool();
    runProduct();
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
      title: '学生姓名',
      dataIndex: 'name',
      hideInSearch: false,
      render: (_, record) => <>{record?.user?.name}</>,
    },

    {
      title: '家长手机号',
      dataIndex: 'parents',
      hideInSearch: true,
      render: (_, record) => [
        record?.user?.parents?.map((i: any) => {
          return i.mobile;
        }),
      ],
    },
    {
      title: '所在班级',
      dataIndex: 'classroomId',
      hideInSearch: true,
      render: (_, record) => <>{record?.classroom?.name}</>,
    },
    {
      title: '课程分类',
      dataIndex: 'courseCategoryId',
      hideInSearch: true,
      render: (_, record) => <>{record?.classroom?.courseCategory?.name}</>,
    },
    {
      title: '学生类型',
      dataIndex: 'type',
      hideInSearch: true,
      render: (_, record) => <>{STUDENT_TYPE[record?.type].text}</>,
    },
    {
      title: '就读状态',
      dataIndex: 'status',
      hideInSearch: true,
      render: (_, record) => <>{STUDENT_STATUS[record?.status].text}</>,
    },
    {
      title: '激活状态',
      hideInSearch: false,
      dataIndex: 'actived',
      valueType: 'select',
      valueEnum: STATUS,
      render: (_, record) => (
        <Tag color={record.status ? 'green' : 'red'}>
          {ACTIVED_STATUS[record.actived ? 1 : 0]?.text}
        </Tag>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 260,
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            setType('edit');
            setTitle('编辑');
            setCurrentRow({
              ...record,
              schoolId: record.school.id,
              name: record.user.name,
              sex: record.user.sex,
              birthday: record.user.birthday,
            });
            handleModalVisible(true);
          }}
        >
          编辑
        </a>,
        <a
          key="renew"
          onClick={() => {
            history.push(`/business/order/${record.id}`);
          }}
        >
          续约
        </a>,
        <a
          key="enter"
          onClick={() => {
            if (record.type == 'GRADUATE') return;
            setType('enter');
            setTitle('进班');
            setCurrentRow({
              ...record,
              classroomId: record?.classroom?.id || null,
            });
            handleEnterVisible(true);
          }}
          style={record.type == 'GRADUATE' ? DIS_STYLE : {}}
        >
          进班
        </a>,
        <a
          key="check"
          onClick={() => {
            history.push(`/business/check/${record.id}`);
          }}
        >
          出缺勤
        </a>,
        <a
          key="delete"
          onClick={() => {
            if (record.actived) return;
            deleteStudent(record);
          }}
          style={record.actived ? DIS_STYLE : {}}
        >
          删除
        </a>,
      ],
    },
  ];
  const deleteStudent = (detail: any) => {
    try {
      Modal.confirm({
        title: '确定要进行删除操作吗',
        onOk() {
          console.log('ok');
          const { id } = detail;
          if (id) {
            handleStudent('DELETE', { id }).then((res) => {
              console.log('res', res);
              if (res?.status == 200) {
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

  const submitStudent = async (method: string, value: any) => {
    console.log('value', value, method);
    try {
      const success = await handleStudent(method, value);
      if (success) {
        message.success({
          content: type == 'new' ? Message.New : Message.Edit,
        });
        handleModalVisible(false);
        handleEnterVisible(false);
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
        scroll={{ x: 1200 }}
        rowKey="id"
        loading={loading}
        search={{
          labelWidth: 120,
        }}
        request={(params) => commonRequestList(getStudentList, params)}
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
      <StudentForm
        type={type}
        title={title}
        values={currentRow || {}}
        visible={setModalVisible}
        onSubmit={async (value: any) => {
          submitStudent(type == 'new' ? 'POST' : 'PATCH', value);
        }}
        onCancel={() => {
          handleModalVisible(false);
        }}
        schoolData={schoolData}
        productData={productData}
      />
      <EnterClassroom
        title={title}
        values={currentRow || {}}
        visible={enterModalVisible}
        onSubmit={async (value: any) => {
          submitStudent('PATCH', value);
        }}
        onCancel={() => {
          handleEnterVisible(false);
        }}
      />
    </div>
  );
};

export default Student;
