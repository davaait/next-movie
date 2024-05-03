import { rem, Select, SelectProps } from '@mantine/core';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';
import styles from '../components.module.css';

interface NativeSelectProps {
  value: string;
  setValue: (val: string) => void;
  label: string;
  placeholder: string;
  data: Array<string>;
}

const renderSelectOption: SelectProps['renderOption'] = ({ option, checked }) => (
  <div className={styles.dropdown}>
    <span style={{ fontStyle: 'Inter', fontWeight: 400, fontSize: '14px' }}>{option.label}</span>
  </div>
);

const DropdownComponent = ({ value, setValue, label, data, placeholder }: NativeSelectProps) => {
  const icon = <ArrowDownIcon style={{ width: rem(16), height: rem(12) }} />;
  return (
    <Select
      w={284}
      withScrollArea={false}
      renderOption={renderSelectOption}
      placeholder={placeholder}
      styles={{
        option: { padding: 0, borderRadius: '8px' },
        dropdown: { maxHeight: 200, overflowY: 'auto', padding: '4px' },
      }}
      size="sm"
      searchable
      radius="md"
      value={value}
      rightSectionPointerEvents="none"
      rightSection={icon}
      onChange={(_value, option) => _value && setValue(_value)} label={label}
      data={data} />
  );
};

export default DropdownComponent;