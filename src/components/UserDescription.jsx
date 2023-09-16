import UserInfo from './UserInfo';

function UserDescription({ user }) {
  return (
    <div className='userDescription'>
      <UserInfo user={user} />
      <p> ---Descripción: {user.description}</p>
    </div>
  );
}

export default UserDescription;
