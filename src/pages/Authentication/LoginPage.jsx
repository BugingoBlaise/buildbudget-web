import FooterSection from "../Home/FooterSection";
import Navbar from "../home/Navbar";
import LoginForm from "./form/LoginForm";

const LoginPage = () => {
  return (
    <section className="w-full h-full">
      <Navbar />
      <div className="my-12 max-lg:mt-32 w-full h-screen flex justify-center items-center">
        <LoginForm />
      </div>
      <FooterSection />
    </section>
  );
};

export default LoginPage;
