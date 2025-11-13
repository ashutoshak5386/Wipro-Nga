import ReactDOM from "react-dom";
import { motion } from "framer-motion";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <motion.div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white p-4 rounded shadow"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>,
    document.getElementById("portal-root")
  );
}
