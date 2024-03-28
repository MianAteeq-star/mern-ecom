import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Button, Select, message } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const {Option } = Select


function UpdateProduct() {
    const navigate = useNavigate()
    const params = useParams()
    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState();
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [photo, setPhoto] = useState("");
    const [quantity, setQuantity] = useState("");
    const [name, setName] = useState("");
    const [shipping, setShipping] = useState(" ");
    const [id, setId] = useState("");
  
    
    //  Get Single Product

    const getSingleProduct = async (id) => {
      try {
        const { data } = await axios.get(`/getAll-products/${params.slug}`);
       
          setName(data?.getSingleProduct.name);
          setId(data?.getSingleProduct._id);
          setDescription(data?.getSingleProduct.description);
          setPrice(data?.getSingleProduct.price);
          setShipping(data?.getSingleProduct.shipping);
          setQuantity(data?.getSingleProduct.quantity);
          setPhoto(data?.getSingleProduct.photo);
          setCategory(data?.getSingleProduct.category);
        
      } catch (error) {
        console.log(error);
        message.error("Something went wrong while getting Single product");
      }
    };

    useEffect(()=>{
      getSingleProduct()
    },[])

  // Get All Category link with product 
    const getAllCategory = async () => {
      try {
        const { data } = await axios("/getall-category");
        if (data?.success) {
          setCategories(data?.getAll); // from category controller
          console.log(categories);
        }
      } catch (error) {
        console.log(error);
        message.error("Something went wrong while getting category");
      }
    };
  
    useEffect(() => {
      getAllCategory();
    }, []);
  
    const onSearch = (value) => {
      console.log("search:", value);
    };
  
  
    const createProduct = async (e) => {
      e.preventDefault()
      const productData = new FormData()
      productData.append('name', name)
      productData.append('description', description)
      productData.append('price', price)
      productData.append('shipping', shipping)
      productData.append('quantity', quantity)
      productData.append('photo', photo)
      productData.append('category', category)
  
      try {
        const {data} = await axios.post('/create-products', productData)
      if (data?.success) {
        message.success(data?.message)
        navigate("/dashboard/admin/products")
      }
      else{
        message.error(data?.message)
        
      }
      } catch (error) {
        console.log(error);
        message.error("Something went wrong while creating product");
        
      }
    }
  return (
      <Layout>
    <div>UpdateProduct</div>
   
  
  
    
  
    
        <div className="flex ">
          <div className="w-4/12  flex justify-center items-center flex-col gap-4 p-4">
            <h3 className="text-3xl">Admin Dashboard</h3>
            <AdminMenu />
          </div>
          <div className="w-8/12  p-4">
            {/* <!-- component --> */}
            <div className="flex min-h-screen items-center justify-center shadow-2xl">
              <div className="overflow-x-auto p-6">
                <h2 className="text-center text-4xl mb-4 bg-slate-500 p-4 rounded-lg">
                  Update Product
                </h2>
  
                <Select
                  showSearch
                  placeholder="Select a Category"
                  optionFilterProp="children"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  onSearch={onSearch}
                  className="w-72 mb-6"
                  value={category.name}
                >
                  {categories?.map((categ) => (
                    <Option key={categ._id} value={categ._id}>
                      {categ.name}
                    </Option>
                  ))}
                </Select>
  
                <div className="mb-5">
                  <label className="bg-blue-500 hover:bg-blue-700 text-white cursor-pointer font-bold py-2 px-4 rounded-full">
  
                   {
                     photo ? photo.name : "Upload Image"
                   }
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                      />
                  
                      </label>
                </div>
                <div className="mb-5">
                  {photo && (
                    <div className="text-center">
                       <img src={URL.createObjectURL(photo)} alt="Product Photo" width="300px"  height="200px" />
                    </div>
                  )}
                </div>
  
                <div className="mb-5">
                <form
                    className="space-y-4 md:space-y-2"
                    
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="name"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Smart Watch"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                       Description
                      </label>
                      <textarea
                        type="description"
                        name="description"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="description..."
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="45$"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="quantity"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=" 3"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="shipping"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Shipping
                     
                        </label>
  
                        <Select
                  showSearch
                  placeholder="Select Shipping"
                  defaultValue={"yes"}
                  optionFilterProp="children"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  onSearch={onSearch}
                  className="w-full mb-6"
                  value={shipping? "Yes" : "No"} 
                >
                 
                       <Option value="0" >No</Option>
                       <Option value="1" >Yes</Option>
                      </Select>
                      
  
                    </div>
                 
                     
  
                    <div >
                    <Button type="dashed" className="bg-blue-600"  onClick={createProduct}>
             Update Product
            </Button>
                    </div>
                   
                  </form>
                </div>
  
              </div>
            </div>
          </div>
        </div>
      </Layout>
  )
}

export default UpdateProduct