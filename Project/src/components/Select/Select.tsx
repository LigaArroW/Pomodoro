import { FC } from 'react';
import styles from './Select.module.css';
import ReactSelect, { OnChangeValue } from 'react-select';
import { OPTIONS_SELECT } from '../../constants/OPTIONS_SELECT';

interface SelectProps {
  setOption: (e: { value: string; label: string; }) => void
}

export const Select: FC<SelectProps> = ({ setOption }) => {

  const handleChange = (e: OnChangeValue<{ value: string; label: string; }, false>) => {
    e && setOption({ value: e.value, label: e.label })
  }

  return (
    <>
      <ReactSelect
        className={styles.select}
        classNamePrefix={styles.reactSelect}
        options={OPTIONS_SELECT}
        defaultValue={OPTIONS_SELECT[0]}
        onChange={(e: OnChangeValue<{ value: string; label: string; }, false>) => handleChange(e)}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: 'var(--thin-grey)',
            height: '55px',
            cursor: 'pointer',
          }),
          singleValue: (base) => ({
            ...base,
            fontSize: '16px',
            color: 'var(--hard-grey)',
          }),
          indicatorSeparator: (base) => ({
            ...base,
            display: 'none',
          }),
          indicatorsContainer: (base) => ({
            ...base,
            svg: {
              fill: 'var(--hard-red)',
            }
          }),

        }}
      />
    </>
  )
};


