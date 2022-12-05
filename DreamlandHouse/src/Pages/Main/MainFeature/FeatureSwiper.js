import { Skeleton, styled, Typography } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectCoverflow, Pagination, Navigation } from "swiper";
import styles from "./FeatureSwiper.module.css";
import { useSelector } from "react-redux";
import { PROJECTS_PATH } from "../../../constants/Constants";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      backgroundColor: theme.palette.common.black,
      opacity: 0.5,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  top: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background:
    "linear-gradient(0deg,rgba(29,39,49,1) 30%,rgba(255,255,255,0) 100%)",
  opacity: 0.5,
  transition: theme.transitions.create("background"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

export default function FeatureSwiper() {
  const { projects } = useSelector((state) => state.projects);
  const [openDialog, setOpenDialog] = useState(false);
  const [project, setProject] = useState(null);
  const navigate = useNavigate();
  return projects.length > 0 ? (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className={styles.swiper}
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
      >
        {projects.map((p) => (
          <SwiperSlide key={p.imagePath} className={styles.swiperslide}>
            <ImageButton
              focusRipple
              style={{ width: "100%", height: "100%" }}
              onClick={() => {
                setProject(p);
                setOpenDialog(true);
              }}
            >
              <ImageSrc
                style={{
                  backgroundImage: `url(${PROJECTS_PATH + p.imagePath})`,
                }}
              />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: "relative",
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  {p.name} <br />
                  {p.location.name}, {p.location.country}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* {project && ( */}
      <Dialog
        maxWidth={"md"}
        fullWidth={true}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle sx={{ textAlign: "center", fontSize: "20px" }}>
          {project?.name} <br />
          <Box sx={{ textAlign: "center", fontSize: "18px" }}>
            {project?.location.name}, {project?.location.country}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box
            component="img"
            sx={{
              height: 250,
              width: "auto",
              borderRadius: 10,
              margin: "auto",
              display: "block",
            }}
            alt="The house from the offer."
            src={PROJECTS_PATH + project?.imagePath}
          />
          <DialogContentText sx={{ m: 3 }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "16px",
                fontWeight: "500",
              }}
              dangerouslySetInnerHTML={{
                __html: project?.description.replace(/\n/g, "<br/>"),
              }}
            ></Typography>
          </DialogContentText>
          <Button
            sx={{
              margin: "auto",
              display: "block",
            }}
            variant="contained"
            size="large"
            onClick={() =>
              navigate(
                `/apartments?project=${project?.id}&name=${project?.name} - ${project?.location.name}, ${project?.location.country}`
              )
            }
          >
            View Properties
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* )} */}
    </>
  ) : (
    <SkeletonLoading />
  );
}

const SkeletonLoading = () => (
  <Box sx={{ p: 1 }}>
    <Box display="flex" gap={5}>
      <Box flex={1} display={{ xs: "none", md: "block" }}>
        <Skeleton
          animation="wave"
          sx={{ bgcolor: "grey.500", height: "60vh", width: "100%" }}
        />
      </Box>
      <Box flex={1}>
        <Skeleton
          animation="wave"
          sx={{ bgcolor: "grey.500", height: "60vh", width: "100%" }}
        />
      </Box>
      <Box flex={1} display={{ xs: "none", md: "block" }}>
        <Skeleton
          animation="wave"
          sx={{ bgcolor: "grey.500", height: "60vh", width: "100%" }}
        />
      </Box>
    </Box>
  </Box>
);
