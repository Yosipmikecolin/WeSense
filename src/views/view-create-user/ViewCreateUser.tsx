import FormUser from "./components/form-user/FormUser";
import classes from "./ViewCreateUser.module.css";

const ViewCreateUser = () => {
  return (
    <div className={classes.container}>
      <FormUser />
    </div>
  );
};

export default ViewCreateUser;
