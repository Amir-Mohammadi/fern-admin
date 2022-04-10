import React, {useState} from 'react';
import styles from './pagination.module.scss';
import ReactPaginate, {ReactPaginateProps} from 'react-paginate';
import Icons, {IconTypes} from '../icons';
import {copyFileSync} from 'fs';

interface Props {
  pageCount: number;
  pageRangeDisplayed: number;
  marginPagesDisplayed: number;
  onPageChange: (index: number) => any;
  selectedPage: number;
}

export type PaginationProps = Props;

const Pagination: React.FC<PaginationProps> = (props) => {
  const arrowRight = () => {
    if (props.selectedPage >= props.pageCount) return null;

    return (
      <div
        onClick={() => props.onPageChange(props.selectedPage + 1)}
        className={styles.arrows}>
        <Icons
          type={IconTypes.ArrowRight}
          secondColor={'#707070'}
          color={'#FFFFFF'}
          size={'6px'}
        />
      </div>
    );
  };

  const arrowLeft = () => {
    if (props.selectedPage <= 1) return null;

    return (
      <div
        onClick={() => props.onPageChange(props.selectedPage - 1)}
        className={styles.arrows}>
        <Icons
          type={IconTypes.ArrowLeft}
          secondColor={'#707070'}
          color={'#FFFFFF'}
          size={'6px'}
        />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {arrowLeft()}
      <ReactPaginate
        breakLabel={'...'}
        pageCount={props.pageCount}
        nextLabel={''}
        previousLabel={''}
        marginPagesDisplayed={props.marginPagesDisplayed}
        pageRangeDisplayed={props.pageRangeDisplayed}
        onPageChange={(item: { selected: number; }) => props.onPageChange(item.selected + 1)}
        containerClassName={styles.pagination}
        activeClassName={styles.selected}
        forcePage={props.selectedPage - 1}
        nextClassName={styles.defaults}
        previousClassName={styles.defaults}
      />
      {arrowRight()}
    </div>
  );
};

export default Pagination;
