import React, { memo, useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { Pages } from '@/services';
import styles from './index.less';

interface iProp {
  page: Pick<Pages, 'pageNum' | 'totalRows'>;
  run: (...params: any[]) => void;
  params: any[];
  className?: string;
}

function CommonPagination(props: iProp) {
  const { page, run, params, className } = props;
  const [query] = params;
  const [currentSize, setCurrentSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    run({ ...query, pageNum: currentPage, pageSize: currentSize });
  }, [currentSize, currentPage]);

  return (
    <div className={classnames(styles.pageWrap, className)}>
      <Pagination
        current={page?.pageNum}
        total={page?.totalRows}
        showQuickJumper
        hideOnSinglePage
        showTotal={(total) => `共 ${total} 条数据`}
        onChange={(page, pageSize) => {
          setCurrentSize(pageSize as number);
          setCurrentPage(currentSize === pageSize ? page : 1);
        }}
      />
    </div>
  );
}

export default memo(CommonPagination);
