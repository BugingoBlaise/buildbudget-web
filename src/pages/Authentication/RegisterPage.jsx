import { useState } from "react";
import FooterSection from "../home/FooterSection";
import Navbar from "../home/Navbar";
import RegisterContractorForm from "./form/RegisterContractorForm";
import RegisterSupplier from "./form/RegisterSupplierForm";
import RegisterCitizenForm from "./form/RegisterCitizenForm";

const RegisterPage = () => {
  const [pageChanger, setPageChanger] = useState("citizen");
  return (
    <section className="w-full h-full">
      <Navbar />
      <div className="my-40 flex flex-col justify-center items-center gap-3">
        {" "}
        <h2 className="text-3xl font-bold text-gray-800">Register as:</h2>
        <div className="py-8 flex gap-4 items-center">
          <span
            className={`cursor-pointer ${
              pageChanger === "citizen"
                ? "bg-whiteTheme-primaryColor text-white p-2 rounded-md font-bold"
                : "font-medium   space-y-2  "
            }`}
            onClick={() => {
              setPageChanger("citizen");
            }}
          >
            <p>Citizen</p>
          </span>
          <span
            className={`cursor-pointer ${
              pageChanger === "contractor"
                ? "bg-whiteTheme-primaryColor text-white p-2 rounded-md font-bold"
                : "font-medium  space-y-2  "
            }`}
            onClick={() => {
              setPageChanger("contractor");
            }}
          >
            <p>Contractor</p>
          </span>
          <span
            className={`cursor-pointer ${
              pageChanger === "supplier"
                ? "bg-whiteTheme-primaryColor text-white p-2 rounded-md font-bold"
                : "font-medium   space-y-2  "
            }`}
            onClick={() => {
              setPageChanger("supplier");
            }}
          >
            <p>Supplier</p>
          </span>
        </div>
        {pageChanger === "citizen" && (
          <div className=" max-lg:mt-52 w-full h-sfull flex justify-center items-center">
            <RegisterCitizenForm />
          </div>
        )}
        {pageChanger === "contractor" && (
          <div className=" max-lg:mt-52 w-full h-full flex justify-center items-center">
            <RegisterContractorForm />
          </div>
        )}
        {pageChanger === "supplier" && (
          <div className=" max-lg:mt-52 w-full h-full flex justify-center items-center">
            <RegisterSupplier />
            {/* <p>Supplier registration page</p> */}
          </div>
        )}
      </div>
      <FooterSection />
    </section>
  );
};

export default RegisterPage;
