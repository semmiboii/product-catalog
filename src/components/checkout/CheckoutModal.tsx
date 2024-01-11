import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";

interface CheckoutModalProps {
  onUnmount: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onUnmount }) => {
  const onConfirm = () => {
    toast.success("Order-Succesfully-Placed");
    onUnmount();
  };

  const onCancel = () => {
    toast.error("Order Cancelled.");
    onUnmount();
  };

  return (
    <div className="h-screen w-screen text-lg absolute top-0 flex items-center justify-center backdrop-blur transition-all">
      <div className="bg-white h-96 flex justify-between flex-col shadow-xl drop-shadow-md p-10">
        <button
          onClick={onUnmount}
          className=" bg-rose-500 p-4 rounded flex items-center justify-center"
        >
          <i className="font-black flex flex-row-reverse items-center">
            CLOSE <MdClose size="25px" />
          </i>
        </button>
        <h1 className="text-2xl text-center uppercase font-black">
          Proceed To Checkout
        </h1>
        <div>
          <div className="flex justify-between w-full">
            <button
              className="bg-red-500 active:bg-red-600 p-4 px-8 rounded font-bold text-white"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 active:bg-green-600 p-4 px-8 rounded font-bold text-white"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
