'use client';
import { AppShell, Burger, Text } from '@mantine/core';
import Image from 'next/image';
import MainLogoComponent from '../../../public/images/logo.svg';
import ButtonComponent from '../buttons/linkComponent';
import styles from '../components.module.css';
import { useMediaQuery } from '@mantine/hooks';

const SidebarComponent = ({ opened, onClick }: { opened: boolean, onClick: () => void }) => {
  return (
    <AppShell>
      <AppShell.Navbar hidden className={styles.sidebarComponentNavbar} p="md">
        <div className={styles.sidebarComponentLogoContainer}>
          <Image
            src={MainLogoComponent}
            height={32}
            width={32}
            alt="Main logo"
          />
          <Text className={styles.sidebarComponentLogoText}>ArrowFlicks</Text>
          <Burger opened={opened} onClick={onClick} hiddenFrom="sm" size="sm" />
        </div>
        <ButtonComponent name="Movies" href="/" />
        <ButtonComponent name="Rated movies" href="/rated-movies" />
      </AppShell.Navbar>
    </AppShell>
  );
};

export default SidebarComponent;