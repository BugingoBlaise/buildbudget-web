import { useNavigate } from "react-router-dom";
import NotFoundImage from "../assets/404.svg";
import Button from "../components/Button";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <h1 className="text-whiteTheme-primaryColor font-semibold text-2xl">
        Page you are looking for, not found!
      </h1>
      <img src={NotFoundImage} className=" w-[30rem]" alt="Not found Image" />
      <Button
        value={"Back"}
        onClick={() => {
          navigate("/");
        }}
      />
    </div>
  );
};

export default NotFound;
