import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Scale } from 'lucide-react';
import type { User, UserRole } from '../types';

interface LoginScreenProps {
  onLogin: (user: User) => void;
  onBack: () => void;
}

export function LoginScreen({ onLogin, onBack }: LoginScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '' as UserRole | ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation for login
    if (isLogin) {
      if (formData.email && formData.password) {
        const userData: User = {
          name: formData.email.split('@')[0],
          email: formData.email,
          role: 'Citizen', // Default role for login
          password: formData.password
        };
        onLogin(userData);
      }
    } else {
      // Validation for signup
      if (formData.name && formData.email && formData.password && formData.role) {
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
        if (formData.password.length < 6) {
          alert('Password must be at least 6 characters long!');
          return;
        }
        const userData: User = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          password: formData.password
        };
        onLogin(userData);
      }
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Clear form when switching modes
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-saffron/10 to-constitution-green/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="flex items-center space-x-2 text-navy-blue hover:bg-navy-blue/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>

        <Card className="shadow-2xl">
          <CardHeader className="text-center space-y-4">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-navy-blue rounded-full flex items-center justify-center">
                <Scale className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-navy-blue">
              {isLogin ? 'Welcome Back' : 'Join MyConstitution'}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="border-gray-300 focus:border-navy-blue"
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="border-gray-300 focus:border-navy-blue"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="border-gray-300 focus:border-navy-blue"
                  required
                />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="border-gray-300 focus:border-navy-blue"
                    required
                  />
                </div>
              )}

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select onValueChange={(value) => handleInputChange('role', value as UserRole)}>
                    <SelectTrigger className="border-gray-300 focus:border-navy-blue">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Educator">Educator</SelectItem>
                      <SelectItem value="Citizen">Citizen</SelectItem>
                      <SelectItem value="Legal Expert">Legal Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Button 
                type="submit"
                className="w-full bg-navy-blue hover:bg-navy-blue/90 text-white"
                size="lg"
              >
                {isLogin ? 'Login' : 'Register'}
              </Button>
            </form>

            {/* Toggle Login/Register */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <Button
                variant="link"
                onClick={toggleMode}
                className="text-navy-blue p-0 h-auto"
              >
                {isLogin ? 'Sign up here' : 'Login here'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}