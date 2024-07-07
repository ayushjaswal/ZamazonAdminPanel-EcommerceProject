import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./products.css";
import { useNavigate } from "react-router-dom";
import { ProductFormData, ProductImage, config } from "../types/types";
import axios from "axios";
import { path } from "../variables";
import { Toaster, toast } from "sonner";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../firebase";
import ClipLoader from "react-spinners/ClipLoader";
const Products: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductFormData[]>();
  const [isDeleting, setIsDeleting] = useState(false);
  const [beingDeleted, setBeingDeleted] = useState("");
  useEffect(() => {
    async function getProducts() {
      const res = await axios.get(`${path}/product`, config);
      if (res.data) {
        setProducts(res.data);
      }
    }
    getProducts();
  }, []);

  function handleEditProduct(value: string) {
    navigate(`/products/editproduct/${value}`);
  }

  async function handleProductDelete(value: string) {
    setIsDeleting(true);
    setBeingDeleted(value);
    try {
      let images: ProductImage[];
      for (let index = 0; index < products!.length; index++) {
        if (products![index]._id == value) {
          images = products![index].images;
        }
      }
      setProducts((prev) => prev?.filter((prod) => prod._id !== value));
      if (images!.length > 0) {
        for (let index = 0; index < images!.length; index++) {
          const storageRef = ref(storage, `images/${images![index].imageName}`);
          await deleteObject(storageRef);
        }
      }
      const res = await axios.delete(`${path}/product/${value}`);
      if (res.data) {
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to deleted product");
      }
    } catch (err) {
      toast.error("Failed to deleted product");
    }
    setIsDeleting(false);
    setBeingDeleted("");
  }

  return (
    <div className="h-[100vh] ">
      <Toaster richColors position="bottom-center" />
      <div className="w-full">
        <div className="flex">
          <Sidebar />
          <div className="w-full p-3 overflow-y-auto h-[100vh]">
            <h1>Products</h1>

            <div>
              <button
                className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-100 transition ease-in-out"
                onClick={() => navigate("/products/newproduct")}
              >
                New Product
              </button>
            </div>
            <div className="w-full ">
              <table className="basic ">
                <thead>
                  <tr>
                    <td className="">Product Name</td>
                    <td className="">Description</td>
                    <td className="">Images</td>
                    <td className="">Cost</td>
                    <td className="">Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product) => (
                    <tr>
                      <td className="max-w-1">{product.productName}</td>
                      <td className="text-wrap break-words max-w-7">
                        {product.productDescription.slice(0, 100)}...
                      </td>
                      <td className="grid grid-cols-3 gap-2 border-none p-4">
                        {product.images.map((image) => (
                          <img
                            className="h-12 w-12 rounded-md shadow-md object-cover"
                            src={image.imageUrl}
                          />
                        ))}
                      </td>
                      <td>₹{product.price}</td>
                      <td className="flex border-none gap-2">
                        <button
                          onClick={() => handleEditProduct(product._id!)}
                          className="btn bg-gray-100 hover:bg-gray-200 w-1/2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleProductDelete(product._id!)}
                          className="btn bg-red-100 hover:bg-red-200 flex items-center justify-center h-full w-1/2"
                          disabled={isDeleting}
                        >
                          {isDeleting && beingDeleted === product._id ? (
                            <div className="w-full">
                              <ClipLoader
                                size={24}
                                color="red"
                                speedMultiplier={0.5}
                              />
                            </div>
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
