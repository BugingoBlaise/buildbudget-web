import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { footerData } from "../../constants/footerData";
// import { footerData } from "../../constants/FooterData";

const FooterSection = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 60000); // Update every minute to account for potential timezone changes

    return () => clearInterval(intervalId); // Cleanup the interval
  }, []); // Empty dependency array to run effect only once

  return (
    <footer className="w-full min-h-full h-full bg-whiteTheme-primaryColor text-whiteTheme-secondColor">
      <main className="flex flex-col gap-6 items-center justify-center py-5 ">
        <h1 className="text-2xl font-semibold">Follow us</h1>
        <ul className="flex gap-8">
          {footerData.socialLinks.map((socialLink, index) => (
            <li key={index}>
              <Link to={socialLink.url}>
                <socialLink.icon
                  size={35}
                  className="p-2 rounded-md bg-blue-200 text-whiteTheme-primaryColor"
                />
              </Link>
            </li>
          ))}
        </ul>
      </main>{" "}
      <hr className="border-[1px] border-blue-400 opacity-20" />
      <div className="flex flex-col gap-6 items-center justify-center mt-3 py-2 text-sm">
        <p>Copyright © {currentYear} Budget Build. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterSection;
