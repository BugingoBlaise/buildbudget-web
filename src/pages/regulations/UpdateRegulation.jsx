import { Controller, useForm } from "react-hook-form";
import Modal from "../../components/Modal";
import Input from "../../components/Inputs";
import TextArea from "../../components/Inputs/TextArea";
import { useState } from "react";
import Button from "../../components/Button";

export const UpdateRegulation = ({ onClose }) => {
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

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Modal toggleFunction={onClose}>
      <h2 className="text-lg font-bold mb-4">{"Update Regulation"}</h2>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="flex flex-col gap-4"
      >
        <Controller
          name="regulationTitle"
          control={control}
          defaultValue=""
          rules={{ required: "regulation title is required" }}
          render={({ field }) => {
            return (
              <div className="flex flex-col gap-1">
                <label className="text-whiteTheme-textColor font-semibold text-base">
                  Regulation title
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Regulation Title"
                    {...field}
                    className={`!border-2 !border-slate-300 !pl-4`}
                  />
                </div>
                {errors.regulationTitle && (
                  <p className="text-red-600 text-[13px]">
                    {errors.regulationTitle.message}
                  </p>
                )}
              </div>
            );
          }}
        />
        <Controller
          name="regulationDetails"
          control={control}
          defaultValue=""
          render={({ field }) => {
            return (
              <div className="flex flex-col gap-1">
                <label className="text-whiteTheme-textColor font-semibold text-base">
                  Regulation title
                </label>
                <TextArea
                  {...field}
                  placeholder={`Regulation details`}
                  className={"!border-whiteTheme-subPrimaryColor"}
                />
              </div>
            );
          }}
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
          rules={{ required: "Menu image is required" }}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="text-whiteTheme-textColor font-semibold text-base">
                Menu Image
              </label>
              <div className="relative">
                <Input
                  type="file"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.files);
                    handleImageChange(e);
                  }}
                  className={`!border border-stroke !border-slate-300 !pl-4`}
                />
              </div>
              {errors.image && (
                <p className="text-red-600 text-[13px]">
                  {errors.image.message}
                </p>
              )}
            </div>
          )}
        />
        <Button value={"Update"} className="mt-4" />
      </form>
    </Modal>
  );
};
