import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeToast } from "../../store/toast.slice";
import ToastItem from "./ToastItem";
const ToastList = () => {
  const toasts = useSelector((state) => state.toast.toasts);
  const dispatch = useDispatch();

  return (
    <>
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          text={toast.text}
          closeOrder={() => dispatch(removeToast(toast.id))}
        />
      ))}
    </>
  );
};

export default ToastList;
