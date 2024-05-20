import { AppShell, Burger, Group } from '@mantine/core';
import SidebarComponent from '../sidebar/sidebarComponent';
import { useState } from 'react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import MainLogoComponent from '../../../public/images/logo.svg';
import Image from 'next/image';

const LayoutComponent = ({ children }: any) => {
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery('(min-width: 770px');
  return (
    <AppShell navbar={{
      width: 280,
      breakpoint: 'sm',
      collapsed: { mobile: !opened },
    }} header={{ height: isMobile ? 0 : 60, collapsed: opened }}>
      <AppShell.Header bg="#F2EBF9">
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Image
            src={MainLogoComponent}
            height={20}
            width={20}
            alt="Main logo"
          />
        </Group>
      </AppShell.Header>
      <SidebarComponent opened={opened} onClick={toggle} />
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default LayoutComponent;