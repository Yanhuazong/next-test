import Link from 'next/link';
import Image from 'next/image';
import { auth} from '@/auth'; 
import { redirect } from 'next/dist/server/api-utils';

const Navbar = async() => {
    const session = await auth();

  return (
    <header className="px-5 py-3 bg-black shadow-sm font-work-sans text-white">
        <nav className="flex justify-between items-center">
        <Link href="/" >
            <Image
                src="/vercel.svg"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
            />
        </Link>
        <div className="flex justify-end items-center gap-5">
            {session && session.user ? (
                <>
                    <Link href="/startup/create">
                        <span>Create</span>
                    </Link>
                    {/* frontend, backend form action iddn't work */}
                    <Link href="/api/auth/signout">
                        <span>Logout</span>
                    </Link>
                    <Link href={`/user/${session.user.name}`}>
                        <span>{session.user.name}</span>
                    </Link>
                </>
                ) : (
                    <Link href="/api/auth/signin?callbackUrl=/">
                        <span>Login</span>
                    </Link>
                )}
        </div>
        </nav>
    </header>
  );
}
export default Navbar;