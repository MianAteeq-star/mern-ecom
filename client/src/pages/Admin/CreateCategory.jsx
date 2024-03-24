import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Space, Tooltip } from 'antd';
import CategoryForm from "../../components/Form/CategoryForm";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";


function CreateCategory() {
  const [category, setCategory] = useState([]);
  const [name,setName ]= useState("")

  const getAllCategory = async (req, res) => {
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
      const {data} = await axios.post('/create-category',{name})
      if(data?.success){
        toast.success(`${name} ${data.message}`)
        getAllCategory()
        setName(" ")
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
      if(res.data.success){
        toast.success(res.data.message)
        getAllCategory()
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting category");
    }
  };

  // Update

  const handleUpdate = () => {
    console.log("updated");
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
              <CategoryForm handleSubmit={createCategory} value={name} setValue={setName}   />
              <table className="min-w-full bg-cyan-400 shadow-2xl rounded-xl p-4">
                <thead>
                  <tr className="bg-blue-gray-100 text-gray-700">
                    <th className="py-3 px-4 text-left"> #</th>
                    <th className="py-3 px-4 text-left"> Name</th>

                    <th className="py-3 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="text-blue-gray-900">
                  {category.map((categ, i) => (
                    <>

                      <tr className="border-b border-blue-gray-200">
                      <th>{ i + 1}</th>
                        <td key={categ._id} className="py-3 px-4">
                          {categ.name}
                        </td>

                        <td>
                          <Space>
                            <Tooltip title="Delete" color='red'><Button className="text-red-600 border-black" icon={<DeleteOutlined />} onClick={() => { handleDelete(categ._id) }} /></Tooltip>
                            <Tooltip title="Edit"><Button type="primary" className="text-blue-500 border-black" icon={<EditOutlined />}  onClick={handleUpdate} /></Tooltip>
                          </Space>
                        </td>

                        {/* <td className="py-3 px-4">
                          <div className="group inline-block">
                            <button className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-14">
                              <span className="pr-1 flex-1 font-medium text-blue-600 hover:text-blue-800">
                                Edit
                              </span>
                              <span>
                                <svg
                                  className="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                              </span>
                            </button>
                            <ul className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute  transition duration-150 ease-in-out origin-top min-w-32">
                              <li
                                className="rounded-sm px-3 py-1 hover:bg-blue-600 cursor-pointer font-medium"
                                onClick={handleUpdate}
                              >
                                Update
                              </li>
                              <li
                                className="rounded-sm px-3 py-1 cursor-pointer hover:bg-red-600 font-medium"
                                onClick={()=> handleDelete(categ._id)}
                              >
                                Delete
                              </li>
                            </ul>
                          </div>
                        </td> */}
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategory;
