import { use, useState } from "react";

export interface Data{
    id:string;
    productName:string;
    price:number;
}


const Product = ({data, dispatch}) => {
    
    const [isShowing, setIsShowing] = useState(false)
    
    const showHideHandler = () =>{
        setIsShowing(!isShowing)
    }

    const [form, setForm] = useState({
        id:data.id,
        productName:data.productName,
        price:data.price
    })

    const onInputChange = (event) =>{
        const newData = {...form}
        newData[event.target.name] = event.target.value
        setForm(newData)
    }

    const deleteHandle = () =>{
        dispatch({type:"DELETE", payload:{id:data.id}})
    }

    const editHandler = () => {
        if(Number.isInteger(Number(form.price))){
            dispatch({type:"EDIT", payload:{
                id:data.id,
                productName:form.productName,
                price:form.price
            }})
            showHideHandler()
        }
        else{
            alert("กรอกชนิดข้อมูลไม่ถูกต้อง")
        }
    }

    return(
        <div 
            key={data.id} 
            className="w-full sm:w-6/12 lg:w-3/12 mt-3 bg-white border border-gray-300 py-6 px-2 rounded shadow-md">
            <div className="flex justify-center mx-auto text-lg font-semibold">
                {data.productName}
            </div>
            <div className="flex justify-center mx-auto">
                {data.price}
            </div>
            <div className="flex justify-center my-2">
                <button className="mx-1 bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-sm" onClick={showHideHandler}>
                    {isShowing?"HIDE":"EDIT"}
                </button>
                <button className="mx-1 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-sm" onClick={deleteHandle}>
                    DELETE
                </button>
            </div>
            {
                isShowing &&
                <div className="px-2 py-4 bg-gray-200 w-full rounded-sm">
                    <input
                        className="w-full my-1 pl-2"
                        name="productName"
                        defaultValue={data.productName}
                        onChange={onInputChange}
                    />
                    <input
                        className="w-full my-1 pl-2"
                        name="price"
                        defaultValue={data.price}
                        onChange={onInputChange}
                    />
                    <button onClick={editHandler} className="flex justify-center mx-auto bg-blue-500 hover:bg-blue-600 text-white mt-1 py-2 rounded-sm">
                        CONFIRM EDIT
                    </button>
                </div>
            }
        </div>
    );
}

export default Product;