import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart(){

    const[total,totalItems] = useSelector((state)=>state.auth);
    return (
        <div>
            <h2>Your Cart</h2>
            <p>{totalItems} Courses in Card</p>

            {
                total>0?
                (
                    <div>
                        <RenderCartCourses/>
                        <RenderTotalAmount/>
                    </div>
                ):
                (
                    <div>
                        Your Card is Empty
                    </div>
                )
            }

        </div>
    )
}