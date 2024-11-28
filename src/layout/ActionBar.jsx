const ActionBar = () => {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  const removeSquareBrackets = (str) => {
    return str?.replace(/\[|\]/g, "");
  };

  const cleanedRole = removeSquareBrackets(role);
  return (
    <div className=" rounded-full flex items-center gap-4 p-2">
      <img
        src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        className="w-10 h-10 rounded-full border-2 border-whiteTheme-primaryColor"
      />
      <span className="flex flex-col">
        <h1 className="font-semibold text-base">{username}</h1>
        <p className="text-gray-500 text-sm">{cleanedRole}</p>
      </span>
    </div>
  );
};

export default ActionBar;
