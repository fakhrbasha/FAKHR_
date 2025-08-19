import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import Login from "./pages/Login"
import { path } from "framer-motion/client"
import MainLayout from "./layout/MainLayout"
import Feed from "./pages/Feed"
import PostDetails from "./pages/PostDetails"
import NotFound from "./pages/NotFound"
import RegisterPage from "./pages/RegisterPage"
import ProtectedRoute from "./protectedRoute/ProtectedRoute"
import ProtectedAuthRoute from "./protectedRoute/ProtectedAuthRoute"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Profile from "./pages/Profile"
const router = createBrowserRouter([
  {
    path: '', element: <AuthLayout />, children: [
      { path: 'login', element: <ProtectedAuthRoute><Login /></ProtectedAuthRoute> },
      { path: 'register', element: <ProtectedAuthRoute><RegisterPage /></ProtectedAuthRoute> }

    ]
  },
  {
    path: '', element: <MainLayout />, children: [
      { index: true, element: <ProtectedRoute><Feed /></ProtectedRoute> },
      { path: 'post/:id', element: <ProtectedRoute><PostDetails /></ProtectedRoute> },
      { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: '*', element: <NotFound /> }
    ]
  }

])
export const queryClient = new QueryClient();


function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>

  )
}

export default App
