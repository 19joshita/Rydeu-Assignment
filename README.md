# 🛵 Rydeu-Style Scheduling App (React Native + Expo)

A **React Native Expo app** that implements a **custom 6-month calendar with date and time picker**, user authentication, and logout functionality. The design and flow are inspired by the **Rydeu app**, focusing on **real-world scheduling UX**.

Built with **TypeScript**, **Redux Toolkit**, **Moment.js**, and **Expo Router**.

---

## 🌟 Features

### 1. Authentication

- Login screen with **email & password**.
- Authentication managed via **Redux Toolkit**.
- Redirects first-time users to login.
- After login, navigates to Home screen.

### 2. Home Screen

- **Header** displays user information (email/name).
- **Custom 6-month calendar** built with **Moment.js**.
- **Date selection:** tap a date to select.
- **Time selection:** appears dynamically after selecting a date.
- **Summary:** shows selected date & time clearly.
- **Logout:** clears auth state and redirects to login.

### 3. State Management

- **Redux Toolkit** manages global state.
- **Auth Slice:** handles login/logout and user info.
- **Calendar Slice:** handles selected date and time.

### 4. UI & UX

- Horizontal **scrollable calendar** for 6 months.
- Time slots appear **after selecting a date**.
- Selected date and time displayed in a **card view**.
- Responsive design works on **iOS and Android**.
- Clean card-based layout with shadows, rounded corners, and consistent spacing.

---

## 🗂 Project Structure

app/
├── \_layout.tsx # Root layout (Redux + Stack navigation)
├── index.tsx # Auth redirect / splash
├── login.tsx # Login screen
├── home.tsx # Home screen

src/
├── redux/
│ ├── store.ts
│ ├── authSlice.ts
│ └── calendarSlice.ts

├── components/
│ ├── Header.tsx
│ └── Calendar/
│ ├── Calendar.tsx
│ ├── Month.tsx

---

## 🛠 Technology Stack

- **React Native** (Expo managed workflow)
- **TypeScript** (type safety)
- **Redux Toolkit** (state management)
- **Expo Router** (navigation)
- **Moment.js** (date & time handling)
- **Axios** (API requests)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/rydeu-scheduling-app.git
cd rydeu-scheduling-app
```

---

## 🛠 Technology Stack

- **React Native** (Expo managed workflow)
- **TypeScript** (type safety)
- **Redux Toolkit** (state management)
- **Expo Router** (navigation)
- **Moment.js** (date & time handling)
- **Axios** (API requests)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/rydeu-scheduling-app.git
cd rydeu-scheduling-app
npx expo start
POST https://new-api-staging.rydeu.com/login
Content-Type: application/json

{
  "email": "rydeu@email10p.org",
  "password": "123456",
  "type": "customer"
}
```
