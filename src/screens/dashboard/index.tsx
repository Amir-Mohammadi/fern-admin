import React from 'react';
import {Line} from 'react-chartjs-2';
import Alert from '../../components/alert/alert';
import Card from '../../components/card';
import Icons, {IconTypes} from '../../components/icons';
import styles from './dashboard.module.scss';

interface Props {
  statistics?: {
    todayVisits: number[];
    previousMonthNS: number[];
    registeredUsers: number[];
    totalGrossSales: number[];
  };
}

export type DashboardProps = Props;

const Dashboard: React.FC<DashboardProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.alertBX}>
        <Alert text="داشبورد" />
      </div>
      <div className={styles.content}>
        <div className={styles.column}>
          <Card title={'بازدیده های امروز سایت'}>
            <div className={styles.cardBXSM}>
              <div className={styles.value}>
                <label>125406</label>
              </div>
              <div className={styles.chartBX}>
                <Line
                  data={(canvas: any) =>
                    renderTinyChart(canvas, props.statistics!.todayVisits)
                  }
                  width={91}
                  height={35}
                  options={options}
                />
              </div>
            </div>
          </Card>
          <Card title={'کامنت های تایید شده و رد شده'}>
            <div className={styles.cardBXSM}>
              <div className={styles.halfPart}>
                <Icons
                  type={IconTypes.Like}
                  color={'#009289'}
                  secondColor={'#009289'}
                  size={'20px'}
                />
                <label> 125406</label>
              </div>
              <div className={styles.halfPart}>
                <Icons
                  type={IconTypes.Dislike}
                  color={'#DB0060'}
                  secondColor={'#DB0060'}
                  size={'20px'}
                />
                <label> 125406</label>
              </div>
            </div>
          </Card>
          <Card title={'فروش خالص ماه قبل'}>
            <div className={styles.cardBXMD}>
              <div className={styles.chartBX}>
                <div className={styles.title}>
                  <label> 125406</label>
                </div>
                <div>
                  <Line
                    data={(canvas: any) =>
                      renderChart(
                        canvas,
                        props.statistics!.previousMonthNS,
                        'green',
                      )
                    }
                    options={options}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className={styles.column}>
          <Card title={'کاربران عضو شده'}>
            <div className={styles.cardBXSM}>
              <div className={styles.value}>
                <label>125406</label>
              </div>
              <div className={styles.chartBX}>
                <Line
                  data={(canvas: any) =>
                    renderTinyChart(canvas, props.statistics!.registeredUsers)
                  }
                  width={91}
                  height={35}
                  options={options}
                />
              </div>
            </div>
          </Card>
          <Card title={'پرسش های پاسخ داده شده و نشده'}>
            <div className={styles.cardBXSM}>
              <div className={styles.halfPart}>
                <Icons
                  type={IconTypes.Tick}
                  color={'transparent'}
                  secondColor={'#009289'}
                  size={'20px'}
                />
                <label> 125406</label>
              </div>
              <div className={styles.halfPart}>
                <Icons
                  type={IconTypes.Reject}
                  color={'transparent'}
                  secondColor={'#DB0060'}
                  size={'12px'}
                />
                <label> 125406</label>
              </div>
            </div>
          </Card>
          <Card title={'کل فروش ناخالص ال سل'}>
            <div className={styles.cardBXMD}>
              <div className={styles.chartBX}>
                <div className={styles.title}>
                  <label> 125406</label>
                </div>
                <div>
                  <Line
                    data={(canvas: any) =>
                      renderChart(
                        canvas,
                        props.statistics!.totalGrossSales,
                        'red',
                      )
                    }
                    options={options}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className={styles.column}>
          <Card title={'نقشه پراکندگی بازدیدکننده گان سایت'}>
            <div className={styles.cardBXLG}></div>
          </Card>
          <Card title={'تعداد تامین کنندگان'}>
            <div className={styles.cardBXSM}>
              <div className={styles.value}>
                <label>125406</label>
              </div>
              <div className={styles.chartBX}>
                <Line
                  data={(canvas: any) =>
                    renderTinyChart(canvas, props.statistics!.previousMonthNS)
                  }
                  width={91}
                  height={35}
                  options={options}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
const options = {
  tooltips: {
    enabled: false,
  },
  legend: {
    display: false,
  },
  pointDot: false,
  scales: {
    xAxes: [
      {
        display: false,
      },
    ],
    yAxes: [
      {
        display: false,
      },
    ],
  },
};

const renderTinyChart = (canvas: any, data: number[]) => {
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(0,146,137,.49)');
  gradient.addColorStop(1, 'rgba(0,146,137,0)');
  return {
    labels: new Array<string>(data.length || 0),
    datasets: [
      {
        steppedLine: false,
        fill: false,
        backgroundColor: 'transparent',
        borderColor: '#009289',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointRadius: 0,
        borderJoinStyle: 'round',
        cubicInterpolationMode: 'monotone',
        data: data,
      },
    ],
  };
};

const renderChart = (canvas: any, data: number[], color: 'green' | 'red') => {
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(
    0,
    color == 'green' ? 'rgba(0,146,137,.49)' : 'rgb(255, 35, 102,0.27)',
  );
  gradient.addColorStop(
    1,
    color == 'green' ? 'rgba(0,146,137,0)' : 'rgb(255, 35, 102,0.06)',
  );
  return {
    labels: new Array<string>(data.length || 0),
    datasets: [
      {
        steppedLine: false,
        fill: true,
        backgroundColor: gradient,
        hoverBackgroundColor: gradient,
        borderColor: color == 'green' ? '#009289' : '#FF2366',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBorderColor: color == 'green' ? '#009289' : '#FF2366',
        pointBackgroundColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: color == 'green' ? '#009289' : '#FF2366',
        pointHoverBorderColor: color == 'green' ? '#009289' : '#FF2366',
        pointHoverBorderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
        borderJoinStyle: 'round',
        cubicInterpolationMode: 'monotone',
        data: data,
      },
    ],
  };
};
