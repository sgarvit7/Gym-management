import "./Modal.css";
import x from "./x.png";

const Modal = ({ header, content, handleClose }) => {
  return (
    <div className="custom w-full h-screen fixed top-0 left-0 flex justify-center items-center bg-black/40 z-50">
      <div className="w-[90%] md:w-1/3 bg-white rounded-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl md:text-4xl font-bold">{header}</div>
          <img
            src={x}
            alt="Close"
            className="h-8 w-8 cursor-pointer"
            onClick={handleClose}
          />
        </div>

        {/* Content */}
        <div className="text-lg">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Modal;
