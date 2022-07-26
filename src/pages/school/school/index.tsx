import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal, Tag } from 'antd';
import React, { useState, useRef, Fragment, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProFormInstance } from '@ant-design/pro-form';

import { commonRequestList } from '@/utils/index';
import { pagination } from '@/constant/index';
import { Message, STATUS_SCHOOL, SCHOOL_TYPE, FRANCH_TYPE } from '@/constant/common';
import { useRequest } from 'umi';

import { getList, handleSchool, changePWD } from '@/services/school';
import AddSchoolForm from '../components/AddSchoolForm';
import SchoolDetail from '../components/SchoolDetail';
import ChangePWD from '../components/ChangePWD';
import { getAgent } from '@/services/agent';
import { areaList, salesList } from '@/services/common';

const School: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow]: any = useState();
  const [setModalVisible, handleModalVisible] = useState<boolean>(false);
  const [title, setTitle] = useState('新增');
  const [type, setType] = useState('new');
  const [areaData, setAreaData] = useState<any>([]);
  const [detailVisible, handleDetailVisible] = useState<boolean>(false);
  const [pwdVisible, handlePWDVisible] = useState<boolean>(false);

  const { run, loading } = useRequest(getList, {
    manual: true,
  });
  const { run: runAgent, data: agentData } = useRequest(getAgent, {
    manual: true,
  });
  // const { run: runArea, data }: any = useRequest(areaList, {
  //   manual: true,
  // });
  const getAreaList = (id?: string | number) => {
    //
    areaList(id).then((res) => {
      setAreaData(res);
    });
  };
  // agentData

  const { run: runSales, data: salesData } = useRequest(salesList, {
    manual: true,
  });
  useEffect(() => {
    runAgent({ status: 'ENABLED' });
    // runArea();
    getAreaList();
    runSales();
  }, []);

  const deleteSchool = (detail: any) => {
    try {
      Modal.confirm({
        title: '确定要进行删除操作吗',
        onOk() {
          const { id } = detail;
          if (id) {
            handleSchool('DELETE', {
              id,
            }).then((res: any) => {
              const { status } = res;
              if (status == 200) {
                message.success(Message.Options);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
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

  // 审批
  const handleCheck = (id: any) => {
    console.log(id);
    try {
      Modal.confirm({
        title: '确定要进行审批操作吗',
        onOk() {
          if (id) {
            handleSchool('PATCH', {
              id,
              status: 'NORMAL',
            }).then((res: any) => {
              const { status } = res;
              if (status == 200) {
                message.success(Message.Options);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
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

  const submitSchool = async (value: any, method: string) => {
    try {
      const params =
        type == 'new'
          ? value
          : { ...value, ...{ status: method == 'POST' ? 'PENDING' : 'NORMAL' } };
      const success = await handleSchool(method, params);
      if (success) {
        message.success({
          content: type == 'new' ? Message.New : Message.Edit,
        });
        handleModalVisible(false);
        setCurrentRow(undefined);
        if (actionRef.current) {
          //手动
          actionRef.current.reload();
        }
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handlePWD = (values: any) => {
    console.log(values);
    const { id, pwd }: any = values;
    try {
      changePWD({
        id,
        pwd,
      }).then((res: any) => {
        const { status } = res;
        if (status == 200) {
          message.success(Message.Options);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const columns: ProColumns[] = [
    {
      title: '园所编号',
      dataIndex: 'code',
      hideInSearch: true,
    },
    {
      title: '园所名称',
      dataIndex: 'name',
      hideInSearch: false,
    },
    {
      title: '园所类型',
      dataIndex: 'type',
      hideInSearch: false,
      valueType: 'select',
      valueEnum: SCHOOL_TYPE,
      render: (_, record) => <>{SCHOOL_TYPE[record?.type].text}</>,
    },
    {
      title: '所在省市区',
      dataIndex: 'area',
      hideInSearch: false,
      // areaData
      render: (_, record) => (
        <>
          {record?.area?.parent?.parent?.name ? `${record?.area?.parent?.parent?.name}-` : ''}
          {`${record?.area?.parent?.name}-${record?.area?.name}`}
        </>
      ),
    },
    {
      title: '业务员',
      dataIndex: 'salesId',
      valueType: 'select',
      hideInSearch: false,
      request: async () => salesData,
      fieldProps: {
        fieldNames: {
          label: 'name',
          value: 'id',
        },
      },
      render: (_, record) => <>{record?.sales?.name}</>,
    },
    {
      title: '代理模式',
      dataIndex: 'franchiseType',
      hideInSearch: false,
      valueType: 'select',
      valueEnum: FRANCH_TYPE,
      render: (_, record) => <>{FRANCH_TYPE[record?.franchiseType].text}</>,
    },
    {
      title: '代理商',
      dataIndex: 'agent',
      hideInSearch: false,
      valueType: 'select',
      request: async () => agentData,
      fieldProps: {
        fieldNames: {
          label: 'companyName',
          value: 'id',
        },
      },
      render: (_, record: any) => (
        <Fragment>
          {record?.agent
            ? `${record?.agent?.abbr ? record?.agent?.abbr : ''} (${record?.agent?.companyName})`
            : '-'}
        </Fragment>
      ),
    },
    {
      title: '状态',
      hideInSearch: true,
      dataIndex: 'status',
      valueEnum: {
        STATUS_SCHOOL,
      },
      render: (_, record) => (
        <Tag color={record.status == 'NORMAL' ? 'green' : 'red'}>
          {STATUS_SCHOOL[record.status].text}
        </Tag>
      ),
    },
    {
      title: '园所管理员账号',
      dataIndex: 'lastLoginTime',
      hideInSearch: true,
      render: (_, record) => <>{record?.administrator?.login}</>,
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
              id: record.id,
              salesId: record.sales.id,
              areaId: record.area.id,
              agentId: record.agent?.id || null,
            });
            handleModalVisible(true);
          }}
        >
          编辑
        </a>,
        <a
          key="check"
          onClick={() => {
            setType('check');
            setTitle('审批');
            setCurrentRow({
              ...record,
              id: record.id,
              salesId: record.sales.id,
              areaId: record.area.id,
              agentId: record.agent?.id || null,
            });
            handleDetailVisible(true);
          }}
        >
          审批
        </a>,
        <a
          key="details"
          onClick={() => {
            //
            setType('details');
            setTitle('详情');
            setCurrentRow({
              ...record,
              id: record.id,
              salesId: record.sales.id,
              areaId: record.area.id,
              agentId: record.agent?.id || null,
            });
            handleDetailVisible(true);
          }}
        >
          详情
        </a>,
        <a
          key="delete"
          onClick={() => {
            deleteSchool(record);
          }}
        >
          删除
        </a>,
        <a
          key="password"
          onClick={() => {
            //
            setTitle('修改密码');
            setCurrentRow(record);
            handlePWDVisible(true);
          }}
        >
          修改密码
        </a>,
      ],
    },
  ];

  return (
    <div>
      <ProTable<any, API.PageParams>
        scroll={{ x: 1600 }}
        rowKey="id"
        loading={loading}
        search={{
          labelWidth: 120,
        }}
        request={(params) => commonRequestList(getList, params)}
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
      <AddSchoolForm
        type={type}
        title={title}
        values={currentRow || {}}
        visible={setModalVisible}
        onSubmit={async (value) => {
          console.log('onSubmit', currentRow, value);
          const method = type == 'new' ? 'POST' : 'PATCH';
          submitSchool(value, method);
        }}
        onCancel={() => {
          handleModalVisible(false);
        }}
        agentData={agentData}
        salesData={salesData}
        areaData={areaData}
      />
      <SchoolDetail
        type={type}
        title={title}
        values={currentRow || {}}
        visible={detailVisible}
        onSubmit={async (id: any) => {
          console.log('onSubmit', id);
          // type == check
          if (type == 'check') {
            handleCheck(id);
          } else {
            //
          }

          handleDetailVisible(false);
        }}
        onCancel={() => {
          handleDetailVisible(false);
        }}
        agentData={agentData}
        salesData={salesData}
      />
      <ChangePWD
        title={title}
        values={currentRow || {}}
        visible={pwdVisible}
        onSubmit={async (values: any) => {
          console.log('onSubmit', values);
          handlePWD(values);
        }}
        onCancel={() => {
          handlePWDVisible(false);
        }}
      />
    </div>
  );
};

export default School;
