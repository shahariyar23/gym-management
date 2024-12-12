import React, { useEffect, useState } from "react";
import bannerOne from "../../assets/banner1.jpg";
import bannerTwo from "../../assets/banner2.jpg";
import bannerThree from "../../assets/banner3.jpg";
import bannerFour from "../../assets/banner4.jpg";
import bannerFive from "../../assets/banner5.jpg";
import bannerSix from "../../assets/banner6.jpg";
import bannerSeven from "../../assets/banner7.jpg";
import { Button } from "@/components/ui/button";
import { IoManSharp, IoWomanSharp } from "react-icons/io5";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourseDetails,
  fetchFilterCourse,
  fetchHomeCourse,
} from "@/store/gyn/courseSlice";
import GymCourseTile from "@/components/gymer-view/courseTile";
import { Link, useNavigate } from "react-router-dom";
import CourseDetailsDialgo from "@/components/gymer-view/courseDetails";
import { addToCart, fetchToCart } from "@/store/gyn/cartSlice";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const category = [
  { id: "Strength Training", label: "Strength Training", icon: IoManSharp },
  { id: "Cardio & Endurance", label: "Cardio & Endurance", icon: IoManSharp },
  {
    id: "Flexibility & Mobility",
    label: "Flexibility & Mobility",
    icon: IoManSharp,
  },
  { id: "Mind-Body", label: "Mind-Body", icon: IoManSharp },
];
const type = [
  { id: "Boxing Gym", label: "Boxing Gym", icon: IoManSharp },
  { id: "Yoga Studio", label: "Yoga Studio", icon: IoManSharp },
  { id: "Women's-Only Gym", label: "Women's-Only Gym", icon: IoManSharp },
  { id: "24-Hour Gym", label: "24-Hour Gym", icon: IoManSharp },
];

const GymHome = () => {
  const slides = [
    bannerOne,
    bannerTwo,
    bannerThree,
    bannerFour,
    bannerFive,
    bannerSix,
    bannerSeven,
  ];
  const [currentBanner, setCurrentBanner] = useState(0);
  const dispatch = useDispatch();
  const { homeCourses, courseDetails } = useSelector(
    (state) => state.gymCourse
  );
  const { user } = useSelector((state) => state.auth);
  const [openDiagalog, setOpenDiagalog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handelNavigateListing = (currentItem, section) => {
    sessionStorage.removeItem("filter");
    const currentFilter = {
      [section]: [currentItem?.id],
    };

    sessionStorage.setItem("filter", JSON.stringify(currentFilter));
    navigate("/gym/listing");
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

  // auto change slide
  useEffect(() => {
    const time = setInterval(() => {
      setCurrentBanner((previouseSlie) => (previouseSlie + 1) % slides.length);
    }, 5000);
  }, []);

  // fetch gym course data
  useEffect(() => {
    dispatch(fetchHomeCourse());
  }, [dispatch]);

  // course details dialog
  useEffect(() => {
    if (courseDetails !== null) {
      setOpenDiagalog(true);
    }
  }, [courseDetails]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* image slider container */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            className={`${
              index == currentBanner ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 h-auto lg:h-full w-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transfrom -translate-y-auto"
          onClick={() =>
            setCurrentBanner(
              (previousBanner) =>
                (previousBanner - 1 + slides.length) % slides.length
            )
          }
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transfrom -translate-y-1/2"
          onClick={() =>
            setCurrentBanner(
              (previousBanner) => (previousBanner + 1) % slides.length
            )
          }
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      {/* gym by category */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Gym by category
          </h2>
        </div>
        <div className="grid gap-16 grid-cols-1 md:grid-cols-4 mx-9">
          {category.map((categoryItem) => (
            <Card
              key={categoryItem.id}
              className="cursor-pointer py-9 hover:shadow-lg transition-shadow duration-700"
              onClick={() => handelNavigateListing(categoryItem, "Category")}
            >
              <CardContent className="flex px-5 flex-col items-center justify-between">
                <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                <span className="font-bold">{categoryItem.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {/* gym by type */}
      <section className="bg-gray-100 pb-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Gym by type</h2>
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-4 mx-9">
          {type.map((gymTypeItem) => (
            <Card
              key={gymTypeItem.id}
              className="cursor-pointer py-9 hover:shadow-lg transition-shadow duration-700"
              onClick={() => handelNavigateListing(gymTypeItem, "Type")}
            >
              <CardContent className="flex px-5 flex-col items-center justify-between">
                <gymTypeItem.icon className="w-12 h-12 mb-4 text-primary" />
                <span className="font-bold">{gymTypeItem.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {/* gym course data */}
      <section className="bg-gray-100 pb-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Gym course</h2>
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-4 lg:grid-cols-5 mx-9">
          {homeCourses?.map((courseItem) => (
            <GymCourseTile
              handelGetCourseDetails={handelGetCourseDetails}
              key={courseItem?._id}
              course={courseItem}
              handelAddToCart={handelAddToCart}
            />
          ))}
        </div>
        <CourseDetailsDialgo
          courseDetails={courseDetails}
          open={openDiagalog}
          setOpen={setOpenDiagalog}
          handelAddToCart={handelAddToCart}
        />
      </section>
    </div>
  );
};

export default GymHome;
