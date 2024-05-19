'use client';
import NotFoundIcon from '../public/images/404.png';
import { Button, Flex } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <Flex style={{ backgroundColor: '#F5F5F6'}} direction={'column'} w={'100%'} h={'100vh'} justify={'center'} align={'center'}>
      <Image style={{ width: 656, height: 196 }}
             src={NotFoundIcon}
             alt={'Poster'} />
      <span style={{
        marginTop: 16,
        marginBottom: 16,
        fontWeight: 600,
        fontSize: 20,
      }}>We can’t find the page you are looking for</span>
      <Button onClick={() => router.push('/')} variant="filled" radius="md">Go Home</Button>
    </Flex>
  );
}