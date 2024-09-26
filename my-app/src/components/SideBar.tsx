import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="col-md-2 bg-light sidebar">
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link active" href="#">
            Link 1
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link 2
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link 3
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
