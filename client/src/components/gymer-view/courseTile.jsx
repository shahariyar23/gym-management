import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const GymCourseTile = ({ course, handelGetCourseDetails, handelAddToCart }) => {
  return (
    <Card className="w-full h-full max-w-sm mx-auto">
      <div
        className="cursor-pointer"
        onClick={() => handelGetCourseDetails(course?._id)}
      >
        <div className="relative">
          <img
            src={course?.image}
            alt={course?.title}
            className="h-[350px] w-full object-center rounded-t-lg"
          />
          {course?.offerPrice !== null ? (
            <Badge
              className="
                             absolute top-2 left-2 bg-red-500 hover:bg-red-600 shadow-2xl"
            >
              Offer Price
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{course?.title}</h2>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              {course?.category}
            </span>
            <span className="text-sm text-muted-foreground">
              {course?.gymType}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span
              className={`${
                course?.offerPrice > 0
                  ? "line-through text-muted-foreground"
                  : "text-primary"
              } text-xl font-bold `}
            >
              BDT {course?.price}
            </span>
            {course?.offerPrice === null ? null : (
              <span className="text-xl font-bold text-primary">
                BDT{course?.offerPrice}
              </span>
            )}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button onClick={() => handelAddToCart(course?._id)} className="w-full">
          Course Enrollment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GymCourseTile;