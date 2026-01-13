import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "./UserProfile.css";

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: ""
  });

 
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to load profile", err);
        alert("Unable to load profile ❌");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);


  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  
  const handleSave = async () => {
    try {
      await api.put("/users/update", {
        name: user.name,
        email: user.email
      });

      setEditMode(false);
      alert("Profile updated successfully ✅");
    } catch (err) {
      console.error("Update failed", err);
      alert("Profile update failed ❌");
    }
  };

 
  if (loading) {
    return (
      <div style={{ padding: "30px", textAlign: "center" }}>
        <h3>Loading profile...</h3>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      <div className="profile-card">
     
        <div className="profile-avatar">
          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>

        {!editMode ? (
          <>
          
            <div className="profile-info">
              <p><b>Name:</b> {user.name}</p>
              <p><b>Email:</b> {user.email}</p>
              <p><b>Role:</b> {user.role}</p>
            </div>

            <button
              className="edit-btn"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <>
        
            <div className="profile-form">
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Name"
              />

              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>

            <div className="btn-group">
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>

              <button
                className="cancel-btn"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
