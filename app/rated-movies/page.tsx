import Image from 'next/image'
import img from '../../public/images/pic_2.png'
import { Center } from '@mantine/core';
const Page = () => {
  return (
    <Center w={'100%'} h={'100vh'}>
      <Image src={img} alt={'No data'} />
    </Center>
  );
};

export default Page;