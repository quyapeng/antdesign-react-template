import React, { useState, useMemo, useEffect } from 'react';
import { menuList } from '@/services/api';
import Tree, { DataNode } from 'antd/lib/tree';
import useRequest from '@ahooksjs/use-request';
import { Col, Row } from 'antd';
import { TreeNode } from 'antd/lib/tree-select';
import Icon from '@ant-design/icons';

const Menu: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [defaultExpandAll] = useState(true);

  const onExpand = (newExpandedKeys: string[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
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
  console.log('data', data);

  useEffect(() => {}, []);

  return (
    <Row>
      <Col span={12}>
        <Tree
          onExpand={() => onExpand}
          expandedKeys={expandedKeys}
          // autoExpandParent={autoExpandParent}
          defaultExpandAll={defaultExpandAll}
          treeData={data}
          blockNode={defaultExpandAll}
          fieldNames={{
            title: 'name',
            key: 'id',
            children: 'subMenus',
          }}
        >
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
          );
          {/* })} */}
        </Tree>
      </Col>
      <Col span={12}>
        <form action="#">form</form>
      </Col>
    </Row>
  );
};

export default Menu;
