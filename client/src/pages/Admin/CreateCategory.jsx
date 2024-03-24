import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

function CreateCategory() {
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
              <h2 className="text-center text-4xl mb-4 bg-slate-500 p-4 rounded-lg">Manage Categories</h2>
              <table className="min-w-full bg-orange-500 shadow-2xl rounded-xl p-4">
                <thead>
                  <tr className="bg-blue-gray-100 text-gray-700">
                    <th className="py-3 px-4 text-left"> Name</th>

                    <th className="py-3 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="text-blue-gray-900">
                  <tr className="border-b border-blue-gray-200">
                    <td className="py-3 px-4">Company A</td>

                    <td className="py-3 px-4">
                    


<div className="group inline-block">
  <button className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-14">
    <span className="pr-1 flex-1 font-medium text-blue-600 hover:text-blue-800">Edit</span>
    <span>
      <svg className="fill-current h-4 w-4 transform group-hover:-rotate-180
  transition duration-150 ease-in-out" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </span>
  </button>
  <ul className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
  transition duration-150 ease-in-out origin-top min-w-32">
    <li className="rounded-sm px-3 py-1 hover:bg-blue-600 cursor-pointer font-medium">Update</li>
    <li className="rounded-sm px-3 py-1 cursor-pointer hover:bg-red-600 font-medium">Delete</li>
 
  </ul>
</div>





                    </td>
                  </tr>
                  
                  
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
