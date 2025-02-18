export default function Sidebar() {
    return (
      <div className="h-screen w-64 bg-gray-800 text-white p-5">
        <h2 className="text-xl font-bold">📹 CCTV</h2>
        <nav className="mt-5">
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
  