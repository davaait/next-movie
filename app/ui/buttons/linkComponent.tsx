import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ButtonComponentProps {
  name: string;
  href: string;
}

const buttonColor = {
  colorActive: '#9854F6',
  backActive: '#E5D5FA',
  colorDisable: '#000000',
  backDisable: '#F2EBF9',
};

const ButtonComponent = ({ name, href }: ButtonComponentProps) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      style={{
        textDecoration: 'none',
        color: pathname === href ? buttonColor.colorActive : buttonColor.colorDisable,
        fontWeight: pathname === href ? 600 : 400,
        borderRadius: '8px',
        display: 'flex',
        height: '42px',
        justifyContent: 'flex-start',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: pathname === href ? buttonColor.backActive : buttonColor.backDisable,
      }}>
      {name}
    </Link>
  );
};

export default ButtonComponent;