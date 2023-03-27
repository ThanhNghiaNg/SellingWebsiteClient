import classesBanner from "../component/Banner/Banner.module.css";
import UserForm from "../component/UserForm/UserForm";
const LoginPage = (props) => {
  return (
    <div className={classesBanner.banner}>
      <UserForm isLogining={true} />
    </div>
  );
};

export default LoginPage;
