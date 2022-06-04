import React, { useState, useMemo, useEffect, useRef } from 'react';
import { menuList } from '@/services/api';
import Tree from 'antd/lib/tree';
import useRequest from '@ahooksjs/use-request';
import { Button, Card, Col, Form, Input, Radio, Row } from 'antd';
import Icon from '@ant-design/icons';

const Menu: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [title, setTitle] = useState('新增菜单');
  const [defaultExpandAll] = useState(true);
  const [detail, setDetail] = useState({});

  const onExpand = (newExpandedKeys: string[]) => {
    console.log(newExpandedKeys);
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const onSelect = (e: any) => {
    console.log('onSelect', e);
    getDetail(e[0], data?.data);
  };
  const getDetail = (id: number, data: []) => {
    let detail = {};
    data.filter((item: any) => {
      if (item.id == id) {
        detail = item;
        return;
      }
      item.subMenus?.filter((i: any) => {
        if (i.id == id) {
          detail = i;
          return;
        }
        i.subMenus?.filter((j: any) => {
          if (j.id == id) {
            detail = j;
            return detail;
          }
        });
      });
    });
    console.log(detail);
    setDetail(detail);
    setTitle('编辑菜单');
    form?.setFieldsValue(detail);
    // this.id = detail.id;
  };
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const addHandle = () => {
    setTitle('新增菜单');
    form?.resetFields();
  };
  const treeData = [
    {
      name: 'name',
      id: 1,
      subMenus: [
        {
          name: 'name2',
          id: 2,
        },
      ],
    },
  ];

  let { data } = useRequest(menuList);

  useEffect(() => {}, []);
  const [form] = Form.useForm();
  return (
    <Row className="menu">
      <Col span={12}>
        <Button type="primary" key="primary" onClick={addHandle}>
          新增菜单
        </Button>
        <Card title="菜单数据" bordered={false}>
          <Tree
            onSelect={onSelect}
            onExpand={() => onExpand}
            // expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            defaultExpandAll={defaultExpandAll}
            treeData={data?.data}
            blockNode={defaultExpandAll}
            fieldNames={{
              title: 'name',
              key: 'id',
              children: 'subMenus',
            }}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card title={title} bordered={false}></Card>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="父级" name="parentId" rules={[{ required: false }]}>
            <Input placeholder="请选择菜单父级" />
          </Form.Item>
          <Form.Item label="名称" name="name" rules={[{ required: true, message: '' }]}>
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item label="编号" name="code" rules={[{ required: true, message: '' }]}>
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item label="类型" name="type" rules={[{ required: true, message: '' }]}>
            <Radio.Group>
              <Radio value="MENU">菜单</Radio>
              <Radio value="ACTION">权限</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="路由" name="path" rules={[{ required: false }]}>
            <Input placeholder="请输入路由" />
          </Form.Item>
          <Form.Item label="权限" name="authority" rules={[{ required: false }]}>
            <Input placeholder="请输入权限" />
          </Form.Item>
          <Form.Item label="图标" name="icon" rules={[{ required: false }]}></Form.Item>
          <Form.Item label="排序" name="seq" rules={[{ required: true, message: '' }]}>
            <Input placeholder="请输入菜单排序" />
          </Form.Item>
          <Form.Item label="是否展示" name="show" rules={[{ required: true, message: '' }]}>
            <Radio.Group>
              <Radio value={true}>展示</Radio>
              <Radio value={false}>不展示</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="状态" name="status" rules={[{ required: true, message: '' }]}>
            <Radio.Group>
              <Radio value="ENABLED">有效</Radio>
              <Radio value="DISABLED">无效</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Menu;
