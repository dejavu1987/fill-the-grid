import { Routes, Route } from 'react-router-dom';
import Basic from './pages/Basic';
import './App.css';
import Advanced from './pages/Advanced';
import CustomTemplate from './pages/CustomTemplate';
function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Basic />}></Route>
        <Route index path="/advanced" element={<Advanced />}></Route>
        <Route
          index
          path="/custom-template"
          element={<CustomTemplate />}
        ></Route>
        <Route path="*" element={<>404</>} />
      </Routes>
    </>
  );
}

export default App;
