import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProFormInstance } from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { commonRequestList } from '@/utils/index';
import { pagination } from '@/constant/index';
import { Message } from '@/constant/common';
import { getSuspenseList, allSchool, handleSuspense, allClassroom } from '@/services/school';
import SuspensionForm from './components/SuspensionForm';

const Suspension: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow]: any = useState();
  const [setModalVisible, handleModalVisible] = useState<boolean>(false);
  const [title, setTitle] = useState('新增');
  const [type, setType] = useState('new');
  const { loading } = useRequest(getSuspenseList, {
    manual: true,
  });
  const { run: runSchool, data: schoolData } = useRequest(allSchool, {
    manual: true,
  });
  const { run: runClassroom, data: classroomData } = useRequest(allClassroom, {
    manual: true,
  });
  const [classData, setClassData] = useState([]);

  const getClassroom = async (id: string | number) => {
    allClassroom({ schoolId: id }).then((res) => {
      setClassData(res.data || []);
    });
  };

  useEffect(() => {
    runSchool();
    runClassroom();
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
        onChange: (e: string) => {
          if (e) {
            getClassroom(e);
          } else {
            setClassData([]);
          }
        },
      },
      render: (_, record) => <>{record?.school?.name}</>,
    },
    {
      title: '停课对象',
      dataIndex: 'classroomId',
      valueType: 'select',
      fieldProps: {
        fieldNames: {
          label: 'name',
          value: 'id',
        },
        options: classroomData,
      },
      hideInSearch: false,
      render: (_, record) => (
        <>
          {record?.classrooms?.map((i: any) => {
            return `${i.name},`;
          })}
        </>
      ),
    },
    {
      title: '停课原因',
      dataIndex: 'reason',
      hideInSearch: false,
    },
    {
      title: '停课开始日期',
      dataIndex: 'startDate',
      hideInSearch: true,
    },
    {
      title: '停课结束日期',
      dataIndex: 'endDate',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 80,
      render: (_, record) => [
        <a
          key="delete"
          onClick={() => {
            deleteSuspense('DELETE', record);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  const deleteSuspense = (method: string, detail: any) => {
    try {
      Modal.confirm({
        title: `确定要进行删除操作吗`,
        onOk() {
          const { id } = detail;
          if (id) {
            const params = status ? { id, status } : { id };
            handleSuspense(method, params).then((res: any) => {
              if (res && res.status && res.status == 200) {
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
  const submitSuspense = async (method: string, value: any) => {
    try {
      const success = await handleSuspense(method, value);
      if (success) {
        message.success({
          content: Message.New,
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
        rowKey="id"
        loading={loading}
        search={{
          labelWidth: 120,
        }}
        request={(params) => commonRequestList(getSuspenseList, params)}
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
                setTitle('新增停课');
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
      <SuspensionForm
        type={type}
        title={title}
        values={currentRow || {}}
        visible={setModalVisible}
        onSubmit={async (value: any) => {
          const [startDate, endDate] = value.dateRange;
          const { schoolId, classroomIds, reason } = value;
          const options = { startDate, endDate, schoolId, classroomIds, reason };
          console.log(options);
          submitSuspense('POST', options);
          // submitNotice(type == 'new' ? 'POST' : 'PATCH', value);
        }}
        onCancel={() => {
          handleModalVisible(false);
        }}
        schoolData={schoolData}
      />
    </div>
  );
};

export default Suspension;
