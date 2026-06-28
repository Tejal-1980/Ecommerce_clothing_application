import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-xl mx-auto p-10">
      <div className="shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-bold mb-6">
          My Profile
        </h1>

        <p className="text-lg">
          Username:
        </p>

        <p className="text-2xl font-semibold">
          {user}
        </p>
      </div>
    </div>
  );
}

export default Profile;