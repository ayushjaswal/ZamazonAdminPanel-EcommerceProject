import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../../Sidebar/Sidebar";
import { Toaster, toast } from "sonner";
import { useEffect, useState } from "react";
import {
  CategoriesFormData,
  ProductFormData,
  ProductImage,
  config,
} from "../../types/types";
import axios from "axios";
import { path } from "../../variables";
import { ReactSortable } from "react-sortablejs";
import ClipLoader from "react-spinners/ClipLoader";
import { Upload, X } from "react-feather";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../firebase";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<ProductFormData>({
    images: [],
    price: 0,
    productDescription: "",
    productName: "",
    _id: "",
    category: null,
    properties: [],
  });
  const [categories, setCategories] = useState<CategoriesFormData[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoriesFormData>();
  let imageUpload;
  const [isUploading, setIsUploading] = useState(false);
  useEffect(() => {
    async function getCategories() {
      const res = await axios.get(`${path}/category`, config);
      setCategories(res.data);
    }
    getCategories();
  }, []);

  useEffect(() => {
    async function getProductDetail() {
      const res = await axios.get(`${path}/product/${id}`, config);
      if (res.data) {
        setFormData(res.data);
      }
      console.log(res.data);
    }
    getProductDetail();
  }, []);

  function handleSelectedCategory(ev: React.ChangeEvent<HTMLSelectElement>) {
    setFormData((prev) => ({ ...prev, category: ev.target.value }));
    let selectedValueCategory;
    for (let i = 0; i < categories.length; i++) {
      if (categories[i]._id === ev.target.value) {
        selectedValueCategory = categories[i];
      }
    }
    setSelectedCategory(selectedValueCategory);
  }
  const handlePropertyChange = (propertyName: string, value: string) => {
    setFormData((prev) => {
      const existingPropertyIndex = prev.properties!.findIndex(
        (property) => Object.keys(property)[0] === propertyName
      );

      let newProperties;

      if (existingPropertyIndex > -1) {
        newProperties = prev.properties!.map((property, index) =>
          index === existingPropertyIndex ? { [propertyName]: value } : property
        );
      } else {
        newProperties = [...prev.properties!, { [propertyName]: value }];
      }

      return {
        ...prev,
        properties: newProperties,
      };
    });
  };

  async function uploadImage(ev: React.ChangeEvent<HTMLInputElement>) {
    setIsUploading(true);
    const file = ev.target.files![0];
    const fileName = Date.now() + "." + file.name.split(".").pop();
    const imageRef = ref(storage, `images/${fileName}`);
    try {
      await uploadBytesResumable(imageRef, file);
      const url = await getDownloadURL(imageRef);
      setFormData((prev) => ({
        ...prev,
        images: [
          ...formData.images,
          { imageName: fileName, imageUrl: url, id: fileName },
        ],
      }));
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to upload image!");
    }
    setIsUploading(false);
  }

  async function handleImageDelete(imageUrl: ProductImage) {
    const storageRef = ref(storage, `images/${imageUrl.imageName}`);

    await deleteObject(storageRef)
      .then(() => {
        setFormData((prev) => ({
          ...prev,
          images: formData.images.filter(
            (image) => image.imageName !== imageUrl.imageName
          ),
        }));
        toast.success("Image deleted successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to delete image!");
      });
  }

  async function submitProductForm(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${path}/product/edit-product`,
        formData,
        config
      );
      console.log(res);
      if (res.data) {
        toast.success("Successfully updated new product");
        setTimeout(() => {
          navigate("/products");
        }, 500);
      } else {
        toast.error("Failed to update new product");
      }
    } catch (err) {
      toast.error("Failed to update new product");
    }
  }

  return (
    <div>
      <Toaster richColors position="bottom-center" />
      <div className="flex">
        <Sidebar />
        <div className="p-3 w-full">
          <h1>Edit Product</h1>
          <form className="productForm">
            <div>
              <div>Product Name </div>
              <input
                className="input"
                value={formData.productName}
                placeholder="Product Name"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    productName: e.target.value,
                  }))
                }
              />
            </div>
            <div className="w-full">
              <div>Categories </div>
              <select
                onChange={handleSelectedCategory}
                className="w-full py-2 px-2 outline-none input"
              >
                <option>No category</option>
                {categories!.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.CategoryName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {selectedCategory?.Properties.map((prop) => {
                return (
                  <div key={prop.propertyName}>
                    {prop.propertyName}
                    <select
                      onChange={(ev) =>
                        handlePropertyChange(prop.propertyName, ev.target.value)
                      }
                      className="input"
                    >
                      <option>Not selected</option>
                      {Array.isArray(prop.propertyValue)
                        ? prop.propertyValue.map((value) => (
                            <option key={value}>{value}</option>
                          ))
                        : ""}
                    </select>
                  </div>
                );
              })}
            </div>
            <div>
              <div>Photos</div>
              <div className="flex gap-2">
                <ReactSortable
                  list={formData.images}
                  className="flex flex-wrap gap-1"
                  setList={(img: ProductImage[]) =>
                    setFormData((prev) => ({ ...prev, images: img }))
                  }
                >
                  {formData.images.map((image) => (
                    <div key={image.imageName} className="relative">
                      <img
                        className={
                          "w-24 h-24 object-cover transition ease-in-out duration-200 rounded-md mx-2"
                        }
                        src={image.imageUrl}
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleImageDelete(image);
                        }}
                        className="absolute top-[-10px] right-[-10px]  rounded-full bg-red-500 text-white text-center hover:bg-red-600 transition ease-in-out duration-200  "
                      >
                        <X />
                      </button>
                    </div>
                  ))}
                </ReactSortable>
                {isUploading && (
                  <div className="w-24 h-24 flex items-center justify-center bg-gray-400 rounded-md ">
                    <ClipLoader color="#d3f7c3" speedMultiplier={1} />
                  </div>
                )}
                <label className="flex cursor-pointer flex-col text-sm text-gray-500 items-center rounded-lg justify-center w-24 h-24 bg-gray-200 ml-2 hover:bg-gray-300 transition ease-in-out duration-200">
                  <Upload />
                  <div className="mt-1">Upload</div>
                  <input
                    value={imageUpload}
                    onChange={uploadImage}
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div>
              <div>Description </div>
              <textarea
                className="input"
                value={formData.productDescription}
                placeholder="Product Description"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    productDescription: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <div>Cost(₹)</div>
              <input
                className="input"
                placeholder="Price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    price: parseFloat(e.target.value),
                  }))
                }
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={submitProductForm}
                style={{ width: "6rem" }}
                className="btn bg-green-100 hover:bg-green-200"
              >
                Save
              </button>
              <button
                onClick={()=>navigate("/products")}
                style={{ width: "6rem" }}
                className="btn bg-red-100 hover:bg-red-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
