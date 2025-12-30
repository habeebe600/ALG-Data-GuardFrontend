import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/DropdownMenu.css";

const DropdownMenu = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isGrouped = items && !Array.isArray(items) && typeof items === "object";

  const groups = isGrouped
    ? [
        { heading: "Managed Services", list: items.managedServices || [] },
        { heading: "Infrastructure Services", list: items.infrastructureServices || [] },
        { heading: "Other Services", list: items.otherServices || [] },
      ]
    : [{ heading: null, list: items || [] }];

  return (
    <div
      className="dropdown"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="dropdown__trigger">
        {title}
        <svg
          className={`dropdown__arrow ${isOpen ? "dropdown__arrow--open" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="dropdown__menu"
          >
            {groups.map((g, gi) => (
              <div key={g.heading || gi} className="dropdown__group">
                {g.heading && <p className="dropdown__title">{g.heading}</p>}

                {g.list.map((item, index) => (
                  <Link key={`${item.href}-${index}`} to={item.href} className="dropdown__item">
                    {item.label}
                  </Link>
                ))}

                {gi !== groups.length - 1 && <div className="dropdown__divider" />}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownMenu;
