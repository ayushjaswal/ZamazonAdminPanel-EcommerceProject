import axios from "axios";
import React, { useEffect, useState } from "react";
import { path } from "../../variables";
import {
  CategoriesFormData,
  CategoriesProperties,
  config,
} from "../../types/types";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Sidebar from "../../Sidebar/Sidebar";
import Navbar from "../../Navbar/Navbar";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoriesFormData[]>([]);
  const [formData, setFormData] = useState<CategoriesFormData>({
    CategoryName: "",
    Properties: [],
  });
  const [addProperty, setAddProperty] = useState(false);
  const [propertiesValue, setPropertiesValue] = useState<CategoriesProperties>({
    propertyName: "",
    propertyValue: "",
    parent: false,
  });

  useEffect(() => {
    async function getCategories() {
      const res = await axios.get(`${path}/category`);
      const newRes: [] = res.data;
      const cat = newRes.filter(
        (values: CategoriesFormData) => values._id !== id
      );
      setCategories(cat);
    }
    getCategories();
  }, []);
  useEffect(() => {
    async function getCategory() {
      const res = await axios.get(`${path}/category/${id}`);
      setFormData(res.data);
    }
    getCategory();
  }, [id]);

  function handleParentAndProperties(ev: React.ChangeEvent<HTMLSelectElement>) {
    const selectedCategoryId = ev.target.value;
    const selectedCategory = categories.find(
      (category) => category._id === selectedCategoryId
    );
    setFormData((prev) => ({
      ...prev,
      Properties: prev.Properties.filter((val) => val.parent !== true),
      ParentCategory: selectedCategoryId,
    }));
    if (selectedCategory) {
      setFormData((prev) => {
        const existingPropertyNames = new Set(
          prev.Properties.map((prop) => prop.propertyName)
        );

        const updatedProperties = selectedCategory.Properties.reduce(
          (updatedProps, prop) => {
            if (!existingPropertyNames.has(prop.propertyName)) {
              updatedProps.push({
                propertyName: prop.propertyName,
                propertyValue: prop.propertyValue,
                parent: true,
              });
            }
            return updatedProps;
          },
          prev.Properties.filter((val) => val.parent !== true)
        );

        return {
          ...prev,
          Properties: updatedProperties,
          ParentCategory: selectedCategoryId,
        };
      });
    }
  }

  function handleProperties() {
    setFormData((prev) => ({
      ...prev,
      Properties: [...prev.Properties, propertiesValue],
    }));
    setPropertiesValue({ propertyName: "", propertyValue: "", parent: false });
    setAddProperty(false);
  }

  function handlePropertyDelete(name: string) {
    const value = formData.Properties.filter(
      (property) => property.propertyName !== name
    );
    setFormData((prev) => ({ ...prev, Properties: value }));
  }

  async function handleSubmit() {
    try {
      const res = await axios.post(
        `${path}/category/update-category`,
        formData,
        config
      );
      if (res.data) {
        toast.success("Category updated!");
        setTimeout(() => {
          navigate("/categories");
        }, 500);
      } else {
        toast.error("Failed to update category!");
      }
    } catch (err) {
      toast.error("Failed to update category!");
      console.log(err);
    }
  }

  return (
    <div>
      <Toaster richColors position="bottom-center" />
      <div className="md:hidden">
        <Navbar />
      </div>
      <div className="w-full">
        <div className="flex w-full">
          <Sidebar />
          <div className="p-3 w-full overflow-y-auto h-[100vh] text-[10px] md:text-[1rem]">
            <h1>Categories</h1>
            <div className="productForm">
              <div className="flex gap-3 w-full">
                <div className="w-full">
                  <div>New Category</div>
                  <input
                    className="input"
                    placeholder="New Category"
                    value={formData.CategoryName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        CategoryName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="w-full ">
                  <div>Parent Category</div>
                  <select
                    defaultValue={
                      typeof formData.ParentCategory === "string"
                        ? formData.ParentCategory
                        : formData.ParentCategory?._id
                    }
                    className="input"
                    value={
                      typeof formData.ParentCategory === "string"
                        ? formData.ParentCategory
                        : formData.ParentCategory?._id
                    }
                    onChange={handleParentAndProperties}
                  >
                    <option>No parent Category</option>
                    {categories.map((category) => (
                      <option value={category._id}>
                        {category.CategoryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {formData.Properties.length > 0 && (
                <table className="basic">
                  <thead>
                    <tr>
                      <td>Property Name</td>
                      <td>Property Value</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  {formData.Properties.map((property) => (
                    <tbody key={property.propertyName}>
                      <tr>
                        <td>{property.propertyName}</td>
                        <td>{property.propertyValue}</td>
                        <td>
                          {" "}
                          <button
                            onClick={() =>
                              handlePropertyDelete(property.propertyName)
                            }
                            className="btn bg-red-100 hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              )}
            </div>
            <div className="py-2">
              <button
                onClick={() => setAddProperty(true)}
                className="btn bg-blue-50 hover:bg-blue-100"
              >
                Add properties
              </button>
              {addProperty && (
                <div className="flex gap-2 mt-2">
                  <input
                    className="input"
                    placeholder="Property Name (example: color)"
                    value={propertiesValue.propertyName}
                    onChange={(e) =>
                      setPropertiesValue((prev) => ({
                        ...prev,
                        propertyName: e.target.value,
                      }))
                    }
                  />
                  <input
                    className="input"
                    placeholder="Property Value (example: Red, Blue, Black)"
                    value={propertiesValue.propertyValue}
                    onChange={(e) =>
                      setPropertiesValue((prev) => ({
                        ...prev,
                        propertyValue: e.target.value,
                      }))
                    }
                  />
                  <button
                    onClick={handleProperties}
                    className="btn bg-green-100 hover:bg-green-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setPropertiesValue({
                        propertyName: "",
                        propertyValue: "",
                        parent: false,
                      });
                      setAddProperty(false);
                    }}
                    className="btn bg-red-100 hover:bg-red-200"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="btn bg-green-100 hover:bg-green-200"
              >
                Save
              </button>
              <button
                onClick={() => navigate("/categories")}
                className="btn bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
