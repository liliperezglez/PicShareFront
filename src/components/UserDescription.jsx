import UserInfo from './UserInfo';

function UserDescription({ user }) {
  return (
    <div className='userDescription'>
      <UserInfo user={user} />
      <p> {user.description}</p>
    </div>
  );
}

export default UserDescription;
