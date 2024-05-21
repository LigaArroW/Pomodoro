import { FC, useEffect, useRef, useState } from 'react';
import styles from './Graf.module.css';
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts';
import { IStat, useStatistic } from '../../../store/useStatisctic';
import { weekArr } from '../../../utils/weekArr';
import { timeFormat } from '../../../utils/timeFormat';

interface GrafProps {
  value: number
}

type StaticArrType = Partial<IStat & { day: string }> & { active: boolean }


export const Graf: FC<GrafProps> = ({ value }) => {
  const ref = useRef(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  // const [valueWeek, setValueWeek] = useState(value)
  // const [week, setWeek] = useState(weekArr(new Date().toLocaleDateString(), value))
  const week = weekArr(new Date().toLocaleDateString(), value)
  const statistic = useStatistic(state => state.statiscic)
  const addCurenDay = useStatistic(state => state.addCurentDay)
  const [staticArr, setStaticArr] = useState<StaticArrType[]>(
    week.reduce((result: Partial<IStat[] & { day: string }[]> & { active: boolean }[], day) => {
      const find = statistic.find(stat => stat.date === day.date);
      if (find) {
        result.push({ ...day, ...find, active: new Date().toLocaleDateString() === day.date });
      } else {
        result.push({ ...day, active: new Date().toLocaleDateString() === day.date });
      }
      return result;
    }, []))


  const handleClick = (e: { date: string; }) => {

    const find = staticArr.findIndex(stat => stat.date === e.date);
    setStaticArr(prev => prev.map((el, index) => ({ ...el, active: index === find })))
    addCurenDay(e.date)
  }

  useEffect(() => {
    const newWeek = weekArr(new Date().toLocaleDateString(), value);
    const newStaticArr = newWeek.reduce((result: Partial<IStat[] & { day: string }[]> & { active: boolean }[], day) => {
      const find = statistic.find(stat => stat.date === day.date);
      if (find) {
        result.push({ ...day, ...find, active: new Date().toLocaleDateString() === day.date });
      } else {
        result.push({ ...day, active: new Date().toLocaleDateString() === day.date });
      }
      return result;
    }, []);

    setStaticArr(newStaticArr);
  }, [statistic, value]);

  useEffect(() => {
    if (ref.current) {
      const { width, height } = window.getComputedStyle(ref.current)
      setSize({
        width: Number(width.replace('px', '')),
        height: Number(height.replace('px', ''))
      })
    }
    addCurenDay(new Date().toLocaleDateString())

    // setValueWeek(value)


  }, [])

  return (
    <div className={styles.graf} ref={ref}>
      <BarChart width={size.width} height={size.height} data={staticArr} className={styles.barChart} margin={{ right: 20 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey={'day'}
          padding={{ left: 56, right: 56 }}
          axisLine={false}
          tickLine={false}
          stroke='#999'

        />
        <YAxis dataKey={'timeToJob'}
          orientation='right'
          // mirror
          tickFormatter={(value) => timeFormat(value)}
          padding={{ top: 67 }}
          width={80}
          axisLine={false}
          tickLine={false}
          tickCount={4}
        />
        <Bar dataKey={'timeToJob'}
          fill="#ea8a79"
          className={styles.bar}
          onClick={handleClick}
        // activeBar={{ stroke: 'red', strokeWidth: 2 }}
        >
          {staticArr.map((stat, index) => (

            <Cell cursor='pointer' key={index} fill={(stat && stat.active) ? '#dc3e22' : '#ea8a79'} />
          ))}
        </Bar>
      </BarChart>
    </div >
  )
};


