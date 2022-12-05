import React, { useEffect } from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { styled } from "@mui/system";
import { APARTMENTS_PATH } from "../constants/Constants";
import moment from "moment";

const CustomCard = styled(Card)(({ theme }) => ({
  display: "flex",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

export default function BlogCard({ blog }) {
  return (
    <CustomCard>
      <Box
        sx={{
          background: `url(${APARTMENTS_PATH + blog.imagePath})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          maxWidth: { xs: "100%", md: 250 },
          height: { xs: 150, md: "auto" },
          width: "100%",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Stack
            direction="row"
            alignItems="center"
            flexWrap={"wrap"}
            gap={1}
            mb={1}
            sx={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {blog.tags.split(",").map((b) => (
              <Chip size="small" key={b} label={b} />
            ))}
          </Stack>
          <Typography
            component="div"
            variant="h5"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {blog.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            by {blog.author}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="caption">
              {moment(blog.dateCreated).format("ll")}
            </Typography>
          </Box>
          <Box>
            <Box
              sx={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button endIcon={<NavigateNextIcon />}>Read More</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </CustomCard>
  );
}
