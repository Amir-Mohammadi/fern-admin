import React from 'react';
import styles from './chart-card.module.scss';

import classNames from 'classnames';
import Chart from 'react-chartjs-2';
import Icons, {IconTypes} from '../icons';

import {getTolerance} from '../../utils/toleranceCal';

interface Props {
  title: string;
  data: number[];
  dateRange: dateRange;
  onChangeDateRange: (range: dateRange) => void;
  labels: string[];
  type: 'line' | 'bar';
}

export enum dateRange {
  DAY,
  WEEK,
  YEARS,
  ALL,
}

export type ChartCardProps = Props;

const ChartCard: React.FC<ChartCardProps> = (props) => {
  const tolerance = getTolerance(
    props.data[props.data.length - 1],
    props.data[props.data.length - 2],
  );

  return (
    <div className={styles.container}>
      <div className={styles.cardHD}>
        <label>{props.title}</label>
        <div className={styles.dateRangeBX}>
          <span
            className={classNames({
              [styles.selected]: props.dateRange == dateRange.DAY,
            })}
            onClick={() => props.onChangeDateRange(dateRange.DAY)}>
            روز
          </span>
          <span
            className={classNames({
              [styles.selected]: props.dateRange == dateRange.WEEK,
            })}
            onClick={() => props.onChangeDateRange(dateRange.WEEK)}>
            هفته
          </span>
          <span
            className={classNames({
              [styles.selected]: props.dateRange == dateRange.YEARS,
            })}
            onClick={() => props.onChangeDateRange(dateRange.YEARS)}>
            سال
          </span>
          <span
            className={classNames({
              [styles.selected]: props.dateRange == dateRange.ALL,
            })}
            onClick={() => props.onChangeDateRange(dateRange.ALL)}>
            همه
          </span>
        </div>
      </div>
      <div className={styles.tolerance}>
        <div className={styles.percent}>
          {parseFloat(tolerance) > 0 ? (
            <Icons
              type={IconTypes.Top}
              color={'transparent'}
              secondColor={'#009289'}
              size="16px"
            />
          ) : null}

          {parseFloat(tolerance) < 0 ? (
            <Icons
              type={IconTypes.Down}
              color={'transparent'}
              secondColor={'#DB0060'}
              size="16px"
            />
          ) : null}

          <span
            className={classNames({
              [styles.negative]: parseFloat(tolerance) < 0,
              [styles.positive]: parseFloat(tolerance) > 0,
            })}>
            {`${tolerance} %`}
          </span>
        </div>
        <div className={styles.value}>
          <label> 125.406.514</label>
          <span>{'ريال'}</span>
        </div>
      </div>
      <div className={styles.cardBD}>
        <Chart
          type={props.type}
          data={(canvas: any) => renderChart(canvas, props)}
          width={571}
          height={240}
          options={options}
        />
      </div>
    </div>
  );
};

export default ChartCard;

const renderChart = (canvas: any, props: ChartCardProps) => {
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(0,146,137,.49)');
  gradient.addColorStop(1, 'rgba(0,146,137,0)');
  return {
    labels: props.labels,
    datasets: [
      {
        steppedLine: false,
        fill: true,
        backgroundColor: props.type == 'bar' ? '#009289' : gradient,
        hoverBackgroundColor: props.type == 'bar' ? '#006862' : gradient,
        borderColor: '#009289',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBorderColor: '#006862',
        pointBackgroundColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#006862',
        pointHoverBorderColor: '#006862',
        pointHoverBorderWidth: 2,
        pointRadius: 3,
        pointHitRadius: 10,
        borderJoinStyle: 'round',
        cubicInterpolationMode: 'monotone',
        data: props.data,
      },
    ],
  };
};

const options = {
  layout: {
    rtl: true,
    padding: {
      top: 20,
      left: 10,
    },
  },
  bezierCurve: true,
  legend: {
    display: false,
    rtl: true,
  },
  scales: {
    yAxes: [
      {
        display: true,
        gridLines: {
          display: true,
          drawOnChartArea: true,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          drawTicks: true,
          drawOnChartArea: true,
          padding: 14,
        },

        ticks: {
          padding: 10,
          fontSize: 11,
        },
      },
    ],
  },
  steppedLine: true,
};
