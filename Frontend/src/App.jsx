import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import ProtectedRoute from './components/ui/ProtectedRoute';

import LoginAdmin from './components/Admin/LoginAdmin';
import Dashboard from './components/Admin/Dashboard';
import AssignBook from './components/Admin/AssignBook';

import StudentDashboard from './components/Student/StudentDashboard';
import AddStudent from './components/Student/AddStudent';
import EditStudent from './components/Student/EditStudent';
import ReadStudent from './components/Student/ReadStudent';

import BookDashboard from './components/Book/BookDashboard';
import AddBook from './components/Book/AddBook';
import EditBook from './components/Book/EditBook';
import ReadBook from './components/Book/ReadBook';

const router = createBrowserRouter([

  // root redirect
  {
    path: '/', element: <Navigate to='/login' />
  },
  {
    path: '/login', element: <LoginAdmin />
  },

  // Protected - All inside app layout
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: (
          <AppLayout>
            <Dashboard />
          </AppLayout>
        )
      },

      // Admin Path
      {
        path: '/loginAdmin',
        element: (
          <AppLayout>
            <LoginAdmin />
          </AppLayout>
        )
      },
      {
        path: '/assignBook',
        element: (
          <AppLayout>
            <AssignBook />
          </AppLayout>
        )
      },

      // Student Path
      {
        path: '/students',
        element: (
          <AppLayout>
            <StudentDashboard />
          </AppLayout>
        )
      },
      {
        path: '/addStudent',
        element: (
          <AppLayout>
            <AddStudent />
          </AppLayout>
        )
      },
      {
        path: '/editStudent/:id',
        element: (
          <AppLayout>
            <EditStudent />
          </AppLayout>
        )
      },
      {
        path: '/readStudent/:id',
        element: (
          <AppLayout>
            <ReadStudent />
          </AppLayout>
        )
      },

      // Book Path
      {
        path: '/books',
        element: (
          <AppLayout>
            <BookDashboard />
          </AppLayout>
        )
      },
      {
        path: '/addBook',
        element: (
          <AppLayout>
            <AddBook />
          </AppLayout>
        )
      },
      {
        path: '/editBook/:id',
        element: (
          <AppLayout>
            <EditBook />
          </AppLayout>
        )
      },
      {
        path: '/readBook/:id',
        element: (
          <AppLayout>
            <ReadBook />
          </AppLayout>
        )
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