import { apiConnector } from "../apiconnector";
import { studentEndpoints } from "../apis";
import {toast} from 'react-hot-toast';
import rzpLogo from '../../assets/Logo/rzp_logo.png'
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
// import { verifyPayment } from "../../../Server/controller/Payments";
const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

function loadScript(src){
    return new Promise((resolve)=>{
        const script = document.createElement('script');
        script.src = src;

        script.onload=()=>{
            resolve(true);
        }

        script.onerror = () =>{
            resolve(false);
        }

        document.body.appendChild(script);
    })
}

export async function buyCourse(token,courses,userDetails,navigate,dispatch){
    const toastId = toast.loading("Loading...");
    try{
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if(!res){
            toast.error("Razorpay Payment Failed");
            return;
        }

        const orderResponse = await apiConnector("POST",COURSE_PAYMENT_API,
                                            {courses},
                                            {
                                                Authorization:`Bearer ${token}`,
                                            }
                                            );
        if(!orderResponse){
            throw new Error(orderResponse.data.message);
        }

        //Create options

        const options = {
            key:process.env.RAZORPAY_KEY,
            currency:orderResponse.data.data.currency,
            amount:orderResponse.data.data.amount,
            order_id:orderResponse.data.data.id,
            name:"GenTech",
            description:"Thank You for Purchasing the course",
            image:rzpLogo,
            prefill:{
                name:`${userDetails.firstName}`,
                email:`${userDetails.email}`
            },
            handler:function(response){
                sendPaymentSuccessEmail(response,orderResponse.data.data.amount,token);
                verifyPayment({...response,courses},token,navigate,dispatch);
            }


        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("Payment Failed",function(response){
            toast.error("Oops, Payment Failed");
        })

        
    }catch(error){
        console.log("Payment API Error",error);
        toast.error("Paymet could not complete");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response,amount,token){
    try{
        await apiConnector('POST',SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount,
        },{
            Authorization:`Bearer ${token}`
        })
    }catch(error){
        console.log('Payment success email error',error);
    }
}

async function verifyPayment(bodyData,token , navigate,dispatch){
    const toastId = toast.loading("Verifying Payment");
    dispatch(setPaymentLoading(true));
    try{
        const response = await apiConnector("POST",COURSE_VERIFY_API,bodyData,{
            Authorization:`Bearer ${token}`,
        })
        if(!response.data.success){
            throw new Error(response.data.error);
        }
        toast.success("Payment Successful , you are add to new Course");
        navigate('/dashboard/enrolled-courses');
        dispatch(resetCart());

    }catch(error){
        console.log(error);
    }
    toast.dismiss(toastId);

}