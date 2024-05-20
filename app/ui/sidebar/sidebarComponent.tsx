'use client';
import { AppShell, Text } from '@mantine/core';
import Image from 'next/image';
import MainLogoComponent from '../../../public/images/logo.svg';
import ButtonComponent from '../buttons/linkComponent';
import styles from '../components.module.css';

const SidebarComponent = () => {
  return (
    <AppShell>
      <AppShell.Navbar className={styles.sidebarComponentNavbar} p="md">
        <div className={styles.sidebarComponentLogoContainer}>
          <Image
            src={MainLogoComponent}
            height={32}
            width={32}
            alt="Main logo"
          />
          <Text className={styles.sidebarComponentLogoText}>ArrowFlicks</Text>
        </div>
        <ButtonComponent name="Movies" href="/" />
        <ButtonComponent name="Rated movies" href="/rated-movies" />
      </AppShell.Navbar>
    </AppShell>
  );
};

export default SidebarComponent;