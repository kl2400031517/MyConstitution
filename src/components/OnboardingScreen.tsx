import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Scale } from 'lucide-react';

interface OnboardingScreenProps {
  onGetStarted: () => void;
}

export function OnboardingScreen({ onGetStarted }: OnboardingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-saffron/10 to-constitution-green/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardContent className="text-center space-y-8 p-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-navy-blue rounded-full flex items-center justify-center">
                <Scale className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-saffron rounded-full"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-constitution-green rounded-full"></div>
            </div>
          </div>

          {/* App Name */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-navy-blue">MyConstitution</h1>
            <div className="h-1 w-16 bg-gradient-to-r from-saffron via-white to-constitution-green mx-auto rounded"></div>
          </div>

          {/* Tagline */}
          <div className="space-y-4">
            <p className="text-lg text-gray-600 leading-relaxed">
              Learn Your Rights. Know Your Duties.
            </p>
            <p className="text-sm text-gray-500">
              Explore the Indian Constitution with interactive learning, role-based content, and community discussions.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-4 text-sm">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-saffron rounded-full"></div>
              <span>Fundamental Rights & Duties</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-constitution-green rounded-full"></div>
              <span>Interactive Quizzes</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-navy-blue rounded-full"></div>
              <span>Community Discussions</span>
            </div>
          </div>

          {/* Get Started Button */}
          <Button 
            onClick={onGetStarted}
            className="w-full bg-navy-blue hover:bg-navy-blue/90 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            size="lg"
          >
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}