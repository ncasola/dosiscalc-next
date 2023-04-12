import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeToast } from "../../store/toast.slice";
import { Button, Toast, Block } from "konsta/react";

const ToastList = () => {
  const toasts = useSelector((state) => state.toast.toasts);
  const dispatch = useDispatch();
  return (
    <Block strongIos outlineIos className="space-y-4">
      {toasts.map((toast) => (
      <Toast
        key={toast.id}
        position="center"
        opened={true}
        colors={{
          bg: toast.type,
          text: "white",
        }}
        button={
          <Button
            rounded
            clear
            small
            inline
            onClick={() => dispatch(removeToast(toast.id))}
          >
            Cerrar
          </Button>
        }
      >
        <div className="shrink">{toast.text}</div>
      </Toast>
      ))}
    </Block>
  );
};

export default ToastList;
