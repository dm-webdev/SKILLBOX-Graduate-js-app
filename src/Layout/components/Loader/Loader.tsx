import React from 'react';
import './loader.css';

export function Loader() {
  return (
    <div className="loader">
      <div className="cssload-container" aria-hidden="true">
	      <div className="cssload-whirlpool" />
      </div>
    </div>
  );
}
