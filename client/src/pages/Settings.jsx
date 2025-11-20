import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateUser, changePassword, deleteAccount } from "../api";

export default function Settings() {
  const { user, logout } = useContext(AuthContext);

  // Editable fields
  const [username, setUsername] = useState(user.username);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Notifications
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // For delete confirmation popup
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await updateUser(user.id, { username });

      setMessage("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await changePassword({
        userId: user.id,
        oldPassword,
        newPassword,
      });

      setMessage("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setError("Incorrect old password.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(user.id);
      logout();
      window.location.href = "/";
    } catch (err) {
      setError("Failed to delete account.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 border rounded shadow space-y-8">

      <h1 className="text-3xl font-bold">Account Settings ⚙️</h1>

      {/* Messages */}
      {message && (
        <p className="text-green-600 bg-green-50 p-3 rounded border border-green-300">
          {message}
        </p>
      )}
      {error && (
        <p className="text-red-600 bg-red-50 p-3 rounded border border-red-300">
          {error}
        </p>
      )}

      {/* ====================== PROFILE INFO ====================== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input
              disabled
              value={user.email}
              className="w-full p-3 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </section>

      {/* ====================== PASSWORD CHANGE ====================== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Change Password 🔐</h2>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-3 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            Update Password
          </button>
        </form>
      </section>

      {/* ====================== DELETE ACCOUNT ====================== */}
      <section className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-4 text-red-600">
          Danger Zone ❗
        </h2>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete My Account
        </button>
      </section>

      {/* ====================== DELETE CONFIRMATION MODAL ====================== */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to permanently delete your account?  
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
