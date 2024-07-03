import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

interface QuantityProps {
    decreaseQuantity: () => void;
    increaseQuantity: () => void;
    currQuantity: number
}

const Quantity = ({decreaseQuantity, increaseQuantity, currQuantity} : QuantityProps) => {
    return (
        <div className="flex items-center gap-4">
            <FiMinusCircle
                className="hover:text-red-1 cursor-pointer text-base-medium"
                onClick={decreaseQuantity}
            />
            <p className=" text-base bg-grey-2 px-2 rounded-md">{currQuantity}</p>
            <FiPlusCircle
                className="hover:text-blue-1 cursor-pointer text-base-medium"
                onClick={increaseQuantity}
            />
        </div>
    )
}

export default Quantity;