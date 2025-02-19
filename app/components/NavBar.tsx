import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-slate-100 text-black p-4 flex justify-between items-center shadow-md fixed top-0 left-0 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <Image src="/aibd.svg" alt="Logo" width={100} height={100} />
      </div>

      {/* Menu */}
      <ul className="flex space-x-6 text-lg font-medium">
        <li className="hover:text-gray-700 cursor-pointer">Dashbaord</li>
        <li className="hover:text-gray-700 cursor-pointer">Archive</li>
        <li className="hover:text-gray-700 cursor-pointer">Log</li>
        <li className="hover:text-gray-700 cursor-pointer">Parametres</li>
      </ul>
    </nav>
  );
}
