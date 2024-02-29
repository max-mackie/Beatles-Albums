import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  return (
    <nav className="flex-between w-full mb-4 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/icons/noun-beatles-1840181.svg"
          alt="logo"
          width={60}
          height={60}
          className="object-contain"
        />
        <p className="logo_text">BeatleMania</p>
      </Link>
    </nav>
  )
}

export default Nav