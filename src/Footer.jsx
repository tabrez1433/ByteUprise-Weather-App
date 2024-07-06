import React from "react";
export default function Footer() {
  return (
    <footer className="footer bg-dark text-white text-center">
      <div className="container" style={{fontSize:"1.2em"}}>
       Tabrez&copy;{new Date().getFullYear()}
      </div>
    </footer>
  );
}
