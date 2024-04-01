const Modal = ({
  children,
  toggleModal,
}: {
  children: React.ReactNode;
  toggleModal: () => void;
}) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center transition-all duration-200 z-[999]"
      onClick={toggleModal}
    >
      <div
        className="bg-white rounded-lg shadow-md max-h-[520px] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
