import {Routes, Route} from 'react-router-dom'
import  Home      from './views/Home'
import  Producto  from './views/Producto'
import  Productos from './views/Productos'
import  Login     from './views/Login'
import  Registro  from './views/Registro'

import './App.css'
import './index.css'

function App() {
  return (
    <Routes>
     <Route path="/"          element={<Home      />} />
     <Route path="/productos" element={<Productos />} />
     <Route path="/producto"  element={<Producto  />} />
     <Route path="/login"     element={<Login     />} />
     <Route path="/registro"  element={<Registro  />} />
   </Routes>
  )
}

export default App
