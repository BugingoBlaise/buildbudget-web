import { useParams } from "react-router-dom";
import { useLazyBlogDetailsQuery } from "../../app/api";
import ContainerHolder from "../../components/container";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { FaUserTie } from "react-icons/fa6";
import AddComment from "./child/AddComment";
import FooterSection from "./FooterSection";
import { IMAGE_URL } from "../../constants/Environments";
import LoadersSkeleton from "../../components/Loaders/LoadersSkeleton";
import moment from "moment";

const BlogDetail = () => {
  const { id } = useParams();
  const [blogDetails, { isLoading, isSuccess, isError, data: blogDetailData }] =
    useLazyBlogDetailsQuery();
  useEffect(() => {
    blogDetails(id);
  }, [blogDetails, id]);

  const postDetail = blogDetailData?.data?.post;
  const postComment = blogDetailData?.data?.comments;

  return (
    <div className="flex flex-col">
      <Navbar />
      <ContainerHolder className={"!py-28 "}>
        {isLoading && <LoadersSkeleton />}
        {isSuccess && (
          <div className="h-full flex flex-col gap-5">
            <header className="flex flex-col gap-5 mt-6">
              <h1 className="font-bold text-whiteTheme-primaryColor text-2xl">
                {postDetail?.title}
              </h1>
              <div className="flex items-center gap-4">
                <span className="rounded-full bg-blue-100 border-2 border-whiteTheme-primaryColor p-3 text-whiteTheme-primaryColor">
                  <FaUserTie size={25} />
                </span>
                <span className=" ">
                  <p className="font-bold text-sm text-whiteTheme-primaryColor capitalize">
                    {postDetail?.author?.first_name}
                    {""} {postDetail?.author?.last_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {moment(postDetail?.created_at).format("LLL")}
                  </p>
                </span>
              </div>
            </header>
            <main className="w-full flex flex-col gap-4">
              <div className="w-full h-[80vh] bg-red-200">
                <img
                  src={IMAGE_URL + postDetail?.image}
                  alt=""
                  className="rounded-lg"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
              <article>
                <p className="text-whiteTheme-primaryColor text-lg">
                  {postDetail?.content}
                </p>
              </article>

              {/* Comment Section */}
              <hr />
              <div className="flex flex-col gap-3">
                <h2 className="text-whiteTheme-primaryColor text-xl font-bold">
                  Comments
                </h2>
                <div className="flex flex-col gap-5">
                  {" "}
                  {postComment?.map((comment) => (
                    <>
                      <div
                        key={comment?.id}
                        className="flex items-center gap-4"
                      >
                        <span className="rounded-full bg-blue-100 border-2 border-whiteTheme-primaryColor p-3 text-whiteTheme-primaryColor">
                          <FaUserTie size={25} />
                        </span>
                        <div className="">
                          <span className="flex gap-3 items-center">
                            <p className="capitalize font-bold text-sm text-whiteTheme-primaryColor">
                              {comment?.author?.first_name}{" "}
                              {comment?.author?.last_name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {/* {comment?.created_at.split("T")[0]} */}
                              {moment(comment?.created_at).format("LLL")}
                            </p>
                          </span>
                          <p className="text-gray-500">{comment?.content}</p>
                        </div>
                      </div>
                      <hr className="w-1/2" />
                    </>
                  ))}
                </div>
                {/* Form Section */}
                <AddComment post_id={id} />
              </div>
            </main>
          </div>
        )}
        {isError && <span>Failed to load blog Details</span>}
      </ContainerHolder>
      <FooterSection />
    </div>
  );
};

export default BlogDetail;
