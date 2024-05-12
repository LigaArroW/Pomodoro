import { FC, useEffect, useRef, useState } from 'react';
import styles from './CreateTask.module.css';
import { useTask } from '../../../store/useTask';
import { ShowTask } from '../ShowTask';
import { DEFAULT_TIME } from '../../../constants/DEFAULT_TIME';
import { timeFormat } from '../../../utils/timeFormat';
import { getUniqid } from '../../../utils/getUniqid';

interface CreateTaskProps { }

export const CreateTask: FC<CreateTaskProps> = () => {
  const [value, setValue] = useState<string>('')
  const [time, setTime] = useState(0)
  const addTask = useTask(state => state.addTask)
  const tasks = useTask(state => state.tasks)
  const editTaskArr = useTask(state => state.editTasksArr)
  const ref = useRef<HTMLInputElement>(null)
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (!value || value.length < 3) return
    const finalTask = editTaskArr.length > 0
      ?
      { id: editTaskArr[0].id, task: value, timer: editTaskArr[0].timer, active: editTaskArr[0].active }
      :
      { id: getUniqid(tasks), task: value, active: tasks.length < 1 ? true : false, timer: DEFAULT_TIME }
    addTask(finalTask)
    // addTask({ id: tasks.length + 1, task: value, timer: null })
    setValue('')
  }

  useEffect(() => {
    const fullTime = tasks.reduce((acc, prev) => (acc += prev.timer), 0)
    setTime(fullTime)

  }, [tasks])

  useEffect(() => {
    if (editTaskArr[0]) setValue(editTaskArr[0].task)
    if (ref.current) {
      ref.current.focus()
      ref.current.selectionStart = ref.current.value.length
    }
  }, [editTaskArr])

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
      {tasks.length > 0 && tasks.map(task => {
        if (task.id === 0) return
        return <ShowTask task={task} key={task.task} />
      })}

      <span className={styles.allTime}>
        {timeFormat(time)}
      </span>
    </>
  )
};


