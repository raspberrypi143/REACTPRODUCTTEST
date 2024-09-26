import React from 'react';
import ProductGrid from './components/ProductGrid';
import Sidebar from './components/SideBar';

const App: React.FC = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-md-10">
          <ProductGrid />
        </div>
      </div>
    </div>
  );
};

export default App;