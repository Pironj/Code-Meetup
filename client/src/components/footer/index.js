import React from "react";
import './style.css';

const FooterComponent = () => {
  return (
    <div>
      <div
        style={{
          position: 'fixed',
          left: '0',
          bottom: '0',
          width: '100%',
          textAlign: 'center',
          color: 'black',
          backgroundColor: 'white'
        }}
      >
        &copy; {new Date().getFullYear()} Copyright:
            <span>&#60;</span>
        rendezvous
        <span> &#8725;</span>
        <span>&#62;</span>

      </div>
    </div>
  );
}

export default FooterComponent;