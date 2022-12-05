import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import BlogCard from "./BlogCard";
import PageHeader from "./PageHeader";
import { Box } from "@mui/material";
import { getBlogsApi } from "../apis";
import { Link } from "react-router-dom";
import { setBlogs } from "../store/slices/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "swiper";
import { grey } from "@mui/material/colors";

export default function BlogsCarousel() {
  const { blogs } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    if (blogs.length < 1) {
      getBlogsApi().then((res) => dispatch(setBlogs(res.data)));
    }
  }, []);

  return (
    <>
      <Box py="3" />
      <PageHeader title="Dreamland Discover" noBread />
      <Box py="3" />
      <Swiper
        spaceBetween={20}
        pagination={{
          clickable: true,
          bulletClass: `swiper-pagination-bullet blog-carousel`,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination]}
        style={{
          margin: "2% auto 5%",
        }}
      >
        {blogs.length > 0 &&
          blogs.map((b) => (
            <SwiperSlide>
              <Link to={"/blogs/" + b.id}>
                <BlogCard blog={b} />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
