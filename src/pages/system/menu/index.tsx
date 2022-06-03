import React, { useState, useMemo, useEffect, useRef } from 'react';
import { menuList } from '@/services/api';
import Tree, { DataNode } from 'antd/lib/tree';
import useRequest from '@ahooksjs/use-request';
import { Button, Card, Col, Form, Input, Radio, Row } from 'antd';
import { TreeNode } from 'antd/lib/tree-select';
import Icon from '@ant-design/icons';
import { ProFormInstance } from '@ant-design/pro-form';

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
    form?.setFieldsValue(detail);
    // this.detail = detail;
    // this.id = detail.id;
    // this.type = 'edit';
    // this.title = '编辑菜单';
    // const {
    //   id: detailid,
    //   parent,
    //   authority,
    //   name,
    //   code,
    //   path,
    //   type,
    //   icon,
    //   seq,
    //   isShow,
    //   isDelete,
    //   status,
    // } = detail;
  };
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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

        {/* <a-icon slot="icon" type="carry-out" /> */}
        {/* {treeData?.map((item: any) => {
            return (
              <TreeNode key={item.id} value={item.title} treeData=""> */}
        {/* <Icon slot="icon" type="carry-out" />
                <span slot="title" style="{color: #1890ff}">
                  {item.name}
                </span>
                {item.subMenus.map((i: any) => {
                  return (
                    <TreeNode key={i.id} title={i.name} value={''}>
                      <Icon slot="icon" type="carry-out" />
                      {i.subMenus.map((q: any) => {
                        return (
                          <TreeNode key={q.id} title={q.name} value={''}>
                            <Icon slot="icon" type="carry-out" />
                          </TreeNode>
                        );
                      })}
                    </TreeNode>
                  );
                })} */}
        {/* </TreeNode> */}
        {/* ); */}
        {/* })} */}
        {/* </Tree> */}
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
          <Form.Item label="父级" name="username" rules={[{ required: false }]}>
            <Input placeholder="请选择菜单父级" />
          </Form.Item>
          <Form.Item label="名称" name="username" rules={[{ required: true, message: '' }]}>
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item label="编号" name="code" rules={[{ required: true, message: '' }]}>
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item label="类型" name="code" rules={[{ required: true, message: '' }]}>
            <Radio.Group>
              <Radio value="0">菜单</Radio>
              <Radio value="1">权限</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="路由" name="code" rules={[{ required: false }]}>
            <Input placeholder="请输入路由" />
          </Form.Item>
          <Form.Item label="权限" name="code" rules={[{ required: false }]}>
            <Input placeholder="请输入权限" />
          </Form.Item>
          <Form.Item label="图标" name="code" rules={[{ required: false }]}></Form.Item>
          <Form.Item label="排序" name="code" rules={[{ required: true, message: '' }]}>
            <Input placeholder="请输入菜单排序" />
          </Form.Item>
          <Form.Item label="是否展示" name="code" rules={[{ required: true, message: '' }]}>
            <Radio.Group>
              <Radio value="0">展示</Radio>
              <Radio value="1">不展示</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="状态" name="code" rules={[{ required: true, message: '' }]}>
            <Radio.Group>
              <Radio value="0">有效</Radio>
              <Radio value="1">无效</Radio>
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
