import { AppShell } from '@mantine/core';
import SidebarComponent from '../sidebar/sidebarComponent';

const LayoutComponent = ({ children }: any) => {
  return (
    <AppShell navbar={{
      width: 280,
      breakpoint: 'sm',
    }}>
      <SidebarComponent />
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default LayoutComponent;