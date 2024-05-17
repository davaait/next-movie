import Link from 'next/link';
import NotFoundIcon from '../public/images/404.png';

export default function NotFound() {
  return (
    <div>
      {/*<Image width={40} height={40}*/}
      {/*       src={NotFoundIcon}*/}
      {/*       alt={'Poster'} />*/}
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>;
      <Link href="/">Return Home</Link>;
    </div>
  );
}