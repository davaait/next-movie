import Link from 'next/link';
import { usePathname } from 'next/navigation';
import style from '../components.module.css';

interface ButtonComponentProps {
  name: string;
  href: string;
}

const buttonColor = {
  colorActive: '#9854F6',
  backActive: '#E5D5FA',
  colorDisable: '#000000',
  backDisable: '#F2EBF9',
  hover: '#BD93F7',
};

const ButtonComponent = ({ name, href }: ButtonComponentProps) => {
  const pathname = usePathname();
  const linkClassname = pathname === href ? style.linkActive : style.link;
  return (
    <Link
      href={href}
      onMouseEnter={(e: any) => {
        e.target.style.color = buttonColor.hover;
      }}
      onMouseLeave={(e: any) => {
        e.target.style.color = pathname === href ? buttonColor.colorActive : buttonColor.colorDisable;
      }}
      style={{
        color: pathname === href ? buttonColor.colorActive : buttonColor.colorDisable,
        fontWeight: pathname === href ? 600 : 400,
        backgroundColor: pathname === href ? buttonColor.backActive : buttonColor.backDisable,
        textDecoration: 'none',
        borderRadius: '8px',
        display: 'flex',
        height: '42px',
        justifyContent: 'flex-start',
        padding: '10px',
        marginBottom: '10px',
      }}>
      {name}
    </Link>
  );
};

export default ButtonComponent;