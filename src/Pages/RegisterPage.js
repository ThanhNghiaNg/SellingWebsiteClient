import classesBanner from "../component/Banner/Banner.module.css";
import UserForm from "../component/UserForm/UserForm";
const RegisterPage = (props) => {
  return (
    <div className={classesBanner.banner}>
      <UserForm isLogining={false} />
    </div>
  );
};

export default RegisterPage;
