import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <h1>Change your password here</h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
