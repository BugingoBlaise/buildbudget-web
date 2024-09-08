import { Controller, useForm } from "react-hook-form";
import TextArea from "../../../components/Inputs/TextArea";
import Button from "../../../components/Button";
import PropTypes from "prop-types";
import {
  useAddBlogCommentMutation,
  useLazyBlogDetailsQuery,
} from "../../../app/api";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AddComment = ({ post_id }) => {
  const { control, handleSubmit } = useForm();

  const [addBlogComment, { isLoading, isSuccess, isError, error }] =
    useAddBlogCommentMutation();
  const [blogDetails] = useLazyBlogDetailsQuery();
  const onSubmit = (data) => {
    addBlogComment({ id: post_id, data });
  };

  //   Handling comments Submittion
  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success("Comment added successfully", {
        autoClose: 2000,
        hideProgressBar: true,
        position: "top-center",
      });
      blogDetails(post_id);
    } else if (isError) {
      if (error.status === 401) {
        toast.error("You need to login to add comments", {
          autoClose: 2000,
          hideProgressBar: true,
          position: "top-center",
        });
      } else {
        toast.error("Error Occured while adding comment", {
          autoClose: 2000,
          hideProgressBar: true,
          position: "top-center",
        });
      }
    }
  }, [blogDetails, control, error, isError, isLoading, isSuccess, post_id]);
  return (
    <div className="w-1/2 max-md:w-full flex flex-col gap-3">
      <header>
        <h1 className="font-bold text-whiteTheme-primaryColor text-lg">
          Leave comment
        </h1>
      </header>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full"
      >
        {" "}
        <Controller
          name="content"
          control={control}
          defaultValue=""
          render={({ field }) => {
            return (
              <>
                {" "}
                <TextArea
                  {...field}
                  placeholder={`Comment Message`}
                  className={"!border-whiteTheme-subPrimaryColor"}
                />
              </>
            );
          }}
        />
        <Button value={isLoading ? "commenting ....." : "Comment"} />
      </form>
    </div>
  );
};

AddComment.propTypes = {
  post_id: PropTypes.string,
};

export default AddComment;
