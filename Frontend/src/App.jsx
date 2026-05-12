import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import StudentLayout from './layout/StudentLayout';

import ProtectedRoute from './components/ui/ProtectedRoute';
import AuthPage from './components/Auth/AuthPage';

import Dashboard from './components/Admin/Dashboard';
import AssignBook from './components/Admin/AssignBook';

import StudentDashboard from './components/Student/StudentDashboard';
import EditStudent from './components/Student/EditStudent';
import ReadStudent from './components/Student/ReadStudent';

import BookDashboard from './components/Book/BookDashboard';
import AddBook from './components/Book/AddBook';
import EditBook from './components/Book/EditBook';
import ReadBook from './components/Book/ReadBook';
import StudentHome from './components/StudentPortal/StudentHome';

const router = createBrowserRouter([

  // root redirect
  {
    path: '/', element: <AuthPage />
  },

  // Admin routes proteted
  {
    element: <ProtectedRoute allowedRole="admin" />,
    children: [
      {
        path: '/dashboard',
        element: <AppLayout> <Dashboard /> </AppLayout>
      },
      {
        path: '/assignBook',
        element: <AppLayout> <AssignBook /> </AppLayout>
      },
      {
        path: '/students',
        element: <AppLayout> <StudentDashboard /> </AppLayout>
      },
      {
        path: '/editStudent/:id',
        element: <AppLayout> <EditStudent /> </AppLayout>
      },
      {
        path: '/readStudent/:id',
        element: <AppLayout> <ReadStudent /> </AppLayout>
      },
      {
        path: '/books',
        element: <AppLayout> <BookDashboard /> </AppLayout>
      },
      {
        path: '/addBook',
        element: <AppLayout> <AddBook /> </AppLayout>
      },
      {
        path: '/editBook/:id',
        element: <AppLayout> <EditBook /> </AppLayout>
      },
      {
        path: '/readBook/:id',
        element: <AppLayout> <ReadBook /> </AppLayout>
      },
    ]
  },

  // student rotes
  {
    element: <ProtectedRoute allowedRole="student" />,
    children: [
      {
        path: '/student-dashboard',
        element: <StudentLayout><StudentHome /></StudentLayout>

      },
      {
        path: '/browse-books',
        element: <StudentLayout><BrowseBooks /></StudentLayout>

      },
      {
        path: '/student-profile',
        element: <StudentLayout><StudentProfile /></StudentLayout>

      },
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;