'use client';

import { AppShell, Text } from '@mantine/core';
import Image from 'next/image';
import MainLogoComponent from '../../../public/images/logo.svg';
import ButtonComponent from '../buttons/linkComponent';

const SidebarComponent = () => {
  return (
    <AppShell navbar={{
      width: 280,
      breakpoint: 'sm',
    }}>
      <AppShell.Navbar style={{ backgroundColor: '#F2EBF9', padding: '24px' }} p="md">
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '70px',
        }}>
          <Image
            src={MainLogoComponent}
            height={32}
            width={32}
            alt="Main logo"
          />
          <Text
            style={{
              color: '#9854F6',
              fontStyle: 'Poppins',
              fontSize: '24px',
              fontWeight: '600',
            }}>ArrowFlicks</Text>
        </div>
        <ButtonComponent name={'Movies'} href={'/'} />
        <ButtonComponent name={'Rated movies'}
                         href={'/rated-movies'} />
      </AppShell.Navbar>
    </AppShell>
  );
};

export default SidebarComponent;