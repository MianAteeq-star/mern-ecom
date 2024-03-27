import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Button,Modal, Space, Tooltip, message } from "antd";
import CategoryForm from "../../components/Form/CategoryForm";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function CreateCategory() {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [modelOpen, setModelOpen] = useState(false);
  const [select, setSelect] = useState(null)
  const [updatedName, setUpdatedName] = useState("")
  const getAllCategory = async () => {
    try {
      const { data } = await axios("/getall-category");
      if (data.success) {
        setCategory(data.getAll); // from category controller
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //  Create a new category
  const createCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/create-category", { name });
      if (data?.success) {
        toast.success(`${name} ${data.message}`);
        getAllCategory();
        setName(" ");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating category");
    }
  };

  // Delete Category
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/delete-category/${id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting category");
    }
  };

  // Update


  const handleUpdate = async(e) => {
    e.preventDefault()
    try {
      const res = await axios.put(`/update-category/${select._id}`, { name: updatedName})
      if (res.data.success) {
        toast.success(res.data.message);
        setModelOpen(false);
       setUpdatedName("")
       setSelect(null)
        getAllCategory();
    }
    else{
      message.error(res.data.message)
    }
   } catch (error) {
      console.log(error);
      message.error("Something went wrong while updating category")
      
    }
  };
  return (
    <Layout>
      <div className="flex ">
        <div className="w-4/12  flex justify-center items-center flex-col gap-4 p-4">
          <h3 className="text-3xl">Admin Dashboard</h3>
          <AdminMenu />
        </div>
        <div className="w-8/12  p-4">
          {/* <!-- component --> */}
          <div className="flex min-h-screen items-center justify-center shadow-2xl">
            <div className="overflow-x-auto">
              <h2 className="text-center text-4xl mb-4 bg-slate-500 p-4 rounded-lg">
                Manage Categories
              </h2>

              <CategoryForm
            
              
             
                handleSubmit={createCategory}
                value={name}
                setValue={setName}
              />

              <table className="min-w-full bg-cyan-400 shadow-2xl rounded-xl p-4">
                <thead>
                  <tr className="bg-blue-gray-100 text-gray-700 border-b border-blue-gray-200">
                    <th className="py-3 px-4 text-left font-bold"> #</th>
                    <th className="py-3 px-4 text-left"> Name</th>

                    <th className="py-3 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="text-blue-gray-900">
                  {category.map((categ, i) => (
                    <>
                      <tr className="border-b border-blue-gray-200">
                        <td className="py-3 px-4 font-bold" >{i + 1}</td>
                        <td key={categ._id} className="py-3 px-4">
                          {categ.name}
                        </td>

                        <td>
                          <Space>
                            <Tooltip title="Delete" color="red">
                              <Button
                                className="text-red-600 border-black"
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                  handleDelete(categ._id);
                                }}
                              />
                            </Tooltip>
                            <Tooltip title="Edit">
                              <Button
                                type="primary"
                                className="text-blue-500 border-black"
                                icon={<EditOutlined />}
                              onClick={()=> {setModelOpen(true); setUpdatedName(categ.name); setSelect(categ)}}
                              />
                            </Tooltip>
                          </Space>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Modal
         
       
          onCancel={()=> setModelOpen(false)}
          footer={null}
          visible={modelOpen}
        >
         <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
        </Modal>
      </div>
    </Layout>
  );
}

export default CreateCategory;
