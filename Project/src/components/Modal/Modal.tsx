import { FC } from 'react';
import styles from './Modal.module.css';
import { useTask } from '../../store/useTask';

interface ModalProps {
  setShowModal: () => void
  taskText: string
}

export const Modal: FC<ModalProps> = ({ setShowModal, taskText }) => {
  const removeTask = useTask(state => state.removeTask)
  return (
    <div className={styles.modal}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeModal} onClick={() => setShowModal()}>X</span>
        <div className={styles.modalContent}>
          <p className={styles.text}>Удалить задачу?</p>
          <div className={styles.modalBtns}>
            <button className={styles.yesBtn} onClick={() => removeTask(taskText)}>Удалить</button>
            <button className={styles.noBtn} onClick={() => setShowModal()}>Отмена</button>
          </div>
        </div>
      </div>
    </div>
  )
};


