import Link from 'next/link';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul className="p-4">
        <li className="mb-4">
          <Link href="/dashboard/projects" className="text-lg">
            Tổng quan
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/dashboard/projects" className="text-lg">
            Dự án
          </Link>
        </li>
        <li>
          <Link href="/dashboard/settings" className="text-lg">
            Cài đặt
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
