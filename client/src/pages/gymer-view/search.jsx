import CourseDetailsDialgo from "@/components/gymer-view/courseDetails";
import GymCourseTile from "@/components/gymer-view/courseTile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchToCart } from "@/store/gyn/cartSlice";
import { fetchCourseDetails } from "@/store/gyn/courseSlice";
import { getSearcResults, resetSearchResults } from "@/store/gyn/searchSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const SearchResult = () => {
  const [keyword, setKeyword] = useState();
  const [openDiagalog, setOpenDiagalog] = useState(false);
  const { courses, courseDetails } = useSelector((state) => state.gymCourse);
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.gymSearch);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  console.log(searchResults);
  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 1) {
      setTimeout(() => {
        dispatch(getSearcResults(keyword));
      }, 1000);
    } else {
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  const handelAddToCart = (id) => {
    dispatch(addToCart({ userId: user?.id, courseId: id, quantity: 1 })).then(
      (res) => {
        if (res?.payload?.success) {
          dispatch(fetchToCart({ userId: user?.id }));
          toast({
            title: "Course Enrollment successfully",
          });
        }
      }
    );
  };

  const handelGetCourseDetails = (id) => {
    dispatch(fetchCourseDetails(id));
  };
  useEffect(() => {
    if (courseDetails !== null) {
      setOpenDiagalog(true);
    }
  }, [courseDetails]);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-5xl font-extrabold">No result found!</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((courseItem) => (
          <GymCourseTile
            key={courseItem?._id}
            course={courseItem}
            handelAddToCart={handelAddToCart}
            handelGetCourseDetails={handelGetCourseDetails}
          />
        ))}
      </div>
      <CourseDetailsDialgo
        courseDetails={courseDetails}
        open={openDiagalog}
        setOpen={setOpenDiagalog}
        handelAddToCart={handelAddToCart}
      />
    </div>
  );
};

export default SearchResult;