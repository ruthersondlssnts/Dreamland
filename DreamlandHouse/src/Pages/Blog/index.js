import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogsApi } from "../../apis";
import PageHeader from "../../components/PageHeader";
import { APARTMENTS_PATH } from "../../constants/Constants";
import { setBlogs } from "../../store/slices/blogSlice";
import moment from "moment";
import BlogsCarousel from "../../components/BlogsCarousel";

export default function Blog() {
  const { id } = useParams();
  const { blogs } = useSelector((state) => state.blog);
  const [blog, setBlog] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!Number.isInteger(+id)) navigate("/404");

    if (blogs.length < 1) {
      getBlogsApi().then((res) => {
        dispatch(setBlogs(res.data));
        let b = res.data.filter((b) => b.id == id)[0];
        if (!b) navigate("/404");
        setBlog(b);
      });
    } else {
      let b = blogs.filter((b) => b.id == id)[0];
      if (!b) navigate("/404");
      setBlog(b);
    }
  }, []);

  return (
    blog && (
      <>
        <Box
          sx={{
            backgroundImage: "url(" + APARTMENTS_PATH + blog.imagePath + ")",
            height: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            top: "0",
            left: "0",
            width: "100%",
            zIndex: "-1",
            minHeight: "50vh",
          }}
        ></Box>
        <Container>
          <PageHeader title={blog.title} noBread />
          <Typography variant="h6" component="h6" px={4}>
            Written by {blog.author} - {moment(blog.dateCreated).format("ll")}
          </Typography>
          <Typography
            variant="body1"
            component="h6"
            py={5}
            dangerouslySetInnerHTML={{
              __html: blog.description.replace(/\n/g, "<br/>"),
            }}
          ></Typography>
        </Container>
        <BlogsCarousel />
      </>
    )
  );
}
