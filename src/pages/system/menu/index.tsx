import React, { useState, useMemo, useEffect } from 'react';
import { menuList } from '@/services/api';
import Tree, { DataNode } from 'antd/lib/tree';
import useRequest from '@ahooksjs/use-request';

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
      title: 'name',
      key: 1,
      children: [],
    },
  ];
  let { data } = useRequest(menuList);
  console.log(data);

  useEffect(() => {}, []);

  return (
    <div>
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        // autoExpandParent={autoExpandParent}
        defaultExpandAll={defaultExpandAll}
        treeData={data}
        fieldNames={{
          title: 'name',
          key: 'id',
          children: 'subMenus',
        }}
      />
    </div>
  );
};

export default Menu;
