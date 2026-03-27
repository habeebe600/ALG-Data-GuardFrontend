import { useState } from 'react';
import './styles/Login.css';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function PasswordInput({ label, value, onChange, placeholder, required = false, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-field relative">
      <label className="auth-label">{label}</label>
      <div className="relative">
        <input
          className="auth-input pr-10"
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete="current-password"
          {...props}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeSlashIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}