import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const newErrors = {};
    if (formData.fullName.length < 2) newErrors.fullName = 'Name must be at least 2 characters';
    if (!formData.email.includes('@')) newErrors.email = 'Please enter a valid email';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (formData.phone.length < 10) newErrors.phone = 'Please enter a valid phone number';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-800 to-indigo-900 px-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-xl shadow-xl w-full max-w-md text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder:text-white/70"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder:text-white/70"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Phone</label>
            <input
              type="tel"
              className="w-full px-4 py-2 border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder:text-white/70"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full px-4 py-2 border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder:text-white/70"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs text-purple-200 mt-1"
            >
              {showPassword ? 'Hide' : 'Show'} Password
            </button>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="w-full px-4 py-2 border border-white/30 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder:text-white/70"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              placeholder="Re-enter your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-xs text-purple-200 mt-1"
            >
              {showConfirmPassword ? 'Hide' : 'Show'} Password
            </button>
            {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            {isLoading ? 'Creating...' : 'Sign Up'}
          </button>

          <p className="text-sm text-center text-white/80">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-300 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
