import { Route, Routes } from 'react-router-dom'
import AppLayout from './components/Layout'
import CourseList from './components/CourseList'
import CreateCourse from './components/CreateCourse'
import EditCourse from './components/EditCourse'
import CourseDetails from './components/CourseDetails'
import Home from './components/Home'
import Login from './components/Login'
import './App.css'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path='/courses' element={<CourseList />} />
          <Route path='/create' element={<CreateCourse />} />
          <Route path='/details/:id' element={<CourseDetails />} />
          <Route path='/edit/:id' element={<EditCourse />} />
          <Route path='/about' element={<p>About Page...</p>} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<img src='https://res.cloudinary.com/acekyd/image/upload/v1534896949/404-page_ipop2d.png' alt='404'></img>} />
        </Route>
      </Routes>
    </>
  )
}
