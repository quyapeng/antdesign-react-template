import React, { memo } from 'react';
import { Table } from 'antd';
import { TableProps } from 'antd/lib/table';
import CommonPagination from './CommonPagination';

interface iProps<RecordType extends object = any> extends TableProps<RecordType> {
  className?: string;
  source: any;
  listKey?: string;
}

function TableWithPage(props: iProps) {
  const { className, pagination = true, listKey = 'data', source, ...other } = props;
  const { data = {}, run, params } = source;
  const { pages } = data || {};
  return (
    <div className={className}>
      <Table pagination={false} dataSource={data?.[listKey]} loading={source.loading} {...other} />
      {pagination ? <CommonPagination page={pages} run={run} params={params} /> : null}
    </div>
  );
}

export default memo(TableWithPage);
