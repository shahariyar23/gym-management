import CourseDetailsDialgo from "@/components/gymer-view/courseDetails";
import GymCourseTile from "@/components/gymer-view/courseTile";
import CourseFilter from "@/components/gymer-view/filter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToastAction } from "@/components/ui/toast";
import { sortOptions } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchToCart } from "@/store/gyn/cartSlice";
import { fetchCourseDetails, fetchFilterCourse } from "@/store/gyn/courseSlice";

import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

const createSearchParamsHealper = (filterParam) => {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParam)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
};

const GymListing = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDiagalog, setOpenDiagalog] = useState(false);
  const { courses, courseDetails } = useSelector((state) => state.gymCourse);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  const handelSort = (e) => {
    setSort(e);
  };
  // handel filter fuction
  const handelFilter = (getSectionId, getCurrentOption) => {
    let copyFilter = { ...filter };
    const indexOfCurrentSection = Object.keys(copyFilter).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      copyFilter = {
        ...copyFilter,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOfCurrentOption =
        copyFilter[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        copyFilter[getSectionId].push(getCurrentOption);
      } else {
        copyFilter[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }
    setFilter(copyFilter);
    sessionStorage.setItem("filter", JSON.stringify(copyFilter));
  };

  // get course details
  const handelGetCourseDetails = (id) => {
    dispatch(fetchCourseDetails(id));
  };

  // handelCart
  const handelAddToCart = (id) => {
    if (!user?.id) {
      toast({
        variant: "destructive",
        title: "Can't Enroll",
        description: "First login please",
        action: (
          <ToastAction altText="Try again">
            <Link to="/auth/login">Login</Link>
          </ToastAction>
        ),
      });
      return;
    }
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

  // get local storage data
  useEffect(() => {
    setSort("nameAsc");
    setFilter(JSON.parse(sessionStorage.getItem("filter")) || {});
  }, [searchParams]);

  // set params for filter query
  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const createQuireString = createSearchParamsHealper(filter);
      setSearchParams(new URLSearchParams(createQuireString));
    }
  }, [filter]);

  // course details dialog
  useEffect(() => {
    if (courseDetails !== null) {
      setOpenDiagalog(true);
    }
  }, [courseDetails]);

  // fetch list of course
  useEffect(() => {
    if (filter !== null && sort !== null)
      dispatch(fetchFilterCourse({ filterParams: filter, sortParams: sort }));
  }, [dispatch, sort, filter]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <CourseFilter handelFilter={handelFilter} filter={filter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold">All course</h2>
          <div className="flex items-center gap-8">
            <span className="text-muted-foreground">
              {`${courses?.length} cousers`}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-2 items-center">
                <ArrowUpDown
                  variant="outline"
                  size="icon"
                  className="h-4 w-4"
                />
                Sort by
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup value={sort} onValueChange={handelSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {courses?.map((courseItem) => (
            <GymCourseTile
              handelGetCourseDetails={handelGetCourseDetails}
              key={courseItem?._id}
              course={courseItem}
              handelAddToCart={handelAddToCart}
            />
          ))}
        </div>
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

export default GymListing;
