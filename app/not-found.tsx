'use client';
import NotFoundIcon from '../public/images/404.png';
import { Button, Flex } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './ui/components.module.css';

export default function NotFound() {
  const router = useRouter();
  return (
    <Flex style={{ backgroundColor: '#F5F5F6' }} direction={'column'} w={'100%'} h={'100vh'} justify={'center'}
          align={'center'}>
      <Image style={{ maxWidth: 656, maxHeight: 196, width: '100%', height: '100%' }}
             src={NotFoundIcon}
             alt={'Poster'} />
      <span className={styles.notFoundSpan}>We can’t find the page you are looking for</span>
      <Button onClick={() => router.push('/')} variant="filled" radius="md">Go Home</Button>
    </Flex>
  );
}