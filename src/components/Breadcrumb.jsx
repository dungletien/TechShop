import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="container mx-auto px-4 mb-4 text-sm text-gray-500" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              {index === items.length - 1 ? (
                <span className="text-gray-700 font-semibold">{item.label}</span>
              ) : (
                <Link to={item.path} className="hover:text-blue-600 font-medium">
                  {item.label}
                </Link>
              )}
            </li>
            {index < items.length - 1 && <li>/</li>}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;