const NavBar = () => {
  return (
    <div className="lg:hidden z-30 bg-white shadow-md border-b border-gray-300 ">
      <div className="flex flex-col xs:flex-row justify-between items-center gap-4 p-4">
        {/* Left side - Welcome and Role */}
        <div className="flex flex-col items-center xs:items-start ml-12">
          <p className="text-[20px] font-bold text-black">Welcome, Mustafa</p>
          <p className="text-[14px] text-[#7C7C7C] uppercase">Admin</p>
        </div>

        {/* Right side  */}
        <div className="flex items-center gap-4">
          <ul className="flex gap-4">
            <li>
              <button className="hover:bg-slate-100 p-2 rounded-lg">statistics</button>
            </li>
            <li>
              <button className="hover:bg-slate-100 p-2 rounded-lg">Main Slider</button>
            </li>
            <li>
              <button className="hover:bg-slate-100 p-2 rounded-lg">About Us</button>
            </li>
            <li>
              <button className="hover:bg-slate-100 p-2 rounded-lg">Portfolio</button>
            </li>
            <li>
              <button className="hover:bg-slate-100 p-2 rounded-lg">Blog</button>
            </li>
            <li>
              <button className="hover:bg-slate-100 p-2 rounded-lg">Reviews</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
