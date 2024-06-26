'use client';

import { NumberInput, NumberInputHandlers, rem } from '@mantine/core';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';
import { useRef } from 'react';
import styles from '../components.module.css';

interface InputNumberComponentProps {
  label: string;
  placeholder: string;
  value: string | number;
  setValue: (val: string | number) => void;
}

const InputNumberComponent = ({ label, placeholder, value, setValue }: InputNumberComponentProps) => {
  const handlersRef = useRef<NumberInputHandlers>(null);
  return (
    <NumberInput
      value={value}
      onChange={setValue}
      handlersRef={handlersRef}
      classNames={{ label: styles.numberInputLabel, root: styles.numberInputRoot }}
      size="sm"
      radius="md"
      max={10}
      min={0}
      decimalScale={1}
      label={label}
      placeholder={placeholder}
      rightSection={<div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <ArrowUpIcon onClick={() => handlersRef.current?.increment()} cursor={'pointer'}
                     style={{ width: rem(12), height: rem(12) }} />
        <ArrowDownIcon onClick={() => handlersRef.current?.decrement()} cursor={'pointer'}
                       style={{ width: rem(12), height: rem(12) }} />
      </div>}
    />
  );
};

export default InputNumberComponent;