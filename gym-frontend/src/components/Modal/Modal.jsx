import "./Modal.css";
import x from "./x.png";

const Modal = (content) =>{
        return (
            <div className="custom  w-full h-[100vh] fixed   text-black top-0 left-0 flex justify-center">
                <div className="w-1/3 bg-white rounded-lg h-fit mt-32 p-5">
                <div className="flex justify-between">
                    <div className="text-4xl font-semibold">{content.header}</div> 
                    <div ><img src={x} className=" h-[35px] cursor-pointer" onClick={content.handleClose}/></div>
                </div>
                <div className="mt-10">
                      {content.content}
                </div>
                </div>
            </div>
        )
}
export default Modal;