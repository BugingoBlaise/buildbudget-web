import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "../../../components/Modal";
import Input from "../../../components/Inputs";
import TextArea from "../../../components/Inputs/TextArea";
import Button from "../../../components/Button";
import LoanService from "../LoanService";

export const AddLoan = ({ onClose, onAddSuccess }) => {
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
      formData.append("LoanName", data.LoanName);
      formData.append("description", data.description);
      formData.append("interestRate", data.interestRate);
      formData.append("link", data.link);
      if (data.loanImage && data.loanImage.length > 0) {
        formData.append("loanImage", data.loanImage[0]);
      }

      const response = await LoanService.saveLoan(formData);
      toast.success("Loan added successfully", {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
      onAddSuccess(response.data);
      onClose();
    } catch (error) {
      console.error("Error adding loan:", error);
      toast.error("Failed to add loan. Please try again.", {
        autoClose: 3000,
        hideProgressBar: true,
        position: "top-center",
      });
    }
  };

  return (
    <Modal toggleFunction={onClose}>
      <h2 className="text-lg font-bold mb-4">Add Loan</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="flex flex-col gap-4"
      >
        <Controller
          name="LoanName"
          control={control}
          defaultValue=""
          rules={{ required: "Loan name is required" }}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="text-whiteTheme-textColor font-semibold text-base">
                Loan Name
              </label>
              <Input
                type="text"
                placeholder="Loan Title"
                {...field}
                className="!border-2 !border-slate-300 !pl-4"
              />
              {errors.LoanName && (
                <p className="text-red-600 text-[13px]">
                  {errors.LoanName.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: "Loan description is required" }}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="text-whiteTheme-textColor font-semibold text-base">
                Loan Description
              </label>
              <TextArea
                {...field}
                placeholder="Loan description details"
                className="!border-whiteTheme-subPrimaryColor"
              />
              {errors.description && (
                <p className="text-red-600 text-[13px]">
                  {errors.description.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="interestRate"
          control={control}
          defaultValue=""
          rules={{ required: "Loan interestRate is required" }}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="text-whiteTheme-textColor font-semibold text-base">
                Loan Interest Rate
              </label>
              <Input
                type="number"
                step
                placeholder="Loan interest rate"
                {...field}
                className="!border-2 !border-slate-300 !pl-4"
              />
              {errors.interestRate && (
                <p className="text-red-600 text-[13px]">
                  {errors.interestRate.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="link"
          control={control}
          defaultValue=""
          rules={{ required: "Site Link  is required" }}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="text-whiteTheme-textColor font-semibold text-base">
                Site Link
              </label>
              <Input
                type="text"
                step
                placeholder="Link from bank website"
                {...field}
                className="!border-2 !border-slate-300 !pl-4"
              />
              {errors.link && (
                <p className="text-red-600 text-[13px]">
                  {errors.link.message}
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
          name="loanImage"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="text-whiteTheme-textColor font-semibold text-base">
                Upload Image
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
