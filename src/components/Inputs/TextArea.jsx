import PropTypes from "prop-types";
import { forwardRef } from "react";

const TextArea = forwardRef(
  (
    {
      cols = 50,
      rows = 3,
      className,
      defaultValue = null,
      resize = false,
      onChange,
      placeholder = null,
      required = false,
      readonly,
      onBlur,
    },
    ref
  ) => {
    return (
      <textarea
        cols={cols}
        rows={rows}
        ref={ref}
        required={required}
        readOnly={readonly}
        placeholder={placeholder}
        className={`dark:bg-darkTheme-borderColor border-[1px] border-whiteTheme-primaryColor rounded-md p-3 w-full focus:outline-none focus:border-2 focus:border-whiteTheme-primaryColor transition:all duration-100 ease-out-in ${
          resize ? null : "resize-none"
        } ${className}`}
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={defaultValue && defaultValue}
      ></textarea>
    );
  }
);

TextArea.displayName = "TextArea";

TextArea.propTypes = {
  cols: PropTypes.number,
  rows: PropTypes.number,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  resize: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  readonly: PropTypes.bool,
  onBlur: PropTypes.func,
  label: PropTypes.string,
};

export default TextArea;
