import { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiShield,
} from "react-icons/fi";
import api from "../services/api";

interface User {
  id: number;
  name: string;
  email: string;
}

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await api.get("/users/profile");

        const data = response.data.user;

        setUser(data);
        setName(data.name);
      } catch (error) {
        console.error("Profile error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-slate-400">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20 text-red-500">
        Unable to load profile.
      </div>
    );
  }

  return (
    <div className="max-w-3xl">

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800">
          Profile
        </h1>

        <p className="text-slate-500 mt-1">
          Manage your personal information.
        </p>

      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-10">

          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-blue-600 text-3xl font-bold">

            {user.name.charAt(0).toUpperCase()}

          </div>

          <h2 className="text-white text-2xl font-bold mt-4">
            {user.name}
          </h2>

          <p className="text-blue-100">
            {user.email}
          </p>

        </div>

        <div className="p-8">

          <div className="space-y-6">

            <div>

              <label className="block text-sm font-semibold text-slate-600 mb-2">
                Full Name
              </label>

              <div className="relative">

                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            <div>

              <label className="block text-sm font-semibold text-slate-600 mb-2">
                Email
              </label>

              <div className="relative">

                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  value={user.email}
                  disabled
                  className="w-full border border-slate-200 bg-slate-50 text-slate-500 rounded-xl py-3 pl-11 pr-4"
                />

              </div>

            </div>

            <div className="flex items-start gap-3 bg-blue-50 rounded-xl p-4">

              <FiShield className="text-blue-600 mt-1" />

              <div>

                <p className="font-semibold text-blue-800">
                  Account Security
                </p>

                <p className="text-sm text-blue-600 mt-1">
                  Your account is protected using secure authentication.
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={() =>
                alert(
                  "Profile editing API will be connected next."
                )
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;