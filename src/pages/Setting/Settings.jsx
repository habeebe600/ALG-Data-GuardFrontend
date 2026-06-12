import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';
import { useAuth } from '../../context/AuthContext';
import { updateMyProfile } from '../../services/profileService';

const emptyAddressForm = {
  nickname: '',
  companyName: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  defaultShipping: false,
};

export default function Settings() {
  const navigate = useNavigate();
  const { user, updateUser, fetchMe, loading } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [form, setForm] = useState({
    name: '',
    jobTitle: '',
    phoneNumber: '',
    email: '',
    address: '',
  });

  const [addressForm, setAddressForm] = useState(emptyAddressForm);

  useEffect(() => {
    if (!user) {
      fetchMe?.();
    }
  }, [user, fetchMe]);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        jobTitle: user.jobTitle || '',
        phoneNumber: user.phoneNumber || '',
        email: user.email || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEditToggle = () => {
    setError('');
    setMessage('');
    setIsEditing((prev) => !prev);
  };

  const handleCancel = () => {
    if (user) {
      setForm({
        name: user.name || '',
        jobTitle: user.jobTitle || '',
        phoneNumber: user.phoneNumber || '',
        email: user.email || '',
        address: user.address || '',
      });
    }

    setError('');
    setMessage('');
    setIsEditing(false);
  };

  const openAddressModal = () => {
    setAddressForm(emptyAddressForm);
    setShowAddressModal(true);
  };

  const handleAddressSave = async () => {
    const locationLine = [addressForm.city, addressForm.state, addressForm.zip]
      .filter(Boolean)
      .join(', ');

    const formattedAddress = [
      addressForm.nickname && `Nickname: ${addressForm.nickname}`,
      addressForm.companyName,
      addressForm.address1,
      addressForm.address2,
      locationLine,
      addressForm.defaultShipping ? 'Default Shipping Address' : '',
    ]
      .filter(Boolean)
      .join('\n');

    const updatedForm = {
      ...form,
      address: formattedAddress,
    };

    setSaving(true);
    setError('');
    setMessage('');

    try {
      const res = await updateMyProfile(updatedForm);

      if (res?.user) {
        setForm(updatedForm);
        updateUser(res.user);
        setMessage('Address updated successfully.');
        setShowAddressModal(false);
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update address.');
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');

    try {
      const res = await updateMyProfile(form);

      if (res?.user) {
        updateUser(res.user);
        setMessage('Profile updated successfully.');
        setIsEditing(false);
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="settings-page">
        <div className="settings-shell">
          <p className="settings-loading">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page">
      <div className="settings-shell">
        <div className="settings-header">
          <h1 className="settings-page-title">Account settings</h1>
        </div>

        <section className="settings-section">
          <div className="settings-section__top">
            <h2 className="settings-section__title">Profile Information</h2>

            {!isEditing ? (
              <button
                type="button"
                className="settings-link-btn"
                onClick={handleEditToggle}
              >
                Edit Profile
              </button>
            ) : (
              <button
                type="button"
                className="settings-link-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>

          {message ? (
            <div className="settings-alert settings-alert--success">{message}</div>
          ) : null}

          {error ? (
            <div className="settings-alert settings-alert--error">{error}</div>
          ) : null}

          {!isEditing ? (
            <div className="settings-info-grid">
              <div className="settings-info-item">
                <span className="settings-label">Full Name</span>
                <p className="settings-value">{user?.name || '—'}</p>
              </div>

              <div className="settings-info-item">
                <span className="settings-label">Job Title</span>
                <p className="settings-value">{user?.jobTitle || '—'}</p>
              </div>

              <div className="settings-info-item">
                <span className="settings-label">Phone Number</span>
                <p className="settings-value">{user?.phoneNumber || '—'}</p>
              </div>

              <div className="settings-info-item">
                <span className="settings-label">Email Address</span>
                <p className="settings-value">{user?.email || '—'}</p>
              </div>

              <div className="settings-info-item settings-info-item--full">
                <span className="settings-label">Address</span>
                <div className="settings-address-display">
                  {user?.address || 'No address added yet.'}
                </div>
                <div className="settings-address-actions">
                  <button
                    type="button"
                    className="settings-link-btn"
                    onClick={openAddressModal}
                  >
                    {user?.address ? 'Edit Address' : 'Add Address'}
                  </button>
                </div>
              </div>

              <div className="settings-password-row">
                <div>
                  <span className="settings-label">Password</span>
                  <p className="settings-value">************</p>
                </div>

                <button
                  type="button"
                  className="settings-password-link"
                  onClick={() => navigate('/change-password')}
                >
                  Change Password
                </button>
              </div>
            </div>
          ) : (
            <form className="settings-form" onSubmit={handleSave}>
              <div className="settings-form-grid">
                <div className="settings-field">
                  <label className="settings-field__label" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="settings-field__input"
                    required
                  />
                </div>

                <div className="settings-field">
                  <label className="settings-field__label" htmlFor="jobTitle">
                    Job Title
                  </label>
                  <input
                    id="jobTitle"
                    type="text"
                    name="jobTitle"
                    value={form.jobTitle}
                    onChange={handleChange}
                    className="settings-field__input"
                  />
                </div>

                <div className="settings-field">
                  <label className="settings-field__label" htmlFor="phoneNumber">
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    type="text"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    className="settings-field__input"
                  />
                </div>

                <div className="settings-field">
                  <label className="settings-field__label" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="settings-field__input"
                    required
                  />
                </div>

                <div className="settings-field settings-field--full">
                  <label className="settings-field__label">Address</label>
                  <div className="settings-address-display">
                    {form.address || 'No address added yet.'}
                  </div>
                  <div className="settings-address-actions">
                    <button
                      type="button"
                      className="settings-btn settings-btn--secondary"
                      onClick={openAddressModal}
                    >
                      {form.address ? 'Edit Address' : 'Add Address'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="settings-form-actions">
                <button
                  type="button"
                  className="settings-btn settings-btn--secondary"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="settings-btn settings-btn--primary"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>

      {showAddressModal && (
        <div
          className="settings-address-modal__backdrop"
          onClick={() => setShowAddressModal(false)}
        >
          <div
            className="settings-address-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="settings-address-modal__header">
              <h3>Add an Address</h3>
              <button
                type="button"
                onClick={() => setShowAddressModal(false)}
                aria-label="Close address modal"
              >
                ×
              </button>
            </div>

            <div className="settings-address-modal__body">
              <div className="settings-field settings-field--full">
                <label className="settings-field__label" htmlFor="nickname">
                  Address Nickname
                </label>
                <input
                  id="nickname"
                  type="text"
                  name="nickname"
                  value={addressForm.nickname}
                  onChange={handleAddressChange}
                  className="settings-field__input"
                />
              </div>

              <div className="settings-field settings-field--full">
                <label className="settings-field__label" htmlFor="companyName">
                  Company Name
                </label>
                <input
                  id="companyName"
                  type="text"
                  name="companyName"
                  value={addressForm.companyName}
                  onChange={handleAddressChange}
                  className="settings-field__input"
                />
              </div>

              <div className="settings-field settings-field--full">
                <label className="settings-field__label" htmlFor="address1">
                  Address 1
                </label>
                <input
                  id="address1"
                  type="text"
                  name="address1"
                  value={addressForm.address1}
                  onChange={handleAddressChange}
                  className="settings-field__input"
                />
              </div>

              <div className="settings-field settings-field--full">
                <label className="settings-field__label" htmlFor="address2">
                  Address 2 (Optional)
                </label>
                <input
                  id="address2"
                  type="text"
                  name="address2"
                  value={addressForm.address2}
                  onChange={handleAddressChange}
                  className="settings-field__input"
                />
              </div>

              <div className="settings-address-grid">
                <div className="settings-field">
                  <label className="settings-field__label" htmlFor="city">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={addressForm.city}
                    onChange={handleAddressChange}
                    className="settings-field__input"
                  />
                </div>

                <div className="settings-field">
                  <label className="settings-field__label" htmlFor="state">
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    name="state"
                    value={addressForm.state}
                    onChange={handleAddressChange}
                    className="settings-field__input"
                  />
                </div>

                <div className="settings-field">
                  <label className="settings-field__label" htmlFor="zip">
                    ZIP
                  </label>
                  <input
                    id="zip"
                    type="text"
                    name="zip"
                    value={addressForm.zip}
                    onChange={handleAddressChange}
                    className="settings-field__input"
                  />
                </div>
              </div>

            </div>

            <div className="settings-form-actions settings-form-actions--modal">
              <button
                type="button"
                className="settings-btn settings-btn--secondary"
                onClick={() => setShowAddressModal(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="settings-btn settings-btn--primary"
                onClick={handleAddressSave}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}