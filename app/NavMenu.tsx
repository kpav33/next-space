import Link from "next/link";
import styles from "./NavMenu.module.css";
import Image from "next/image";
// import { SignInButton, SignOutButton } from '../components/buttons';
// import AuthCheck from '@/components/AuthCheck';

// Since this component will only be used one time in the root layout file, we won't be keeping this component in the shared components folder, but rather in the app folder where it will be co-located with the root layout.tsx file.
export default function NavMenu() {
  return (
    <nav className={styles.nav}>
      {/* <Link /> component replaces <a> tags and uses client side routing, which makes the application feel faster */}
      <Link href={"/"}>
        {/* Use the <Image /> component so that Next automatically optimizes any images you might use */}
        <Image
          src="/logo.svg" // Route of the image file
          width={216}
          height={30}
          alt="NextSpace Logo"
        />
      </Link>
      <ul className={styles.links}>
        <li>
          <Link href={"/about"}>About</Link>
        </li>
        <li>
          <Link href={"/blog"}>Blog</Link>
        </li>
        <li>
          <Link href={"/users"}>Users</Link>
        </li>
        {/* <li>
          <SignInButton />
        </li> */}

        {/* <li>
        <AuthCheck>
            <SignOutButton />
          </AuthCheck>
        </li> */}
      </ul>
    </nav>
  );
}
