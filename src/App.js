import React, { Suspense } from 'react';
import './App.css';
import CustomLoader from './Components/CustomLoader/customLoader';

// Lazy load components
const Navbar = React.lazy(() => import('./Navbar/navbar'));
const Footer = React.lazy(() => import('./Footer/footer'));
const AllRouter = React.lazy(() => import('./Routes/allroute'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div><CustomLoader/></div>}>
        <Navbar />
        <AllRouter />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
