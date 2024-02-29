import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Navigation bar component displaying the site's logo and providing a link to the homepage.
 * Utilizes Next.js's `Link` and `Image` components for optimized navigation and image handling.
 */
const Nav = () => {
  return (
    <nav className="flex justify-between items-center w-full mb-4 pt-3">
      <Link href="/" className=" gap-2 flex-center">
        <Image
          src="/assets/icons/noun-beatles-1840181.svg"
          alt="BeatleMania logo"
          width={60}
          height={60}
          className="object-contain"
        />
        <span className="logo_text">BeatleMania</span>
      </Link>
    </nav>
  );
};

export default Nav;
