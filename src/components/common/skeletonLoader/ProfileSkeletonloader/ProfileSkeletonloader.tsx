import { Box } from "@mui/material";
import "./ProfileSkeletonloader.scss";
import SkeletonLoader from "../SkeletonLoader";

const ProfileSkeletonLoader = () => {
  return (
    <Box className="profileSkeletonLoader">
      <Box className="PromainBtn">
        <Box className="profileBox">
          <Box className="proInfo">
            <Box className="profileimg">
              <SkeletonLoader height={66} />
            </Box>
            <Box className="proTitle">
              <SkeletonLoader height={25} />
              <SkeletonLoader height={15} width={150} />
            </Box>
          </Box>
          <Box className="pointBox">
            <SkeletonLoader height={66} />
          </Box>
        </Box>
        <Box className="profileEditBox">
          <Box className="profileBox" width={200}>
            <Box className="proTitle">
              <SkeletonLoader height={15} width={100} />
            </Box>
          </Box>
          <Box className="profileBox" width={200}>
            <Box className="proTitle">
              <SkeletonLoader height={15} width={100} />
            </Box>
          </Box>
        </Box>
        <Box className="profileEditBox">
          <Box className="profileBox" width={200} height={90}>
            <Box className="proEditTitle">
              <SkeletonLoader height={15} width={100} />
              <Box  className="mainSkeleton"><SkeletonLoader height={15} width={80}   /></Box>
            </Box>
          </Box>
          <Box className="profileBox" width={200} >
            <Box className="proEditTitle" >
              <SkeletonLoader height={15} width={100} />
              <Box  className="mainSkeleton"><SkeletonLoader height={15} width={80}   /></Box>
            </Box>
          </Box>
        </Box>

        <Box className="profileEditBox">
          <Box className="profileBox" width={200} height={90}>
            <Box className="proEditTitle">
              <SkeletonLoader height={15} width={100} />
              <Box className="mainSkeleton"><SkeletonLoader height={15} width={80}   /></Box>
            </Box>
          </Box>
          <Box className="profileBox" width={200} >
            <Box className="proEditTitle" >
              <SkeletonLoader height={15} width={100} />
              <Box className="mainSkeleton"><SkeletonLoader height={15} width={80}   /></Box>
            </Box>
          </Box>
        </Box>

        <Box className="profileEditBox">
          <Box className="profileBox" width={200} height={90}>
            <Box className="proEditTitle">
              <SkeletonLoader height={15} width={100} />
              <Box className="mainSkeleton"><SkeletonLoader height={15} width={80}   /></Box>
            </Box>
          </Box>
          <Box className="profileBox" width={200} >
            <Box className="proEditTitle" >
              <SkeletonLoader height={15} width={100} />
              <Box className="mainSkeleton"><SkeletonLoader height={15} width={80}   /></Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default ProfileSkeletonLoader;
