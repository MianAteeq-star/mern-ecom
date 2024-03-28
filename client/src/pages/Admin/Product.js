import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Space, Tooltip, message } from "antd";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/getAll-products");
      if (data?.success) {
        setProducts(data.getAllProducts);
        message.success(data?.message);
      }
    } catch (error) {
      console.log(error);
      message.error(" something went wrong while getting products");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

//  Handle Delete Products
//  
  return (
    <Layout >
      <div>Product</div>
        <div className="flex w-full p-6  gap-6 bg-red-600 ">
      {products.map((pro) => (

<Link to={`/dashboard/admin/product/${pro.slug}`} key={pro._id} >
          <div className="  min-h-96 overflow-hidden rounded-xl bg-white bg-clip-border shadow-2xl my-6 text-gray-700">
            <div className="flex justify-center p-6 "> 

            <img src={`/get-photo/${pro._id}`}className="" width={"300px"} alt="" />
            </div>
            <div className="p-6">
        <div className="mb-2 flex items-center gap-5 justify-between">
                <div>

                <span className=" font-bold text-xl"> {pro.name}  </span>
                </div>
                
                {/* <div className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                  <Space>
                    <Tooltip title="Delete" color="red">
                      <Button
                        className="text-red-600 border-black"
                        icon={<DeleteOutlined />}
                        // onClick={()=> handleDelete(pro._id)}
                        
                        />
                    </Tooltip>
                    <Tooltip title="Edit" color="green">
                      <Button
                        type="primary"
                        className="text-blue-500 border-black"
                        icon={<EditOutlined />}
                        // onClick={navigate("/dashboard/admin/update-product")}
                        />
                    </Tooltip>
                  </Space>
                </div> */}
              </div>

              <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                <span className=" font-bold text-lg"> Quantity :   </span> {pro.quantity}
              </p>
              <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
              <span className=" font-bold text-lg"> Price :   </span>{pro.price} <span className="font-bold">$</span>
              </p>
              <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
              <span className=" font-bold text-lg"> Description :   </span> {pro.description}
              </p>
              <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
              <span className=" font-bold text-lg"> Created At :   </span> {pro.createdAt}
              </p>
              <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
              <span className=" font-bold text-lg"> Updated At :   </span> {pro.updatedAt}
              </p>
            </div>

          </div>
      </Link>
      ))}
        </div>
    </Layout>
  );
}

export default Product;
