import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  TreeSelect,
  message,
  Modal,
} from 'antd';
// import * as allIcons from '@ant-design/icons';
import { IconData } from '@/constant/icon.js';
import Tree from 'antd/lib/tree';
import useRequest from '@ahooksjs/use-request';

import { TYPE, SHOW, STATUS } from '@/constant/index';
import { menuList, addMenu, getMenu } from '@/services/api';
import { Message } from '@/constant/common';
// function getIconName(name: string) {
//   const sym = '-';
//   const f = name.substr(0, 1).toLocaleUpperCase();
//   if (name.indexOf(sym) == -1) {
//     // 无连接符
//     const l = name.substr(1, name.length);
//     return `${f}${l}`;
//   } else {
//     const tem = name.split(sym);
//     let str = '';
//     for (let i = 0; i < tem.length; i++) {
//       let tf = tem[i].substr(0, 1).toLocaleUpperCase();
//       const tl = tem[i].substr(1, tem[i].length);
//       str += `${tf}${tl}`;
//     }
//     return str;
//   }
// }

const Menu: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [title, setTitle] = useState('新增菜单');
  const [detail, setDetail]: any = useState({});
  // const [loading, setLoading] = useState(false);
  const [list, setData] = useState([]);

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
    form?.resetFields();
    form?.setFieldsValue(detail);
    // this.id = detail.id;
  };
  const onFinish = async (values: any) => {
    // console.log('Success:', values);
    try {
      const params: any = {};
      if (values.parent) {
        params.parentId = values.parent;
        delete values.parent;
      }
      if (detail.id) {
        params.id = detail.id;
      }
      const { status }: any = await addMenu(Object.assign(params, values));
      if (status == 200) {
        message.success(params.id ? Message.Edit : Message.New);
        run();
        formatForm();
      }
    } catch (error: any) {
      console.log('error.response', error.response);
      console.log(error.response?.data?.msg);
      message.error('');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const addHandle = () => {
    setTitle('新增菜单');
    formatForm();
  };
  const formatForm = () => {
    setDetail({});
    form?.resetFields();
    form.setFieldsValue({
      type: TYPE[0].value,
      show: SHOW[0].value,
      status: STATUS[0].value,
    });
  };
  const getList = () => {
    let { data } = useRequest(menuList);
    setData(data);
  };
  const deleteMenu = () => {
    try {
      Modal.confirm({
        title: '确定要进行删除操作吗',
        onOk() {
          console.log('ok');
          const { id } = detail;
          if (id) {
            getMenu('DELETE', { id }).then((res) => {
              console.log('res', res);
              const { status } = res;
              if (status == 200) {
                message.success(Message.Delete);
                run();
                formatForm();
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
  // let { data } = useRequest(menuList);

  const { loading, run, data } = useRequest(menuList, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.success) {
        console.log('sss', result, params);
      }
    },
  });

  useEffect(() => {
    run();
    addHandle();
  }, []);

  const [form] = Form.useForm();
  return (
    <>
      <Button type="primary" key="primary" onClick={addHandle}>
        新增菜单
      </Button>
      <Row className="menu">
        <Col span={10}>
          <Card title="菜单数据" bordered={false}>
            <Tree
              showLine
              defaultExpandAll
              onSelect={onSelect}
              onExpand={() => onExpand}
              // expandedKeys={expandedKeys}
              treeData={data?.data}
              fieldNames={{
                title: 'name',
                key: 'id',
                children: 'subMenus',
              }}
            />
          </Card>
        </Col>
        <Col span={14}>
          <Card title={title} bordered={false}></Card>
          <Form
            name="base"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item label="父级" name="parent" rules={[{ required: false }]}>
              <TreeSelect
                allowClear
                treeDefaultExpandAll
                placeholder="请选择父级"
                treeData={data?.data}
                fieldNames={{ label: 'name', value: 'id', children: 'subMenus' }}
              />
            </Form.Item>
            <Form.Item
              label="名称"
              name="name"
              rules={[{ required: true, message: '菜单名称不能为空' }]}
            >
              <Input placeholder="请输入菜单名称" />
            </Form.Item>
            <Form.Item
              label="编号"
              name="code"
              rules={[{ required: true, message: '菜单编号不能为空' }]}
            >
              <Input placeholder="请输入菜单编号" />
            </Form.Item>
            <Form.Item label="类型" name="type" rules={[{ required: true, message: '请选择类型' }]}>
              <Radio.Group>
                {TYPE.map((i) => {
                  return (
                    <Radio value={i.value} key={i.value}>
                      {i.label}
                    </Radio>
                  );
                })}
              </Radio.Group>
            </Form.Item>
            <Form.Item label="路由" name="path" rules={[{ required: false }]}>
              <Input placeholder="请输入路由" />
            </Form.Item>
            <Form.Item label="权限" name="authority" rules={[{ required: false }]}>
              <Input placeholder="请输入权限" />
            </Form.Item>
            <Form.Item label="图标" name="icon" rules={[{ required: false }]}>
              <Select placeholder="请选择图标">
                {IconData.map((i: string) => {
                  return (
                    <Select.Option value={i} key={i}>
                      {/* {allIcons[i]} */}
                      {/* allIcons[icon] || allIcons[''.concat(v4IconName, 'Outlined')]; */}
                      {/* const NewIcon = allIcons[icon] || allIcons[''.concat(v4IconName, 'Outlined')]; */}
                      {/* <Icon component={'setting'} /> */}
                      {/* <Icon type={getIconName(i) + 'Outlined'} /> */}
                      {/* {getIconName(i).concat('Outlined')} */}
                      {/* {Icon(getIconName(i))} */}
                      {/* {allIcons[i]} */}
                      {i}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="排序"
              name="seq"
              rules={[{ required: true, message: '菜单排序不能为空' }]}
            >
              <Input placeholder="请输入菜单排序" />
            </Form.Item>
            <Form.Item label="是否展示" name="show" rules={[{ required: true, message: '' }]}>
              <Radio.Group>
                {SHOW.map((i, j) => {
                  return (
                    <Radio value={i.value} key={j}>
                      {i.label}
                    </Radio>
                  );
                })}
              </Radio.Group>
            </Form.Item>
            <Form.Item label="状态" name="status" rules={[{ required: true, message: '' }]}>
              <Radio.Group>
                {STATUS.map((i) => {
                  return (
                    <Radio value={i.value} key={i.value}>
                      {i.label}
                    </Radio>
                  );
                })}
              </Radio.Group>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ marginRight: '20px' }}
              >
                提交
              </Button>
              {detail?.id ? (
                <Button danger onClick={deleteMenu}>
                  删除
                </Button>
              ) : null}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Menu;
