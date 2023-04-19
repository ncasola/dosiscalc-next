import React from "react";
import { Button } from "konsta/react";
import { MdInfo, MdClose } from "react-icons/md";
const ToastItem = ({key, text, closeOrder}) => {
  // auto close after 3 seconds
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      closeOrder();
    }, 3000);
    return () => clearTimeout(timer);
  }, [ closeOrder ]);

  return (
    <div
      key={key}
      className="flex items-center ml-3 mb-3 w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
      role="alert"
    >
      <MdInfo className="grow w-6 h-6 mr-4" />
      <p className="grow ml-3 text-sm font-normal">{text}</p>
      <Button
        rounded
        small
        inline
        onClick={() => closeOrder()}
      >
        <MdClose className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ToastItem;
