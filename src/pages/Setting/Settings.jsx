import React from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="settings-page">
      <div className="settings-container">
        <header className="settings-header">
          <h2 className="settings-title">Settings</h2>
          <p className="settings-subtitle">Manage your account and security preferences.</p>
        </header>

        <div className="settings-grid">
          <section className="settings-card">
            <div className="settings-card__top">
              <h3 className="settings-card__title">Security</h3>
              <p className="settings-card__desc">Update your password and protect your account.</p>
            </div>

            <button
              type="button"
              className="settings-btn settings-btn--primary"
              onClick={() => navigate("/change-password")}
            >
              Change password
            </button>
          </section>

          <section className="settings-card">
            <div className="settings-card__top">
              <h3 className="settings-card__title">More settings</h3>
              <p className="settings-card__desc">
                Future settings (profile, notifications, preferences) will appear here.
              </p>
            </div>

            <button type="button" className="settings-btn settings-btn--ghost" disabled>
              Coming soon
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
