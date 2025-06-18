"use client";
import React, { useEffect, useState } from "react";
import Alert from "./Alert";

interface ToastProps {
    variant: "success" | "error" | "warning" | "info";
    title: string;
    message: string;
    duration?: number; // ms, default 3000
    onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
    variant,
    title,
    message,
    duration = 3000,
    onClose,
}) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!visible) return null;

    return (
        <div className="fixed top-5 right-5 z-[9999] animate-fade-in-up w-[320px]">
            <Alert variant={variant} title={title} message={message} />
        </div>
    );
};

export default Toast;
