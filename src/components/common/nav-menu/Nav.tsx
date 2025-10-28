 
import Link from "next/link";

export const Nav = () => {
  
  return (
     <nav className="  absolute top-0 left-0 w-full py-5  text-sm   flex justify-center items-center w-fsit z-20">
        <ul className="mx-5 mix-blend-difference uppercase font-bold flex gap-5">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/work">Work</Link>
          </li>
        </ul>
      </nav>
  );
};
