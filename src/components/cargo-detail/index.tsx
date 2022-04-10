import styles from './cargo-detail.module.scss';
import {
  faEdit,
  faQuestionCircle,
  faTruck,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface Props {}

export type CargoDetailProps = Props;

const CargoDetail: React.FC<CargoDetailProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <FontAwesomeIcon icon={faTruck} color={'#808080'} />
        <span>آدرس صورتحساب و ارسال</span>
      </div>
      <div className={styles.middle}>
        <div className={styles.rightSide}>
          <div className={styles.tableHeadRight}>
            <span> آدرس صورتحساب </span>
          </div>
          <div>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <td className={styles.firstColumn}>نام کامل</td>
                  <td></td>
                </tr>
                <tr>
                  <td>صندوق پستی اینترنتی</td>
                  <td></td>
                </tr>
                <tr>
                  <td>تلفن</td>
                  <td></td>
                </tr>
                <tr>
                  <td>شرکت</td>
                  <td></td>
                </tr>
                <tr>
                  <td>آدرس</td>
                  <td></td>
                </tr>
                <tr>
                  <td>شهر </td>
                  <td></td>
                </tr>
                <tr>
                  <td>استان</td>
                  <td></td>
                </tr>
                <tr>
                  <td>کد پستی</td>
                  <td></td>
                </tr>
                <tr>
                  <td>کشور</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <button>
            <FontAwesomeIcon icon={faEdit} color={'#FFFFFF'} />
            <span>ویرایش</span>
          </button>
        </div>
        <div className={styles.leftSide}>
          <div className={styles.tableHeadLeft}>
            <span> آدرس ارسال </span>
          </div>
          <div>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <td className={styles.firstColumn}>نام کامل</td>
                  <td></td>
                </tr>
                <tr>
                  <td>صندوق پستی اینترنتی</td>
                  <td></td>
                </tr>
                <tr>
                  <td>تلفن</td>
                  <td></td>
                </tr>
                <tr>
                  <td>شرکت</td>
                  <td></td>
                </tr>
                <tr>
                  <td>آدرس</td>
                  <td></td>
                </tr>
                <tr>
                  <td>شهر </td>
                  <td></td>
                </tr>
                <tr>
                  <td>استان</td>
                  <td></td>
                </tr>
                <tr>
                  <td>کد پستی</td>
                  <td></td>
                </tr>
                <tr>
                  <td>کشور</td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan={2}>مشاهده آدرس در نقشه گوگل</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button>
            <FontAwesomeIcon icon={faEdit} color={'#FFFFFF'} />
            <span>ویرایش</span>
          </button>
        </div>
      </div>
      <div className={styles.footer}>
        <div>
          <div className={styles.colOne}>
            <div className={styles.firstCol}>
              <span>روش ارسال</span>
              <FontAwesomeIcon
                icon={faQuestionCircle}
                color={'#009289'}
                size={'xs'}
              />
            </div>
            <div className={styles.secondCol}>
              <span>وضعیت ارسال</span>
              <FontAwesomeIcon
                icon={faQuestionCircle}
                color={'#009289'}
                size={'xs'}
              />
            </div>
          </div>
          <div className={styles.colTwo}>
            <span className={styles.rowOne}>پست سفارشی</span>
            <span className={styles.rowTwo}>هنوز ارسال نشده</span>
          </div>
          <div className={styles.colThree}>
            <button>
              <FontAwesomeIcon icon={faEdit} color={'#FFFFFF'} />
              <span>ویرایش</span>
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default CargoDetail;
