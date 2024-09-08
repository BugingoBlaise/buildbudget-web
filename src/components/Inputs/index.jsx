import { forwardRef } from "react";
import PropTypes from "prop-types";

const Input = forwardRef(
  (
    {
      type = null,
      className = "",
      placeholder,
      onChange,
      required = false,
      defaultValue,
    },
    ref
  ) => {
    return (
      <>
        <input
          ref={ref}
          type={type || "text"}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange}
          className={`${className} border-[1px] border-whiteTheme-primaryColor rounded-md p-3 w-full focus:outline-none focus:border-2 focus:border-whiteTheme-primaryColor transition:all duration-100 ease-out-in dark:bg-darkTheme-borderColor`}
        />
      </>
    );
  }
);
Input.displayName = "Input";
Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default Input;
