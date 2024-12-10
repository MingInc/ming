import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.svg";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex shrink-0" aria-label="Ming Open Web Headquarters Logo">
      <Image className="rounded-md" src={logo} alt="Ming Open Web Headquarters Logo" width={30} height={30} />
    </Link>
  );
}
