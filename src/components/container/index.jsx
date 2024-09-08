import PropTypes from "prop-types";

const ContainerHolder = ({ children, className }) => {
  return (
    <div
      className={`${className} w-full px-28 py-4 max-lg:px-20 max-md:px-20 max-sm:px-6`}
    >
      {children}
    </div>
  );
};

ContainerHolder.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default ContainerHolder;
