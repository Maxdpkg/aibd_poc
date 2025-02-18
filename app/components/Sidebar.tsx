import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-5 flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center mb-5">
        <Image src="/aibd.svg" alt="Logo" width={200} height={200} />
      </div>

      {/* Menu */}
      <nav className="flex-1">
        <ul>
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">
            Watching
          </li>
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">
            Archive
          </li>
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">
            Videowall
          </li>
          <li className="p-2 hover:bg-gray-700 rounded cursor-pointer">
            Files
          </li>
        </ul>
      </nav>
    </div>
  );
}
