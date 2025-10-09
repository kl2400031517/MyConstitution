import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Navigation } from './Navigation';
import { Progress } from './ui/progress';
import { 
  Brain,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
  Clock,
  TrendingUp,
  History
} from 'lucide-react';
import { Badge } from './ui/badge';
import type { User, Screen } from '../types';
import { StorageUtils } from '../utils/storage';

interface QuizScreenProps {
  user: User | null;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export function QuizScreen({ user, onNavigate, onLogout }: QuizScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [quizHistory, setQuizHistory] = useState({});
  const [showHistory, setShowHistory] = useState(false);

  // Get quiz history from localStorage
  useEffect(() => {
    const history = StorageUtils.getQuizHistory();
    setQuizHistory(history);
  }, []);

  // Timer for quiz
  useEffect(() => {
    if (!quizCompleted && !showResult) {
      const timer = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizCompleted, showResult]);

  const questions: Question[] = [
    {
      id: 1,
      question: "How many fundamental rights are guaranteed by the Indian Constitution?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 1,
      explanation: "The Indian Constitution guarantees 6 fundamental rights: Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and Right to Constitutional Remedies.",
      category: "Fundamental Rights"
    },
    {
      id: 2,
      question: "Which article is known as the 'Heart and Soul' of the Constitution?",
      options: ["Article 14", "Article 19", "Article 21", "Article 32"],
      correctAnswer: 3,
      explanation: "Article 32 (Right to Constitutional Remedies) is called the 'Heart and Soul' of the Constitution by Dr. B.R. Ambedkar as it provides the right to approach the Supreme Court for enforcement of fundamental rights.",
      category: "Constitutional Remedies"
    },
    {
      id: 3,
      question: "How many fundamental duties are mentioned in the Indian Constitution?",
      options: ["10", "11", "12", "13"],
      correctAnswer: 1,
      explanation: "There are 11 fundamental duties mentioned in Article 51A of the Constitution, added by the 42nd Amendment Act in 1976.",
      category: "Fundamental Duties"
    },
    {
      id: 4,
      question: "The concept of 'Rule of Law' is taken from which country?",
      options: ["USA", "UK", "France", "Canada"],
      correctAnswer: 1,
      explanation: "The concept of 'Rule of Law' is borrowed from the United Kingdom (England). It means that law is supreme and everyone is equal before the law.",
      category: "Constitutional Concepts"
    },
    {
      id: 5,
      question: "Which part of the Constitution deals with Directive Principles of State Policy?",
      options: ["Part II", "Part III", "Part IV", "Part V"],
      correctAnswer: 2,
      explanation: "Part IV (Articles 36-51) of the Constitution deals with Directive Principles of State Policy, which are guidelines for the government in policy-making.",
      category: "Directive Principles"
    }
  ];

  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showExplanation) {
      setSelectedAnswer(answerIndex);
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestion] = answerIndex;
      setUserAnswers(newAnswers);
    }
  };

  const handleSubmitAnswer = () => {
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(userAnswers[currentQuestion + 1]);
      setShowExplanation(false);
    } else {
      // Quiz completed - calculate score and save to localStorage
      const correctAnswers = userAnswers.filter((answer, index) => 
        answer === questions[index].correctAnswer
      ).length;
      const finalScore = Math.round((correctAnswers / questions.length) * 100);
      
      // Save quiz result
      const quizId = `constitution-quiz-${new Date().toISOString().split('T')[0]}`;
      StorageUtils.saveQuizResult(quizId, finalScore, timeSpent);
      
      setScore(finalScore);
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(userAnswers[currentQuestion - 1]);
      setShowExplanation(userAnswers[currentQuestion - 1] !== null);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers(new Array(questions.length).fill(null));
    setShowExplanation(false);
    setQuizCompleted(false);
    setTimeLeft(300);
    setTimeSpent(0);
    setScore(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };


  if (quizCompleted) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation 
          currentScreen="quiz" 
          onNavigate={onNavigate} 
          onLogout={onLogout} 
          user={user} 
        />
        
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="text-center py-12">
              <div className="mb-6">
                <Trophy className="w-16 h-16 text-saffron mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-navy-blue mb-2">Quiz Completed!</h2>
                <p className="text-gray-600">Great job, {user?.name}!</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8 mb-6">
                <div className="text-6xl font-bold text-navy-blue mb-2">{percentage}%</div>
                <p className="text-lg text-gray-600 mb-4">
                  You scored {score} out of {questions.length} questions correctly
                </p>
                
                <div className="flex justify-center space-x-8 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-constitution-green">{score}</div>
                    <div className="text-gray-600">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500">{questions.length - score}</div>
                    <div className="text-gray-600">Incorrect</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-navy-blue">{questions.length}</div>
                    <div className="text-gray-600">Total</div>
                  </div>
                </div>
              </div>
              
              <div className="space-x-4">
                <Button 
                  onClick={resetQuiz}
                  className="bg-navy-blue hover:bg-navy-blue/90 text-white"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Quiz
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => onNavigate('home')}
                >
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isCorrect = selectedAnswer === currentQ.correctAnswer;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentScreen="quiz" 
        onNavigate={onNavigate} 
        onLogout={onLogout} 
        user={user} 
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Quiz Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-navy-blue">Constitutional Quiz</h1>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center space-x-2"
              >
                <History className="w-4 h-4" />
                <span>History</span>
              </Button>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>
              <Badge className="bg-saffron/20 text-saffron">
                Question {currentQuestion + 1} of {questions.length}
              </Badge>
            </div>
          </div>

          {/* Quiz History */}
          {showHistory && (
            <Card className="mb-6 border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-navy-blue" />
                  <span>Your Quiz History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(quizHistory).length === 0 ? (
                  <p className="text-gray-600 text-center py-4">No quiz history yet. Take your first quiz!</p>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(quizHistory).map(([quizId, result]) => (
                      <div key={quizId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{quizId.replace('constitution-quiz-', 'Quiz - ')}</p>
                          <p className="text-sm text-gray-600">
                            {result.attempts} attempt{result.attempts > 1 ? 's' : ''} • 
                            Best: {result.bestScore}% • 
                            Time: {formatTime(result.timeTaken)}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${
                            result.bestScore >= 80 ? 'text-green-600' : 
                            result.bestScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {result.bestScore}%
                          </div>
                          <p className="text-xs text-gray-500">
                            {new Date(result.lastAttempt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="border-0 shadow-lg mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-navy-blue border-navy-blue">
                {currentQ.category}
              </Badge>
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-600">Constitutional Knowledge</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">{currentQ.question}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQ.options.map((option, index) => {
                let buttonClass = "p-4 text-left border-2 rounded-lg transition-all duration-200 ";
                
                if (showExplanation) {
                  if (index === currentQ.correctAnswer) {
                    buttonClass += "border-constitution-green bg-constitution-green/10 text-constitution-green";
                  } else if (index === selectedAnswer && selectedAnswer !== currentQ.correctAnswer) {
                    buttonClass += "border-red-500 bg-red-50 text-red-600";
                  } else {
                    buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
                  }
                } else {
                  if (index === selectedAnswer) {
                    buttonClass += "border-navy-blue bg-navy-blue/10 text-navy-blue";
                  } else {
                    buttonClass += "border-gray-200 hover:border-navy-blue hover:bg-gray-50";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={buttonClass}
                    disabled={showExplanation}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                      {showExplanation && index === currentQ.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-constitution-green ml-auto" />
                      )}
                      {showExplanation && index === selectedAnswer && selectedAnswer !== currentQ.correctAnswer && (
                        <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className={`p-4 rounded-lg border-l-4 ${isCorrect ? 'border-constitution-green bg-green-50' : 'border-red-500 bg-red-50'}`}>
                <div className="flex items-center space-x-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-constitution-green" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className={`font-bold ${isCorrect ? 'text-constitution-green' : 'text-red-600'}`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                <p className="text-gray-700">{currentQ.explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <div className="flex space-x-4">
            {!showExplanation ? (
              <Button 
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="bg-navy-blue hover:bg-navy-blue/90 text-white"
              >
                Submit Answer
              </Button>
            ) : (
              <Button 
                onClick={handleNextQuestion}
                className="bg-navy-blue hover:bg-navy-blue/90 text-white"
              >
                {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}