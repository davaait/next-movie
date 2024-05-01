import { NumberInput, NumberInputHandlers, rem } from '@mantine/core';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';
import styles from '../components.module.css';
import { useRef } from 'react';

interface InputNumberComponentProps {
  label: string;
  placeholder: string;
}

const InputNumberComponent = ({ label, placeholder }: InputNumberComponentProps) => {
  const handlersRef = useRef<NumberInputHandlers>(null);
  return (
    <NumberInput
      handlersRef={handlersRef}
      w={138}
      style={{ label: { fontStyle: 'Inter', fontSize: '16px', fontWeight: 700 } }}
      size="sm"
      radius="md"
      max={10}
      min={0}
      decimalScale={1}
      label={label}
      placeholder={placeholder}
      rightSection={<div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <ArrowUpIcon onClick={() => handlersRef.current?.increment()} cursor={"pointer"} style={{ width: rem(12), height: rem(12) }} />
        <ArrowDownIcon onClick={() => handlersRef.current?.decrement()} cursor={"pointer"} style={{ width: rem(12), height: rem(12) }} />
      </div>}
    />
  );
};

export default InputNumberComponent;