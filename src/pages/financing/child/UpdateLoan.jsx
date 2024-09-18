import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import TextArea from "../../../components/Inputs/TextArea";
import Button from "../../../components/Button";
import Input from "../../../components/Inputs";
import Modal from "../../../components/Modal";
import LoanService from "../LoanService";

export const UpdateLoan = ({ loan, onClose, onUpdateSuccess }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (loan) {
      setValue("LoanName", loan.loanName);
      setValue("description", loan.description);
      setValue("interestRate", loan.interestRate);
      setValue("link", loan.link);
      if (loan.loanImage) {
        setImagePreview(`data:image/jpeg;base64,${loan.loanImage}`);
      }
    }
  }, [loan, setValue]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("LoanName", data.LoanName);
    formData.append("description", data.description);
    formData.append("interestRate", data.interestRate);
    formData.append("link", data.link);
    if (data.loanImage && data.loanImage.length > 0) {
      formData.append("loanImage", data.loanImage[0]);
    }

    LoanService.updateLoan(loan.id, formData)
      .then((response) => {
        onUpdateSuccess(response.data);
      })
      .catch((error) => {
        console.error("Error updating loan:", error);
      });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  return (
    <Modal toggleFunction={onClose}>
      <h2 className="text-lg font-bold mb-4">Update Loan</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="flex flex-col gap-4"
      >
        <Controller
          name="LoanName"
          control={control}
          defaultValue={loan.loanName}
          rules={
            {
              // required: "Loan name is required"
            }
          }
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
          defaultValue={loan.description}
          rules={
            {
              // required: "Loan description is required"
            }
          }
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
          defaultValue={loan.interestRate}
          rules={
            {
              //  required: "Loan interestRate is required"
            }
          }
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
          defaultValue={loan.link}
          rules={
            {
              //  required: "Site Link  is required"
            }
          }
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
        <Button value="Update" className="mt-4" />
      </form>
    </Modal>
  );
};
