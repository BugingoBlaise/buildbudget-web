import { navLinks } from "../../../constants/navLinks";

const MobileMenu = () => {
  return (
    <section className="w-full bg-white border-2 border-whiteTheme-greenAccent max-md:py-36 z-[99] max-md:fixed flex flex-col justify-center">
      <nav className="w-full hidden  z-[400px] max-md:contents max-md:h-[100%]">
        <ul className="flex flex-col gap-5 items-center">
          {navLinks.map((link) => (
            <li key={link.name} className="text-[20px] font-medium">
              <a
                href={link.path}
                className={`${
                  location.hash === link.path
                    ? "text-green-700 font-semibold"
                    : "text-whiteTheme-textColor"
                } hover:text-green-700  cursor-pointer hover:font-semibold `}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default MobileMenu;
