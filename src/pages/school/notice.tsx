import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Tag } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProFormInstance } from '@ant-design/pro-form';
import { useRequest } from 'umi';
import { commonRequestList } from '@/utils/index';
import { pagination } from '@/constant/index';
import { Message, NOTICE_TYPE, TEACHER_TYPE } from '@/constant/common';

import { getNoticeList, allSchool, handleNotice } from '@/services/school';
import NoticeForm from './components/NoticeForm';

const Notice: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow]: any = useState();
  const [setModalVisible, handleModalVisible] = useState<boolean>(false);
  const [title, setTitle] = useState('新增教师');
  const [type, setType] = useState('new');

  const { run, loading } = useRequest(getNoticeList, {
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
      title: '通知对象',
      dataIndex: 'teacherName',
      hideInSearch: false,
      render: (_, record) => <>{record?.user?.name}</>,
    },

    {
      title: '通知主题',
      dataIndex: 'title',
      hideInSearch: false,
    },
    {
      title: '操作人',
      dataIndex: 'createdBy',
      hideInSearch: true,
      render: (_, record) => <>{record?.createdBy?.name}</>,
    },
    {
      title: '发布时间',
      dataIndex: 'classroom',
      hideInSearch: true,
      render: (_, record) => <>{record?.classroom?.name}</>,
    },
    {
      title: '发布状态',
      hideInSearch: true,
      dataIndex: 'status',
      // valueType: 'select',
      // valueEnum: TEACHER_TYPE,
      render: (_, record) => (
        <Tag color={record.status == 'PUBLISHED' ? 'green' : 'red'}>
          {NOTICE_TYPE[record.status]?.text}
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
            setTitle('编辑通知');
            setCurrentRow({
              ...record,
            });
            handleModalVisible(true);
          }}
        >
          编辑
        </a>,
        <a
          key="publish"
          onClick={() => {
            setType('publish');
            setTitle('发布');
            deleteNotice(record, 'PATCH');
          }}
        >
          {/* 发布 | 撤回 */}
          {record.status == 'DRAFT' ? '发布' : '撤回'}
        </a>,
        <a
          key="delete"
          onClick={() => {
            deleteNotice(record, 'DELETE');
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  const deleteNotice = (detail: any, method: string) => {
    const opt = {
      DELETE: '删除',
      DRAFT: '发布',
      PUBLISHED: '撤回',
    };
    let status = '';
    if (method !== 'DELETE') {
      status = detail.status == 'DRAFT' ? 'PUBLISHED' : 'DRAFT';
    }
    console.log(opt[method]);
    try {
      Modal.confirm({
        title: `确定要进行${opt[method]}操作吗`,
        onOk() {
          console.log('ok');
          const { id } = detail;
          if (id) {
            const params = status ? { id, status } : { id };
            handleNotice(method, params).then((res) => {
              if (res && res.status && res.status == 200) {
                message.success(`${opt[method]}成功`);
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
  const submitNotice = async (method: string, value: any) => {
    try {
      const success = await handleNotice(method, value);
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
        request={(params) => commonRequestList(getNoticeList, params)}
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
                setTitle('新增通知');
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
      <NoticeForm
        type={type}
        title={title}
        values={currentRow || {}}
        visible={setModalVisible}
        onSubmit={async (value: any) => {
          console.log(value);
          submitNotice(type == 'new' ? 'POST' : 'PATCH', value);
        }}
        onCancel={() => {
          handleModalVisible(false);
        }}
        schoolData={schoolData}
      />
    </div>
  );
};

export default Notice;
