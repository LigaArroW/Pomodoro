import { FC, useState } from 'react';
import styles from './Select.module.css';
import ReactSelect, { OnChangeValue } from 'react-select';
import { OPTIONS_SELECT } from '../../constants/OPTIONS_SELECT';

interface SelectProps {
  setOption: (e: { value: string; label: string; }) => void
  optionDef: { value: string; label: string; }
}

export const Select: FC<SelectProps> = ({ optionDef, setOption }) => {
  const [optionsDef, setOptionsDef] = useState(OPTIONS_SELECT);

  const handleChange = (e: OnChangeValue<{ value: string; label: string; }, false>) => {
    e && setOption(e)
  }



  return (
    <>
      <ReactSelect
        isSearchable={false}
        className={styles.select}
        classNamePrefix={styles.reactSelect}
        options={optionsDef}
        value={optionDef}
        // onChange={(e: OnChangeValue<{ value: string; label: string; }, false>) => e && setOption(e)}
        onChange={handleChange}
        onMenuOpen={() => {
          const newOptions = OPTIONS_SELECT.filter((item) => item.value !== optionDef.value);
          setOptionsDef(newOptions);
        }}
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: 'var(--thin-grey)',
            height: '55px',
            cursor: 'pointer',
          }),
          singleValue: (base) => ({
            ...base,
            paddingTop: '19px',
            paddingBottom: '19px',
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
          menu: (base) => ({
            ...base,
            backgroundColor: 'var(--thin-grey)',
            marginTop: '0px',
            marginBottom: '0px',
          }),
          menuList: (base) => ({
            ...base,
            paddingTop: '0px',
            paddingBottom: '0px',
          }),
          option: (base) => ({
            ...base,
            fontSize: '16px',
            color: 'var(--hard-grey)',
            paddingTop: '19px',
            paddingBottom: '19px',
            borderBottom: '1px solid #dedede',
          }),
          dropdownIndicator: (base, state) => ({
            ...base,
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0)',
          }),
        }}
      />
    </>
  )
};


