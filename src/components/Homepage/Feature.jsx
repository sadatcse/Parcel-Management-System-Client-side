import React from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
const Feature = ({ title, description }) => {
    const [isOpen, setIsOpen] = React.useState(false);
  
    return (
      <div className="border border-gray-200 rounded-lg p-4">
      <div
        className="cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {isOpen ? (
            <FiChevronUp className="h-6 w-6 mr-2 text-green-500" />
          ) : (
            <FiChevronDown className="h-6 w-6 mr-2 text-green-500" />
          )}
          <span className="text-lg font-medium">{title}</span>
        </div>
        {isOpen ? (
          <FiChevronUp className="h-6 w-6 text-green-500" />
        ) : (
          <FiChevronDown className="h-6 w-6 text-green-500" />
        )}
      </div>
      {isOpen && (
        <div className="border-t border-gray-200 mt-4 pt-4">
          <p>{description}</p>
        </div>
      )}
    </div>
    );
  };
  
  export default Feature;
