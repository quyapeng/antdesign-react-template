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
const fieldNames = {
  title: 'name',
  key: 'id',
  children: 'subMenus',
};
const UpdateForm: React.FC<UpdateFormProps> = ({ title, visible, onSubmit, onCancel, values }) => {
  useEffect(() => {
    // formRef?.current?.setFieldsValue(values);
    console.log(values?.menus?.map((i: any) => i.id));
    setCheckedKeys(values?.menus?.map((i: any) => i.id));
  }, [visible]);
  const formRef = useRef<ProFormInstance>();
  const treeData: [any] = [
    {
      name: '系统管理',
      id: 18,
      subMenus: [
        {
          name: '菜单管理',
          id: 2,
          subMenus: [
            { name: '0-0-0-0', id: 3 },
            { name: '0-0-0-1', id: 4 },
            { name: '0-0-0-2', id: 5 },
          ],
        },
        {
          name: '角色管理',
          id: 6,
        },
      ],
    },
  ];
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  const onCheck = (checkedKeysValue: any, e: any, event: any) => {
    console.log('onCheck', checkedKeysValue.checked);
    setCheckedKeys(checkedKeysValue.checked);
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
        checkStrictly
        defaultExpandAll
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
        fieldNames={fieldNames}
      />
    </ModalForm>
  );
};

export default UpdateForm;
