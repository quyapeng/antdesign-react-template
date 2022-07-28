import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ProFormInstance } from '@ant-design/pro-form';
import { useRequest, useParams } from 'umi';
import { pagination } from '@/constant/index';
import { Message, DIS_STYLE, ORDER_STATUS_EUM } from '@/constant/common';
import { productAll } from '@/services/product';
import { orderById, handleOrder } from '@/services/school';
import LogModal from './components/LogModal';
import OrderForm from './components/OrderForm';

const Student: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow]: any = useState();
  const [setModalVisible, handleModalVisible] = useState<boolean>(false);
  const [logModalVisible, setLogModalVisible] = useState<boolean>(false);
  const [title, setTitle] = useState('新增');
  const [type, setType] = useState('new');

  const { run, loading, data } = useRequest(orderById, {
    manual: true,
  });

  const { run: runProduct, data: productData } = useRequest(productAll, {
    manual: true,
  });

  //
  const params: any = useParams();
  useEffect(() => {
    run({ studentId: params.id });
    runProduct();
  }, [params]);

  const columns: ProColumns[] = [
    {
      title: '园所名称',
      dataIndex: 'schoolId',
      hideInSearch: true,
      render: (_, record) => <>{record?.student?.school?.name}</>,
    },
    {
      title: '学生姓名',
      dataIndex: 'name',
      hideInSearch: true,
      render: (_, record) => <>{record?.student?.user?.name}</>,
    },

    {
      title: '课程产品',
      dataIndex: '',
      hideInSearch: true,
      render: (_, record) => <>{record?.product?.name}</>,
    },
    {
      title: '合同状态',
      dataIndex: 'status',
      valueType: 'select',
      hideInSearch: false,
      valueEnum: ORDER_STATUS_EUM,
      render: (_, record) => <>{ORDER_STATUS_EUM[record?.status].text}</>,
    },
    {
      title: '开始时间',
      dataIndex: 'startDate',
      hideInSearch: true,
      render: (_, record) => <>{record?.startDate}</>,
    },
    {
      title: '结束时间',
      dataIndex: 'endDate',
      hideInSearch: true,
      render: (_, record) => <>{record?.endDate}</>,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 210,
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            setType('edit');
            setTitle('编辑');
            setCurrentRow({
              ...record,
              orderStartDate: record.startDate,
              productId: record.product.id,
            });
            handleModalVisible(true);
          }}
          style={record.status == 'PENDING' ? {} : DIS_STYLE}
        >
          编辑
        </a>,
        // 仅合同状态为等待 or 执行时可用
        <a
          key="renew"
          onClick={() => {}}
          style={record.status == 'PENDING' || record.status == 'NORMAL' ? DIS_STYLE : {}}
        >
          退课
        </a>,

        <a
          key="delete"
          onClick={() => {
            deleteOrder(record);
          }}
          style={record.status == 'PENDING' ? {} : DIS_STYLE}
        >
          删除
        </a>,

        <a
          key="log"
          onClick={() => {
            // extras
            setType('log');
            setTitle('延期明细');
            setCurrentRow({
              ...record,
            });
            setLogModalVisible(true);
          }}
        >
          延期明细
        </a>,
      ],
    },
  ];

  const deleteOrder = (detail: any) => {
    try {
      Modal.confirm({
        title: '确定要进行删除操作吗',
        onOk() {
          const { id } = detail;
          if (id) {
            handleOrder('DELETE', {
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
  const submitOrder = async (method: string, value: any) => {
    console.log('value', value, method);
    try {
      const success = await handleOrder(method, value);
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
        rowKey="id"
        loading={loading}
        search={{
          labelWidth: 120,
        }}
        // request={() => request(orderById, { id: params.id })}
        columns={columns}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: pagination.size,
        }}
        dataSource={data}
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
      <OrderForm
        type={type}
        title={title}
        values={currentRow || {}}
        visible={setModalVisible}
        onSubmit={async (value: any) => {
          value.studentId = params.id;
          submitOrder(type == 'new' ? 'POST' : 'PATCH', value);
        }}
        onCancel={() => {
          handleModalVisible(false);
        }}
        productData={productData}
      />
      <LogModal
        type={type}
        title={title}
        values={currentRow || {}}
        visible={logModalVisible}
        onSubmit={async () => {
          setLogModalVisible(false);
          setCurrentRow({});
        }}
        onCancel={() => {
          setLogModalVisible(false);
        }}
      />
    </div>
  );
};

export default Student;
