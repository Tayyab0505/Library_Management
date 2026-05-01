import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StudentDashboard from './components/Student/StudentDashboard';
import AddStudent from './components/Student/AddStudent';
import EditStudent from './components/Student/EditStudent';
import ReadStudent from './components/Student/ReadStudent';
import BookDashboard from './components/Book/BookDashboard';
import AddBook from './components/Book/AddBook';
import EditBook from './components/Book/EditBook';
import ReadBook from './components/Book/ReadBook';
import LoginAdmin from './components/Admin/LoginAdmin';
import AssignBook from './components/Admin/AssignBook';

// NEW: Import AppLayout
import AppLayout from './layout/AppLayout';
import Dashboard from './components/Dashboard';

const router = createBrowserRouter([
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
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
