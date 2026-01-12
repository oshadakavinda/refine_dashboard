# Refine CRM Dashboard

A modern, feature-rich CRM (Customer Relationship Management) dashboard built with React and Refine framework, featuring real-time collaboration, Kanban boards, and comprehensive data management.

![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Refine](https://img.shields.io/badge/-Refine-14141F?style=flat-square&logo=refine&logoColor=white)
![Ant Design](https://img.shields.io/badge/-Ant%20Design-0170FE?style=flat-square&logo=ant-design&logoColor=white)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=flat-square&logo=graphql&logoColor=white)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Database & Backend](#-database--backend)
- [Available Scripts](#-available-scripts)
- [Key Components](#-key-components)
- [Authentication](#-authentication)

## ✨ Features

### 🔐 Authentication & Authorization
- Secure login/signup with email-based authentication
- JWT token-based session management
- Protected routes and role-based access control

### 📊 Task Management (Kanban Board)
- **Drag-and-drop** Kanban board with real-time updates
- Task stages: Unassigned, TODO, In Progress, In Review, Done
- **Create tasks** with titles and auto-assign to stages
- **Edit tasks** with detailed forms including:
  - Editable titles
  - Stage management
  - Rich text descriptions (Markdown support)
  - Due dates
  - User assignments (multi-assignee support)
  - Delete functionality
- Live synchronization across all devices via WebSockets
- Optimistic UI updates for smooth interactions

### 🏢 Company Management
- Complete CRUD operations for companies
- Company profiles with detailed information
- Contact and lead associations
- Revenue tracking and analytics

### 📈 Dashboard & Analytics
- Interactive charts powered by Ant Design Plots
- Real-time metrics and KPIs
- Activity feeds
- Upcoming events calendar

### 👤 User Management
- User profiles with customizable settings
- Avatar support
- Team collaboration features

### 📱 Responsive Design
- Fully responsive across all devices
- Mobile-friendly interface
- Adaptive layouts

## 🛠 Tech Stack

### Core Framework
- **React 18** - UI library
- **TypeScript** - Type safety and better developer experience
- **Refine** - React-based framework for building admin panels and dashboards
- **Vite** - Fast build tool and development server

### UI & Styling
- **Ant Design 5** - Comprehensive UI component library
- **Ant Design Icons** - Icon set
- **Ant Design Plots** - Charting library

### Data Management
- **GraphQL** - Query language for API
- **NestJS Query** - GraphQL data provider
- **GraphQL Code Generator** - Automatic TypeScript type generation from GraphQL schema
- **GraphQL WS** - WebSocket client for real-time subscriptions

### Routing & Navigation
- **React Router v6** - Client-side routing
- **Refine Router Bindings** - Integration between Refine and React Router

### Additional Features
- **@dnd-kit/core** - Drag and drop functionality for Kanban board
- **@uiw/react-md-editor** - Markdown editor for rich text support
- **dayjs** - Date manipulation library
- **Refine KBar** - Command palette for quick navigation
- **Refine Devtools** - Development tools for debugging

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd refine_dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:5173](http://localhost:5173)

5. **Login with demo credentials**
   ```
   Email: michael.scott@dundermifflin.com
   Password: demodemo
   ```

## 📁 Project Structure

```
refine_dashboard/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── layout/      # Layout components (header, sidebar, etc.)
│   │   ├── tasks/       # Task-related components (Kanban board)
│   │   └── ...
│   ├── config/          # Configuration files
│   │   └── resources.tsx # Resource definitions for Refine
│   ├── graphql/         # GraphQL queries, mutations, and types
│   │   ├── mutations.ts
│   │   ├── queries.ts
│   │   ├── schema.types.ts (generated)
│   │   └── types.ts (generated)
│   ├── pages/           # Page components
│   │   ├── tasks/       # Task pages (list, create, edit)
│   │   ├── login/       # Authentication pages
│   │   └── ...
│   ├── providers/       # Data and auth providers
│   │   ├── data/        # GraphQL data provider setup
│   │   └── auth.ts      # Authentication provider
│   ├── utilities/       # Helper functions and utilities
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── graphql.config.ts    # GraphQL Code Generator configuration
├── package.json
└── vite.config.ts       # Vite configuration
```

## 🗄 Database & Backend

### Remote GraphQL API

This project **does not use a local database**. Instead, it connects to a hosted GraphQL backend provided by Refine:

- **API URL**: `https://api.crm.refine.dev/graphql`
- **WebSocket URL**: `wss://api.crm.refine.dev/graphql`

### Data Architecture

The backend stores:
- **Tasks** - Kanban board items with stages, descriptions, due dates, and assignees
- **Companies** - Business entities with revenue and contact information
- **Contacts** - Individual contacts linked to companies
- **Deals** - Sales pipeline items
- **Users** - Application users with profiles and permissions
- **Events** - Calendar events and activities
- **Audits** - Activity logs and history

### Real-time Features

The application uses **WebSocket connections** for:
- Live task updates across all devices
- Real-time Kanban board synchronization
- Instant activity feed updates
- Collaborative editing notifications

### Type Safety

GraphQL Code Generator automatically generates TypeScript types from the GraphQL schema, ensuring:
- Type-safe queries and mutations
- Autocomplete in IDEs
- Compile-time error checking
- Reduced runtime errors

## 📜 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Generate TypeScript types from GraphQL schema
npm run codegen

# Run Refine CLI
npm run refine
```

## 🔑 Key Components

### Kanban Board (`src/pages/tasks/list.tsx`)
- Implements drag-and-drop task management
- Uses `@dnd-kit/core` for DnD functionality
- Fetches tasks and stages via GraphQL
- Optimistic updates for smooth UX

### Create Task Modal (`src/pages/tasks/create.tsx`)
- Modal form for creating new tasks
- Auto-assigns tasks to selected stage
- Uses Refine's `useModalForm` hook

### Edit Task Modal (`src/pages/tasks/edit.tsx`)
- Comprehensive task editing interface
- Accordion sections for different task properties
- Inline title editing
- Stage dropdown
- Markdown description editor
- Date picker for due dates
- Multi-user assignment
- Delete functionality

### Data Provider (`src/providers/data/index.tsx`)
- GraphQL client setup
- WebSocket client for real-time updates
- Custom fetch wrapper for authentication

### Layout Components
- Header with user menu and notifications
- Sidebar navigation
- Responsive design system

## 🔐 Authentication

### Authentication Flow

1. **Login**: User enters email (password not enforced in demo)
2. **Token Generation**: Backend returns JWT access token
3. **Token Storage**: Token saved in localStorage
4. **API Requests**: Token included in Authorization header
5. **Logout**: Token removed from localStorage

### Auth Provider (`src/providers/auth.ts`)

Handles:
- Login/logout operations
- User identity management
- Token validation
- Error handling
- Route protection

### Demo Credentials

```
Email: michael.scott@dundermifflin.com
Password: demodemo
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Refine](https://refine.dev/)
- UI components by [Ant Design](https://ant.design/)
- Icons from [Ant Design Icons](https://ant.design/components/icon/)
