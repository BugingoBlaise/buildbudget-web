import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import TextArea from "../../../components/Inputs/TextArea";
import Button from "../../../components/Button";
import Input from "../../../components/Inputs";
import Modal from "../../../components/Modal";
import MaterialService from "../MaterialService";
const API_URL = "http://localhost:8080/api/materials";
export const UpdateMaterial = ({ material, onClose, onUpdateSuccess }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (material) {
      setValue("materialName", material.materialName);
      setValue("supplierDetails", material.supplierDetails);
      setValue("price", material.price);

      if (material.imagePath) {
        setImagePreview(`data:image/jpeg;base64,${material.imagePath}`);
      }
    }
  }, [material, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("materialName", data.materialName);
    formData.append("supplierDetails", data.supplierDetails);
    formData.append("price", data.price);
    if (data.imagePath && data.imagePath.length > 0) {
      formData.append("imagePath", data.imagePath[0]);
    }

    MaterialService.updateMaterial(material.id, formData)
      .then((response) => {
        onUpdateSuccess(response.data);
      })
      .catch((error) => {
        console.error("Error updating Material", error);
      });
  };

  return (
    <Modal toggleFunction={onClose}>
      <h2 className="text-lg font-bold mb-4">Update Material</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="flex flex-col gap-4"
      >
        <Controller
          name="materialName"
          control={control}
          defaultValue={material.materialName}
          rules={{ required: "Regulation title is required" }}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="text-whiteTheme-textColor font-semibold text-base">
                Material Name
              </label>
              <Input
                type="text"
                placeholder="Material Name"
                {...field}
                className="!border-2 !border-slate-300 !pl-4"
              />
              {errors.materialName && (
                <p className="text-red-600 text-[13px]">
                  {errors.materialName.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="supplierDetails"
          control={control}
          defaultValue={material.supplierDetails}
          rules={{ required: "supplierDetails   are required" }}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="text-whiteTheme-textColor font-semibold text-base">
                Supplier Details
              </label>
              <TextArea
                {...field}
                placeholder="supplierDetails details"
                className="!border-whiteTheme-subPrimaryColor"
              />
              {errors.supplierDetails && (
                <p className="text-red-600 text-[13px]">
                  {errors.supplierDetails.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="price"
          control={control}
          defaultValue={material.price}
          rules={{ required: "price is required" }}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="text-whiteTheme-textColor font-semibold text-base">
                price
              </label>
              <Input
                type="number"
                step
                placeholder="price "
                {...field}
                className="!border-2 !border-slate-300 !pl-4"
              />
              {errors.price && (
                <p className="text-red-600 text-[13px]">
                  {errors.price.message}
                </p>
              )}
            </div>
          )}
        />
        {imagePreview && (
          <div className="flex justify-start mt-2">
            <img
              src={`${API_URL}/image/${material.imagePath}`}
              alt="Preview"
              className="w-20 h-20 object-cover"
            />
          </div>
        )}
        <Controller
          name="imagePath"
          control={control}
          defaultValue={material.imagePath}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="text-whiteTheme-textColor font-semibold text-base">
                Material Image
              </label>
              <Input
                type="file"
                {...field}
                onChange={(e) => {
                  field.onChange(e.target.files);
                  handleImageChange(e);
                }}
                className="!border border-stroke !border-slate-300 !pl-4"
              />
            </div>
          )}
        />
        <Button value="Update" className="mt-4" type="submit" />
      </form>
    </Modal>
  );
};
