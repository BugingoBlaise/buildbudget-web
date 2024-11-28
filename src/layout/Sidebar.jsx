import { Link } from "react-router-dom";
import { sideBarLinks } from "../constants/sideBarLinks";
import { useLocation, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { navImage } from "../constants/images";
const SideBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/login");
  };

  function removeSquareBrackets(str) {
    return str.replace(/\[|\]/g, "");
  }

  const receivedRole = localStorage.getItem("role");
  const cleanedRole = removeSquareBrackets(receivedRole);

  const menuItems = sideBarLinks[cleanedRole] || [];

  return (
    <aside className="w-[20%] max-md:hidden max-w-[20%] py-6 px-8 flex flex-col gap-5 z-[9999] bg-whiteTheme-textColor text-whiteTheme-secondColor min-h-screen h-screen sticky">
      <header className="flex items-center justify-around">
        {/* <img
          src={navImage.logoRha}
          alt="logo"
          className="w-[60px] h-[40px]"
          onClick={() => {
            // navigate("/");
          }}
        /> */}
        <h1 className="font-bold text-2xl">
          Build <span className="text-whiteTheme-primaryColor">Budget</span>
        </h1>
      </header>
      <main className="mt-10 relative h-full">
        <ul className="flex flex-col gap-7">
          {menuItems?.map((links, index) => (
            <li
              key={index}
              className={`${
                pathname === links.path &&
                "p-3 bg-whiteTheme-primaryColor rounded-md hover:text-whiteTheme-secondColor"
              } hover:text-whiteTheme-primaryColor`}
            >
              <Link to={links.path} className="flex items-center gap-4">
                <span>
                  <links.icon size={22} />
                </span>
                <span className="text-base font-normal">{links.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <footer className="bottom-0">
        <span
          className="flex gap-3 items-center pb-2 cursor-pointer hover:text-whiteTheme-primaryColor"
          onClick={handleLogout}
        >
          <IoLogOutOutline size={22} />
          <p>Logout</p>
        </span>
        <hr className="border-slate-400" />
        <p className="text-sm pt-2 text-slate-300">Powered by RHA</p>
      </footer>
    </aside>
  );
};

export default SideBar;
