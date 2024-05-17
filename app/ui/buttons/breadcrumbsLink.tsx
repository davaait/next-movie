import Link from 'next/link';

export type BreadcrumbsLinkProps = {
  href: string;
  title: string;
}

const BreadcrumbsLink = ({ href, title }: BreadcrumbsLinkProps) => {
  return (
    <Link style={{ fontWeight: 400, fontSize: 14, color: '#9854F6', textDecoration: 'none' }} href={href}>
      {title}
    </Link>
  );
};

export default BreadcrumbsLink;