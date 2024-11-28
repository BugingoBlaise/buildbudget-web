import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "../../../components/Modal";
import Input from "../../../components/Inputs";
import TextArea from "../../../components/Inputs/TextArea";
import Button from "../../../components/Button";

import MaterialService from "../MaterialService";

export const AddMaterial = ({ onClose, onAddSuccess }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("materialName", data.materialName);
      formData.append("materialDetails", data.materialDetails);
      formData.append("price", data.price);
      if (data.imagePath && data.imagePath.length > 0) {
        formData.append("imagePath", data.imagePath[0]);
      }

      const response = await MaterialService.saveMaterial(formData);
      toast.success("Material added successfully", {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
      onAddSuccess(response.data);
      onClose();
    } catch (error) {
      console.error("Error adding Material:", error);
      toast.error("Failed to add material. Please try again.", {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
    }
  };

  return (
    <Modal toggleFunction={onClose} className="!w-[55%]">
      <h2 className="text-lg font-bold mb-4">Add Material</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="flex flex-col gap-4"
      >
        <div className="flex gap-3 items-center">
          <Controller
            name="materialName"
            control={control}
            defaultValue=""
            rules={{ required: "Regulation title is required" }}
            render={({ field }) => (
              <div className="w-1/2 flex flex-col gap-1">
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
            name="price"
            control={control}
            defaultValue=""
            rules={{ required: "price is required" }}
            render={({ field }) => (
              <div className="w-1/2 flex flex-col gap-1">
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
        </div>
        <Controller
          name="materialDetails"
          control={control}
          defaultValue=""
          rules={{ required: "materialDetails   are required" }}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="text-whiteTheme-textColor font-semibold text-base">
                Material Details
              </label>
              <TextArea
                {...field}
                placeholder="Material Details... "
                className="!border-whiteTheme-subPrimaryColor"
              />
              {errors.materialDetails && (
                <p className="text-red-600 text-[13px]">
                  {errors.materialDetails.message}
                </p>
              )}
            </div>
          )}
        />

        {imagePreview && (
          <div className="flex justify-start mt-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover"
            />
          </div>
        )}
        <Controller
          name="imagePath"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="text-whiteTheme-textColor font-semibold text-base">
                Image
              </label>
              <Input
                type="file"
                onChange={(e) => {
                  field.onChange(e.target.files);
                  handleImageChange(e);
                }}
                className="!border border-stroke !border-slate-300 !pl-4"
              />
            </div>
          )}
        />
        <Button value="Save" className="mt-4" type="submit" />
      </form>
    </Modal>
  );
};
