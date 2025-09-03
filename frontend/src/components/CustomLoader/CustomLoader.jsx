// CustomLoader.jsx
import React from 'react';

const CustomLoader = ({ 
  message = "Loading...", 
  size = "50px", 
  color = "#ff6347",
  fullPage = false,
  overlay = false 
}) => {
  
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
    fontFamily: 'Arial, sans-serif',
    ...(fullPage && {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '9999'
    }),
    ...(overlay && {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(2px)'
    })
  };

  const spinnerStyle = {
    width: size,
    height: size,
    border: `4px solid #f3f3f3`,
    borderTop: `4px solid ${color}`,
    borderRadius: '50%',
    animation: 'customSpin 1s linear infinite'
  };

  const textStyle = {
    fontSize: '16px',
    color: '#666',
    fontWeight: '500',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      {/* Spinner */}
      <div style={spinnerStyle}></div>
      
      {/* Loading message */}
      <div style={textStyle}>
        {message}
      </div>
      
      {/* Inline CSS for animation */}
      <style jsx>{`
        @keyframes customSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// Pre-configured loader variants
export const PageLoader = ({ message = "Loading page..." }) => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
    <CustomLoader message={message} />
  </div>
);

export const ModalLoader = ({ message = "Loading..." }) => (
  <div style={{
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1000'
  }}>
    <div style={{
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
    }}>
      <CustomLoader message={message} />
    </div>
  </div>
);

export const InlineLoader = ({ message = "Loading..." }) => (
  <CustomLoader message={message} size="30px" />
);

export default CustomLoader;