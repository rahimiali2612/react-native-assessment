# React Native Authentication App 🚀

A secure mobile authentication app built with React Native, Expo, SQLite, and TailwindCSS.

---

## ✨ Features

- ✅ User Signup & Login with email/password
- ✅ Password hashing with Expo Crypto (SHA-256)
- ✅ SQLite local database (Expo SQLite)
- ✅ Session persistence with AsyncStorage
- ✅ Form validation (React Hook Form + Yup)
- ✅ Modern UI with TailwindCSS/NativeWind
- ✅ Password visibility toggle
- ✅ Real-time validation & error handling

---

## 🛠 Tech Stack

- **React Native** 0.81 + **Expo** ~54.0
- **Expo SQLite** - Local database
- **Expo Crypto** - Password hashing (SHA-256)
- **AsyncStorage** - Session management
- **React Navigation** - Screen navigation
- **React Hook Form + Yup** - Form validation
- **TailwindCSS (NativeWind)** - Styling

---

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd my-assesment
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the app**

   ```bash
   npm start
   ```

4. **Run on device/emulator**
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for Web
   - Or scan QR code with Expo Go app

---

## Usage

### 1. Sign Up

- Enter name, email, and password
- Password must be 6+ characters
- Email must be valid format

### 2. Login

- Use registered email and password
- Session persists across app restarts

### 3. Logout

- Tap logout button on home screen
- Clears session and returns to login

---

## 🔒 Security

- ✅ Passwords hashed with SHA-256 (Expo Crypto)
- ✅ Input validation on all forms
- ✅ SQL injection protection
- ✅ Secure local storage (SQLite + AsyncStorage)

---

## 🧪 Testing

Manual test checklist:

1. ✅ Sign up with valid data
2. ✅ Try duplicate email (should fail)
3. ✅ Login with correct credentials
4. ✅ Login with wrong password (should fail)
5. ✅ Close and reopen app (should stay logged in)
6. ✅ Logout and reopen (should show login screen)

See `TESTING_GUIDE.md` for complete test cases.

---

## ⚙️ Configuration

Environment variables (optional):

```bash
cp .env.example .env
# Edit .env with your settings
```

---

## 📱 Screens

1. **Login Screen** - Email/password login with validation
2. **Signup Screen** - User registration with password confirmation
3. **Home Screen** - User profile display with logout

---

## � Known Issues

- SafeAreaView deprecation warning (non-critical)
- Web version needs localStorage fallback for SQLite

---

## 🔄 Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on Web
```

---

## 📚 Documentation

- `README.md` - This file (Quick start)
- `ARCHITECTURE.md` - System architecture details
- `TESTING_GUIDE.md` - Complete testing checklist
- `PROJECT_SUMMARY.md` - Project overview
- `GITIGNORE_GUIDE.md` - What's ignored and why

---

## 👤 Author

**Your Name**

- GitHub: [@rahimiali2612](https://github.com/rahimiali2612)

---

## � License

MIT License

---

**Built with ❤️ using React Native & Expo**

### Core Technologies

- **React Native** (0.81.4) - Cross-platform mobile framework
- **Expo** (~54.0) - Development and build tooling
- **React** (19.1.0) - UI library

### State Management

- **React Context API** - Global authentication state
- **@react-native-async-storage/async-storage** - Persistent session storage

### Database

- **react-native-sqlite-storage** - Local SQLite database
  - Cross-platform support (iOS, Android)
  - Web compatibility for React Native Web
  - No Expo dependency required

### Form Handling

- **react-hook-form** - Form state management
- **yup** - Schema validation
- **@hookform/resolvers** - Yup integration with React Hook Form

### Navigation

- **@react-navigation/native** - Navigation framework
- **@react-navigation/native-stack** - Stack navigator
- **react-native-screens** - Native navigation primitives
- **react-native-safe-area-context** - Safe area handling

### UI Styling

- **TailwindCSS** (3.3.2) - Utility-first CSS framework
- **NativeWind** (4.2.1) - TailwindCSS for React Native
- **react-native-paper** - Material Design components
- **react-native-vector-icons** - Icon library

### Security

- **bcryptjs** - Password hashing

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **Expo CLI** (optional but recommended)
  ```bash
  npm install -g expo-cli
  ```

### For iOS Development

- **macOS** with Xcode installed
- **iOS Simulator** or physical iOS device

### For Android Development

- **Android Studio** with Android SDK
- **Android Emulator** or physical Android device

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd my-assesment
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   Or with yarn:

   ```bash
   yarn install
   ```

3. **Install iOS dependencies** (macOS only)
   ```bash
   cd ios
   pod install
   cd ..
   ```

## 🏃 Running the App

### Start the development server

```bash
npm start
# or
expo start
```

### Run on specific platform

**iOS:**

```bash
npm run ios
# or
expo start --ios
```

**Android:**

```bash
npm run android
# or
expo start --android
```

**Web:**

```bash
npm run web
# or
expo start --web
```

### Build for production

**iOS:**

```bash
expo build:ios
```

**Android:**

```bash
expo build:android
```

## 📁 Project Structure

```
my-assesment/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.js       # Custom button component
│   │   ├── Input.js        # Custom input component
│   │   └── LoadingScreen.js # Loading screen component
│   │
│   ├── context/            # React Context providers
│   │   └── AuthContext.js  # Authentication context
│   │
│   ├── navigation/         # Navigation configuration
│   │   └── AppNavigation.js # Main navigation setup
│   │
│   ├── screens/            # App screens
│   │   ├── LoginScreen.js  # Login screen
│   │   ├── SignupScreen.js # Signup screen
│   │   └── HomeScreen.js   # Home/Dashboard screen
│   │
│   ├── services/           # Business logic & services
│   │   └── SQLiteService.js # SQLite database service
│   │
│   └── utils/              # Utility functions
│       └── validationSchemas.js # Yup validation schemas
│
├── assets/                 # Images, fonts, etc.
├── App.js                  # Main app component
├── app.json               # Expo configuration
├── babel.config.js        # Babel configuration
├── metro.config.js        # Metro bundler config
├── tailwind.config.js     # TailwindCSS configuration
├── global.css             # Global styles
├── package.json           # Dependencies
└── README.md              # This file
```

**Built with ❤️ using React Native & Expo**
