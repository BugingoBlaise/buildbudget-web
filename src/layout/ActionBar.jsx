const ActionBar = () => {
  return (
    <div className=" rounded-full flex items-center gap-4 p-2">
      <img
        src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        className="w-10 h-10 rounded-full border-2 border-whiteTheme-primaryColor"
      />
      <span className="flex flex-col">
        <h1 className="font-semibold text-base">Nishimwe John</h1>
        <p className="text-gray-500 text-sm">Admin</p>
      </span>
    </div>
  );
};

export default ActionBar;
