import React, { useEffect, useRef, useState } from 'react';
import { ModalForm, ProFormInstance } from '@ant-design/pro-form';
import Tree, { DataNode } from 'antd/lib/tree';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
};
// & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  title: string;
  visible: boolean;
  values: any;
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;

  // values: Partial<API.RuleListItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = ({ title, visible, onSubmit, onCancel, values }) => {
  useEffect(() => {
    // formRef?.current?.setFieldsValue(values);
    console.log(values);
  }, [visible]);
  const formRef = useRef<ProFormInstance>();
  const treeData: DataNode[] = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0' },
            { title: '0-0-0-1', key: '0-0-0-1' },
            { title: '0-0-0-2', key: '0-0-0-2' },
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0' },
            { title: '0-0-1-1', key: '0-0-1-1' },
            { title: '0-0-1-2', key: '0-0-1-2' },
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0' },
        { title: '0-1-0-1', key: '0-1-0-1' },
        { title: '0-1-0-2', key: '0-1-0-2' },
      ],
    },
    {
      title: '0-2',
      key: '0-2',
    },
  ];
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['0-0-0', '0-0-1']);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['0-0-0']);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: React.Key[]) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <ModalForm
      title={title}
      width="500px"
      formRef={formRef}
      visible={visible}
      onVisibleChange={() => {}}
      {...{
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      }}
      layout="horizontal"
      onFinish={async (value) => {
        onSubmit(value);
      }}
      modalProps={{
        onCancel: () => onCancel(),
      }}
    >
      <Tree
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        // onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
      />
    </ModalForm>
  );
};

export default UpdateForm;
