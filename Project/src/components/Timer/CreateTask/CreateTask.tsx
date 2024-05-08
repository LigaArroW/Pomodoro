import { FC, useState } from 'react';
import styles from './CreateTask.module.css';
import { useTask } from '../../../store/useTask';
import { ShowTask } from '../ShowTask';

interface CreateTaskProps { }

export const CreateTask: FC<CreateTaskProps> = () => {
  const [value, setValue] = useState<string>('')
  const addTask = useTask(state => state.addTask)
  const tasks = useTask(state => state.tasks)
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    addTask({ id: tasks.length + 1, task: value, timer: null })
    setValue('')
  }
  // console.log('render CreateTask');

  return (
    <>
      <form onSubmit={submitHandler} className={styles.createTask} >
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={(input) => setValue(input.target.value)}
          placeholder='Название задачи' />
        <button type='submit' className={styles.btn}>Добавить</button>
      </form >
      {tasks.length > 0 && tasks.map(task => <ShowTask task={task} key={task.task} />)}
    </>
  )
};


