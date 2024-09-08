import ActionBar from "./ActionBar";

const NavBar = () => {
  return (
    <nav className="bg-whiteTheme-secondColor  h-20 shadow-sm px-5 py-4 flex items-center sticky top-0 justify-between  ">
      <p className="text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-whiteTheme-textColor/90 to-whiteTheme-textColor/70 "></p>
      <div>
        <ActionBar />
      </div>
    </nav>
  );
};

export default NavBar;
