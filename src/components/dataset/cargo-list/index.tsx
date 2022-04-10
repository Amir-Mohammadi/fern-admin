import styles from './cargo-list.module.scss';

import {faEdit, faEye, faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';

interface Props {}

export type CargoDatasetListProps = Props;

const CargoDatasetList: React.FC<CargoDatasetListProps> = (props) => {
  const [state, setState] = useState(0);
  return (
    <div className={styles.container}>
      <table className={styles.mainTable}>
        <thead>
          <tr>
            <th>سفارش</th>
            <th> ارسال</th>
            <th>سفارش </th>
            <th> کد پیگیری</th>
            <th className={styles.middleHead}>
              {/* <FontAwesomeIcon icon={faFilter} color={'#707070'} />
                <FontAwesomeIcon icon={faAngleDown} color={'#707070'} /> */}
              <span>فروشنده</span>
            </th>
            <th className={styles.middleHead}>
              {/* <FontAwesomeIcon icon={faFilter} color={'#707070'} />
                <FontAwesomeIcon icon={faAngleDown} color={'#707070'} /> */}
              <span> تاریخ ارسال</span>
            </th>

            <th> مجموع وزن</th>
            <th>مشاهده</th>
            <th className={styles.emptyPart}></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.firstColumn}>01</td>

            <td className={styles.firstButton}>
              <button>ارسال نشده</button>
            </td>
            <td></td>
            <td></td>
            <td>mjelviz@gmail.com</td>
            <td>19/09/1399 10:38:35</td>
            <td></td>
            <td className={styles.seenButton}>
              <button>
                <FontAwesomeIcon icon={faEye} color={'#FFFFFF'} />
                <span>مشاهده</span>
              </button>
            </td>
            <td className={styles.editButton}>
              <button>
                <FontAwesomeIcon icon={faEdit} color={'#FFFFFF'} />
                <span>ویرایش</span>
              </button>
              <span onClick={(e) => setState(1)}>
                <FontAwesomeIcon icon={faPlus} color={'#707070'} />
              </span>
            </td>
          </tr>
          {state == 1 ? RenderPage() : null}
          <tr>
            <td className={styles.firstColumn}>02</td>
            <td className={styles.secondButton}>
              <button>ارسال شده</button>
            </td>
            <td> </td>
            <td></td>
            <td>rezagholami625@gmail.com</td>
            <td>19/09/1399 10:38:35</td>
            <td> </td>
            <td className={styles.seenButton}>
              <button>
                <FontAwesomeIcon icon={faEye} color={'#FFFFFF'} />
                <span>مشاهده</span>
              </button>
            </td>
            <td className={styles.editButton}>
              <button>
                <FontAwesomeIcon icon={faEdit} color={'#FFFFFF'} />
                <span>ویرایش</span>
              </button>
              <span onClick={(e) => setState(2)}>
                <FontAwesomeIcon icon={faPlus} color={'#707070'} />
              </span>
            </td>
          </tr>
          {state == 2 ? RenderPage() : null}
          <tr>
            <td className={styles.firstColumn}>02</td>
            <td className={styles.secondButton}>
              <button> تحویل شده</button>
            </td>
            <td></td>
            <td></td>
            <td>rezagholami625@gmail.com</td>
            <td>19/09/1399 10:38:35</td>
            <td></td>
            <td className={styles.seenButton}>
              <button>
                <FontAwesomeIcon icon={faEye} color={'#FFFFFF'} />
                <span>مشاهده</span>
              </button>
            </td>
            <td className={styles.editButton}>
              <button>
                <FontAwesomeIcon icon={faEdit} color={'#FFFFFF'} />
                <span>ویرایش</span>
              </button>
              <span onClick={(e) => setState(3)}>
                <FontAwesomeIcon icon={faPlus} color={'#707070'} />
              </span>
            </td>
          </tr>
          {state == 3 ? RenderPage() : null}
          <tr>
            <td className={styles.firstColumn}>01</td>
            <td className={styles.thirdButton}>
              <button>در حال پردازش</button>
            </td>
            <td> </td>
            <td></td>
            <td>mjelviz@gmail.com</td>
            <td>19/09/1399 10:38:35</td>
            <td></td>
            <td className={styles.seenButton}>
              <button>
                <FontAwesomeIcon icon={faEye} color={'#FFFFFF'} />
                <span>مشاهده</span>
              </button>
            </td>
            <td className={styles.editButton}>
              <button>
                <FontAwesomeIcon icon={faEdit} color={'#FFFFFF'} />
                <span>ویرایش</span>
              </button>

              <span onClick={(e) => setState(4)}>
                <FontAwesomeIcon icon={faPlus} color={'#707070'} />
              </span>
            </td>
          </tr>

          {state == 4 ? RenderPage() : null}
        </tbody>
      </table>
    </div>
  );
};

export default CargoDatasetList;

const RenderPage = () => {
  return (
    <td colSpan={9} className={styles.renderPage}>
      asd
    </td>
  );
};
