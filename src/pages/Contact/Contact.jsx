import React, { useState } from 'react';
import { submitContactForm } from '../../services/contactAPI';
import { validateContactForm, validateField } from '../../utils/contactValidation';
import './styles/Contact.css';

const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  company_name: '',
  job_title: '',
  phone_number: '',
  contact_method: '',
  area_of_interest: '',
  additional_comments: ''
};

export default function Contact() {
  const [form, setForm] = useState(initialState);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [e.target.name]: e.target.value });
  

  // Clear field error when user starts typing
  if (fieldErrors[name]) {
    setFieldErrors({ ...fieldErrors, [name]: '' });
  }
};

const handleBlur = (e) => {
  const { name, value } = e.target;
  const error = validateField(name, value);
  if (error) {
    setFieldErrors({ ...fieldErrors, [name]: error });
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess(false);

  // Validate form
  const validation = validateContactForm(form);

  if (!validation.isValid) {
    setFieldErrors(validation.errors);
    setError('Please fix the errors before submitting');
    return;
  }

  setLoading(true);

  try {
    await submitContactForm(form);
    setSuccess(true);
    setForm(initialState);
    setFieldErrors({});
  } catch (err) {
    if (err.errors) {
      setFieldErrors(err.errors);
      setError('Please fix the errors and try again');
    } else {
      setError(err.error || 'Submission failed. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};

return (
  <>
    <div className="contact-top-black-strip">
      {/* Optionally include your logo and text here, or leave empty for pure black */}
    </div>

    <div className="contact-page-container">
      <section className="contact-info-panel">
        <h1>Let’s get you to the right place.</h1>
        <p>
          Let us know what you need or how we can help.
          Just send us a message and we’ll connect you with the right person, right away.
        </p>
        <div>
          <strong>CORPORATE HEADQUARTERS</strong><br />
          16, 7171 Torbram Road,<br />
          Mississauga, ON L4T 3W4<br />
        </div>
        <div style={{ marginBottom: '1.2rem' }}>
          <strong>PHONE</strong><br />
          <a className="contact-link" href="tel:+14452849083">📞 +14452849083</a>
        </div>
        <div>
          <strong>CONNECT</strong>
          {/* Social Media Icons */}
          <div className="social-links">
            <a
              href="https://linkedin.com/in/alg-dataguard-48838a37a"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-links"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="contact-social-icon">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://x.com/ALGDataguard"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-links"
              aria-label="Twitter"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="contact-social-icon">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://youtube.com/@ALGDataguard"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-links"
              aria-label="YouTube"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="contact-social-icon">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      <section className="contact-form-panel">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="first_name">First Name: *</label>
            <input id="first_name"
              name="first_name"
              type="text"
              value={form.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              className={fieldErrors.first_name ? 'error' : ''} />
            {fieldErrors.first_name && (
              <span className="field-error">{fieldErrors.first_name}</span>
            )}
          </div>
          <div>
            <label htmlFor="last_name">Last Name: *</label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              value={form.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              className={fieldErrors.last_name ? 'error' : ''}
            />
            {fieldErrors.last_name && (
              <span className="field-error">{fieldErrors.last_name}</span>
            )}
          </div>
          <div>
            <label htmlFor="email">Email Address: *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              className={fieldErrors.email ? 'error' : ''}
            />
            {fieldErrors.email && (
              <span className="field-error">{fieldErrors.email}</span>
            )}          </div>
          <div>
            <label htmlFor="company_name">Company Name: *</label>
            <input
              id="company_name"
              name="company_name"
              type="text"
              value={form.company_name}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              className={fieldErrors.company_name ? 'error' : ''}
            />
            {fieldErrors.company_name && (
              <span className="field-error">{fieldErrors.company_name}</span>
            )}          </div>
          <div>
            <label htmlFor="job_title">Job Title: *</label>
            <input
              id="job_title"
              name="job_title"
              type="text"
              value={form.job_title}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              className={fieldErrors.job_title ? 'error' : ''}
            />
            {fieldErrors.job_title && (
              <span className="field-error">{fieldErrors.job_title}</span>
            )}          </div>
          <div>
            <label htmlFor="phone_number">Phone Number:</label>
            <input
              id="phone_number"
              name="phone_number"
              type="tel"
              value={form.phone_number}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              className={fieldErrors.phone_number ? 'error' : ''}
            />
            {fieldErrors.phone_number && (
              <span className="field-error">{fieldErrors.phone_number}</span>
            )}          </div>
          <div>
            <label htmlFor="contact_method">Contact Method: *</label>
            <select
              id="contact_method"
              name="contact_method"
              value={form.contact_method}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              className={fieldErrors.contact_method ? 'error' : ''}
            >
              <option value="">Select Contact Method</option>
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
            </select>
            {fieldErrors.contact_method && (
              <span className="field-error">{fieldErrors.contact_method}</span>
            )}
          </div>
          <div>
            <label htmlFor="area_of_interest">Area of Interest:</label>
            <select name="area_of_interest" value={form.area_of_interest} onChange={handleChange} placeholder="Area of Interest" required>
              <option value="">Select Area of Interest</option>
              <option >Design and Deployment</option>
              <option >Network Audit</option>
              <option >Business Strategy</option>
              <option >Technical Recruiters</option>
              <option >Support & Training</option>
              <option >Help finding Ideal Colocation</option>
            </select>
          </div>
          <div>
            <label htmlFor="additional_comments">Additional Information or Comments:</label>
            <textarea
              id="additional_comments"
              name="additional_comments"
              value={form.additional_comments}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="4"
              disabled={loading}
              className={fieldErrors.additional_comments ? 'error' : ''}
            />
            {fieldErrors.additional_comments && (
              <span className="field-error">{fieldErrors.additional_comments}</span>
            )}          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>

          {success && (
            <div className="contact-success">
              Thank you! Your message has been sent successfully.
            </div>
          )}
          {error && (
            <div className="contact-error">{error}</div>
          )}
        </form>
      </section>
    </div>
  </>
);
}
