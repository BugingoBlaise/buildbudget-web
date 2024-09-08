import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";

function Modal({ toggleFunction, children, className }) {
  return (
    <main
      className={`fixed inset-0 flex items-center justify-center z-[100000] flex-col overflow-hidden`}
    >
      <div
        className="absolute inset-0 bg-gray-600 opacity-60 "
        onClick={toggleFunction}
      ></div>
      <div
        className={`bg-slate-100 border px-6 py-3 z-50 w-[40%] max-md:w-[90%] rounded-md ${className} relative `}
      >
        <button
          className="p-1 absolute -right-5 -top-5"
          onClick={toggleFunction}
        >
          <span className=" bg-black p-2 rounded-full text-whiteTheme-secondColor flex items-center">
            <IoClose size={20} />
          </span>
        </button>

        <div className="py-1 ">{children}</div>
      </div>
    </main>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  toggleFunction: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};
export default Modal;
