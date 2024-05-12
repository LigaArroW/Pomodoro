import { FC, useEffect, useRef, useState } from 'react';
import styles from './CreateTask.module.css';
import { useTask } from '../../../store/useTask';
import { ShowTask } from '../ShowTask';
// import { DEFAULT_TIME } from '../../../constants/DEFAULT_TIME';
import { timeFormat } from '../../../utils/timeFormat';

interface CreateTaskProps { }

export const CreateTask: FC<CreateTaskProps> = () => {
  const [value, setValue] = useState<string>('')
  const [time, setTime] = useState(0)
  const addTask = useTask(state => state.addTask)
  const tasks = useTask(state => state.tasks)
  // const editTaskArr = useTask(state => state.editTasksArr)
  const ref = useRef<HTMLInputElement>(null)
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (!value || value.length < 3) return
    addTask(value)
    setValue('')
  }

  useEffect(() => {
    const fullTime = tasks.reduce((acc, prev) => (acc += prev.timer * prev.pomidor), 0)
    setTime(fullTime)

  }, [tasks])

  // useEffect(() => {
  //   // if (editTaskArr[0]) setValue(editTaskArr[0].task)
  //   if (ref.current) {
  //     ref.current.focus()
  //     ref.current.selectionStart = ref.current.value.length
  //   }
  // }, [editTaskArr])

  // console.log('render CreateTask');

  return (
    <>
      <form onSubmit={submitHandler} className={styles.createTask} >
        <input
          ref={ref}
          className={styles.input}
          type="text"
          value={value}
          onChange={(input) => setValue(input.target.value)}
          placeholder='Название задачи' />
        <button type='submit' className={styles.btn}>Добавить</button>
      </form >
      {tasks.length > 0 && tasks.map((task, i) => {

        return <ShowTask task={task} key={task.task} index={i} />
      })}

      <span className={styles.allTime}>
        {timeFormat(time)}
      </span>
    </>
  )
};


