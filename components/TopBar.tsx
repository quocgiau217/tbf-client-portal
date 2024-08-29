const TopBar = () => {
  return (
    <header className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div>
        <button className="bg-red-600 px-4 py-2 rounded">Đăng xuất</button>
      </div>
    </header>
  );
};

export default TopBar;
