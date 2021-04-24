import React from "react";

const Modal = ({ selectedImg, setSelctedImg }) => {
  console.log(selectedImg);
  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setSelctedImg(null);
    }
  };
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop"
      onClick={handleClick}
    >
      <img
        className="block max-w-md max-h-md my-6 mx-auto shadow-lg border border-white"
        src={selectedImg}
        alt="enlarged img"
      />
    </div>
  );
};

export default Modal;
