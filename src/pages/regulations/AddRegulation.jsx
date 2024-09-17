import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";
import Input from "../../components/Inputs";
import TextArea from "../../components/Inputs/TextArea";
import Button from "../../components/Button";
import RegulationService from "./RegulationService";

export const AddRegulation = ({ onClose, onAddSuccess }) => {
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
      formData.append("regulationTitle", data.regulationTitle);
      formData.append("regulationDetails", data.regulationDetails);
      if (data.regulationImage && data.regulationImage.length > 0) {
        formData.append("regulationImage", data.regulationImage[0]);
      }

      const response = await RegulationService.saveRegulation(formData);
      toast.success("Regulation added successfully", {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
      onAddSuccess(response.data);
      onClose();
    } catch (error) {
      console.error("Error adding regulation:", error);
      toast.error("Failed to add regulation. Please try again.", {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
    }
  };

  return (
    <Modal toggleFunction={onClose}>
      <h2 className="text-lg font-bold mb-4">Add Regulation</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="flex flex-col gap-4"
      >
        <Controller
          name="regulationTitle"
          control={control}
          defaultValue=""
          rules={{ required: "Regulation title is required" }}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="text-whiteTheme-textColor font-semibold text-base">
                Regulation Title
              </label>
              <Input
                type="text"
                placeholder="Regulation Title"
                {...field}
                className="!border-2 !border-slate-300 !pl-4"
              />
              {errors.regulationTitle && (
                <p className="text-red-600 text-[13px]">
                  {errors.regulationTitle.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="regulationDetails"
          control={control}
          defaultValue=""
          rules={{ required: "Regulation details are required" }}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="text-whiteTheme-textColor font-semibold text-base">
                Regulation Details
              </label>
              <TextArea
                {...field}
                placeholder="Regulation details"
                className="!border-whiteTheme-subPrimaryColor"
              />
              {errors.regulationDetails && (
                <p className="text-red-600 text-[13px]">
                  {errors.regulationDetails.message}
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
          name="regulationImage"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="text-whiteTheme-textColor font-semibold text-base">
                Regulation Image
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
