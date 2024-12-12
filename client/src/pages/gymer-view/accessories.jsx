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
import { ArrowUpDown } from "lucide-react";
import React, { useState } from "react";

const Accessories = () => {
  const [sort, setSort] = useState([]);
  const sortOptions = [];
  const handelFilter = () => {};
  const handelSort = () => {};
  const filter = () => {};
  const courses = [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <CourseFilter handelFilter={handelFilter} filter={filter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold">All Accessories</h2>
          <div className="flex items-center gap-8">
            <span className="text-muted-foreground">
              {/* {`${courses?.length} cousers`} */} 10
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
                  {sortOptions?.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem?.id}
                      key={sortItem?.id}
                    >
                      {sortItem?.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {courses?.map((courseItem) => (
            <GymCourseTile
              handelGetCourseDetails={handelGetCourseDetails}
              key={courseItem?._id}
              course={courseItem}
              handelAddToCart={handelAddToCart}
            />
          ))}
        </div> */}
      </div>
      {/* <CourseDetailsDialgo
        courseDetails={courseDetails}
        open={openDiagalog}
        setOpen={setOpenDiagalog}
        handelAddToCart={handelAddToCart}
      /> */}
    </div>
  );
};

export default Accessories;
