import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import TextArea from "../../../components/Inputs/TextArea";
import Button from "../../../components/Button";
import RegulationService from "../RegulationService";
import Input from "../../../components/Inputs";
import Modal from "../../../components/Modal";

export const UpdateRegulation = ({ regulation, onClose, onUpdateSuccess }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (regulation) {
      setValue("regulationTitle", regulation?.regulationTitle);
      setValue("regulationDetails", regulation?.regulationDetails);
      if (regulation?.regulationImage) {
        setImagePreview(
          `data:image/jpeg;base64,${regulation?.regulationImage}`
        );
      }
    }
  }, [regulation, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("regulationTitle", data.regulationTitle);
    formData.append("regulationDetails", data.regulationDetails);
    if (data.image && data.image.length > 0) {
      formData.append("regulationImage", data.image[0]);
    }

    RegulationService.updateRegulation(regulation?.id, formData)
      .then((response) => {
        onUpdateSuccess(response.data);
      })
      .catch((error) => {
        console.error("Error updating regulation:", error);
      });
  };

  return (
    <Modal toggleFunction={onClose}>
      <h2 className="text-lg font-bold mb-4">Update Regulation</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="flex flex-col gap-4"
      >
        <Controller
          name="regulationTitle"
          control={control}
          defaultValue={regulation?.regulationTitle}
          rules={{ required: "Regulation title is required" }}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="text-whiteTheme-textColor font-semibold text-base">
                Regulation title
              </label>
              <Input
                type="text"
                placeholder="Regulation Title"
                {...field}
                defaultValue={regulation?.regulationTitle}
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
          defaultValue={regulation.regulationDetails}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="text-whiteTheme-textColor font-semibold text-base">
                Regulation details
              </label>
              <TextArea
                {...field}
                placeholder="Regulation details"
                defaultValue={regulation.regulationDetails}
                className="!border-whiteTheme-subPrimaryColor"
              />
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
          name="image"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="text-whiteTheme-textColor font-semibold text-base">
                Regulation Image
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
        <Button value="Update" className="mt-4" />
      </form>
    </Modal>
  );
};
