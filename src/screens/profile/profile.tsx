import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import "./profile.css"; // Import the CSS file

const Profile = () => {
  const userToken = useSelector((state: RootState) => state.loginReducer.token);
  const username = useSelector(
    (state: RootState) => state.loginReducer.username
  );
  const userId = useSelector((state: RootState) => state.loginReducer.userId);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!newPassword.trim()) {
      setError("New Password cannot be empty.");
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open(
      "PATCH",
      `http://localhost:9090/users/${userId}?token=${userToken}`,
      true
    );
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          alert("Password changed successfully!");
        } else {
          setError("Failed to change password.");
        }
      }
    };

    const data = JSON.stringify({ password: newPassword });
    xhr.send(data);
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">{username}'s profile</h2>

      {error && (
        <p className="error-message" style={{ color: "red" }}>
          {error}
        </p>
      )}

      <div className="profile-form">
        <label>New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="profile-input"
        />
      </div>

      <div className="profile-form">
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="profile-input"
        />
      </div>

      <button onClick={handleUpdatePassword} className="profile-button">
        Update Password
      </button>
    </div>
  );
};

export default Profile;
