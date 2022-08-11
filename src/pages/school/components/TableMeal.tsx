import React, { useEffect, useRef, memo, useState, useContext } from 'react';
import { Button, Form, FormInstance, Input, InputRef, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

export type stringOrNumber = string | number;
export type UpdateProps = {
  onSubmit: (month: stringOrNumber, values: any, data: []) => Promise<void>;
  values: Partial<any>;
  columns: ColumnsType;
  month: stringOrNumber;
  data: [];
};

const TableMeal: React.FC<UpdateProps> = ({ onSubmit, values, columns, data, month }: any) => {
  const [dataSource, setDataSource] = useState(data);

  const EditableContext: any = React.createContext(null);
  const EditableRow = ({ index, ...props }: any) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }: any) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext<FormInstance>(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef?.current?.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input.TextArea
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
            style={{ padding: '0' }}
          />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 6,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  const handleSave = async (row: any) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    // console.log('newData', index, { ...item, ...row });
    setDataSource(newData);
  };

  const clearData = async () => {
    setDataSource([]);
  };
  const columnsData = columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <>
      <Table
        rowKey="id"
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columnsData}
        pagination={false}
      />
      <Space size="middle" style={{ float: 'right', marginTop: '20px' }}>
        <Button onClick={() => clearData()} type="default">
          清空
        </Button>
        <Button onClick={() => onSubmit(month, values, dataSource)} type="primary">
          保存
        </Button>
      </Space>
    </>
  );
};

export default memo(TableMeal);
