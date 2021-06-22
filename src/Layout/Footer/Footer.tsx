import React from "react";
import "./footer.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="copy">&copy;  Денис Мироненко, {year}</footer>
  );
}
