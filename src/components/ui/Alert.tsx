import { useEffect, useState } from "react";

interface IAlert {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number; // Auto-dismiss time (ms)
  onClose?: () => void;
}

function Alert({ message, type = "info", duration = 5000, onClose }: IAlert) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose?.(), 300); // Wait for fade-out before removing
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`alert alert-${type}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={() => setVisible(false)}>✖</button>
    </div>
  );
}

export default Alert;
