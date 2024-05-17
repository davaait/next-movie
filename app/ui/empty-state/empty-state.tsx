import Image from 'next/image';
import { Button, Flex } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { EmptyStatePropsType } from '../../lib/definitions';

const EmptyState = ({ phrase, isRatedPage, image }: EmptyStatePropsType) => {
  const router = useRouter();
  return (
    <Flex align={'center'} direction={'column'} justify={'center'}
          style={{ width: '100%', height: '100%', marginTop: isRatedPage ? 0 : 24 }}>
      <Image src={image} alt={'No data'} />
      <span style={{
        marginTop: isRatedPage ? 0 : 16,
        marginBottom: isRatedPage ? 16 : 0,
        fontWeight: 600,
        fontSize: 20,
      }}>{phrase}</span>
      {isRatedPage && <Button onClick={() => router.push('/')} variant="filled" radius="md">Find movies</Button>}
    </Flex>
  );
};

export default EmptyState;