import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Button, Space, Tooltip, message } from "antd";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function Products() {
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
  return (
    <Layout>
      <div>Products</div>
      {products.map((pro) => (
        <div className="flex w-full items-center justify-center gap-6">

        <div key={pro._id} className=" p-6    rounded-xl bg-red-600 bg-clip-border text-gray-700 shadow-md">
          <div className="  h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
            {pro.photo}
            <div className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                  {pro.name}
                </h3>
                <div className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                  <Space>
                    <Tooltip title="Delete" color="red">
                      <Button
                        className="text-red-600 border-black"
                        icon={<DeleteOutlined />}
                        />
                    </Tooltip>
                    <Tooltip title="Edit">
                      <Button
                        type="primary"
                        className="text-blue-500 border-black"
                        icon={<EditOutlined />}
                        />
                    </Tooltip>
                  </Space>
                </div>
              </div>
              <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                Quantity : {pro.quantity}
              </p>
              <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                Price : {pro.price}$
              </p>
              <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                Description : {pro.description}$
              </p>
              <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                Created At : {pro.createdAt}
              </p>
              <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                Updated At : {pro.updatedAt}
              </p>
            </div>

          </div>
        </div>
      </div>
      ))}
    </Layout>
  );
}

export default Products;
