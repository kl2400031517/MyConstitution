# Know Your Constitution (MyConstitution)

A comprehensive React-based web application designed to educate citizens about the Indian Constitution through interactive learning, discussions, and expert guidance. This digital platform simplifies the Indian Constitution, making it accessible to all with interactive modules, quizzes, expert insights, and community discussions.

## Features

### User System
- **User Registration & Login**: Secure authentication with role-based access
- **Role-Based Dashboards**: Different interfaces for Admin, Educator, Citizen, and Legal Expert
- **Persistent Storage**: All data stored in localStorage for offline functionality

### Role-Based Features

#### Admin Dashboard
- View all registered users
- Edit and delete user accounts
- User statistics and management

#### Educator Dashboard
- Create educational content (articles, flashcards, timelines)
- Design interactive quizzes
- Manage learning materials

#### Citizen Dashboard
- Browse constitutional content and articles
- Participate in community discussions
- Take interactive quizzes
- Access fundamental rights and duties information

#### Legal Expert Dashboard
- Answer citizen legal questions
- Provide FAQs about constitutional law
- Expert guidance and support

### Key Features
- **Search Functionality**: Search through articles and content
- **Discussion Board**: Community-driven discussions about constitutional topics
- **Interactive Quizzes**: Test knowledge with multiple-choice questions
- **Responsive Design**: Works on desktop and mobile devices
- **India Theme**: Uses national colors (saffron, white, green, navy blue)

## Tech Stack

- **Frontend**: React 19 with Vite
- **Routing**: React Router DOM
- **Styling**: Custom CSS with India theme colors
- **Storage**: localStorage for data persistence
- **No Backend**: Fully frontend-only application

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kl2400031517/MyConstitution.git
cd MyConstitution
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### First Time Setup
1. Register a new account with your preferred role
2. Login to access your role-specific dashboard
3. Start exploring constitutional content and features

### Available Roles
- **Citizen**: Browse content, participate in discussions, take quizzes
- **Educator**: Create educational content and quizzes
- **Legal Expert**: Answer legal questions and provide expert guidance
- **Admin**: Manage users and oversee the platform

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation component
│   ├── Footer.jsx          # Footer component
│   ├── UserForm.jsx        # Login/Registration form
│   └── ProtectedRoute.jsx  # Route protection component
├── pages/
│   ├── Home.jsx            # Landing page
│   ├── Admin.jsx           # Admin dashboard
│   ├── Educator.jsx        # Educator dashboard
│   ├── Citizen.jsx         # Citizen dashboard
│   └── LegalExpert.jsx     # Legal expert dashboard
├── App.jsx                 # Main application component
├── main.jsx               # Application entry point
└── styles.css             # Global styles
```

## Features in Detail

### Constitutional Content
- Fundamental Rights (Articles 14-32)
- Fundamental Duties (Article 51A)
- Directive Principles (Articles 36-51)
- Preamble and key constitutional concepts

### Interactive Learning
- Multiple-choice quizzes
- Educational articles and flashcards
- Timeline of constitutional development
- Search and filter functionality

### Community Features
- Discussion board for constitutional topics
- Legal question submission and expert answers
- User-generated content and quizzes

## Contributing

This is a frontend-only application. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is created for educational purposes to promote constitutional awareness among Indian citizens.

## Acknowledgments

- Constitution of India for the foundational content
- React and Vite communities for excellent tooling
- Indian constitutional experts for inspiration

---

**Made with ❤️ for India** 🇮🇳
