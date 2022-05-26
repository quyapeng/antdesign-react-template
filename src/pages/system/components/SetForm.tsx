import React, { useEffect, useRef, useState } from 'react';
import { ModalForm, ProFormInstance } from '@ant-design/pro-form';
import Tree, { DataNode } from 'antd/lib/tree';
import { formatMenu } from '@/utils/index';

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
  menu: [];
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: ([]) => Promise<void>;

  // values: Partial<API.RuleListItem>;
};
const fieldNames = {
  title: 'name',
  key: 'id',
  children: 'subMenus',
};

const UpdateForm: React.FC<UpdateFormProps> = ({
  title,
  visible,
  onSubmit,
  onCancel,
  values,
  menu,
}) => {
  useEffect(() => {
    // formRef?.current?.setFieldsValue(values);
    console.log(values?.menus?.map((i: any) => i.id));
    setCheckedKeys(values?.menus?.map((i: any) => i.id));
  }, [visible]);
  const formRef = useRef<ProFormInstance>();

  const [checkedKeys, setCheckedKeys] = useState<[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  const onCheck = (checkedKeysValue: any, e: any, event: any) => {
    console.log('onCheck', checkedKeysValue.checked);
    setCheckedKeys(checkedKeysValue.checked);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };
  const formatList = (list: any) => {
    let menu: any = [];
    if (list && list.length > 0) {
      list.filter((i: any) => {
        if (i.status == 'ENABLED') {
          let c: any = [];
          if (i.subMenus && i.subMenus.length > 0) {
            i.subMenus.filter((j: any) => {
              c.push({
                name: j.name,
                id: j.id,
              });
            });
          }
          menu.push({
            subMenus: c,
            name: i.name,
            id: i.id,
          });
        }
      });
    }
    return menu;
  };
  const treeData = formatList(menu);
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
      onFinish={async () => {
        onSubmit(checkedKeys);
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
