import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import "./ProfileEditSkeletonLoader.scss";
import SkeletonLoader from "../SkeletonLoader";

const ProfileEditSkeletonLoader = () => {
  return (
    <Box className="profilEditeSkeletonLoader">
      <Box className="wrapperBox">
        <Box className="listBox">
          <Box className="proInfo">
            <Box className="proTitle">
              <SkeletonLoader height={10} width={100} />
            </Box>
          </Box>
          <Box className="profileimg">
            <SkeletonLoader height={66} />
          </Box>
          <Box className="proInfo">
            <Box className="proTitle">
              <SkeletonLoader height={10} width={100} />
            </Box>
          </Box>
          <Box className="proInfo">
            <Box className="proTitle">
              <SkeletonLoader height={11} width={120} />
              <SkeletonLoader height={10} width={200} />
            </Box>
          </Box>
          <Box className="proInfo">
            <Box className="proTitle">
              <SkeletonLoader height={11} width={120} />
              <SkeletonLoader height={10} width={200} />
            </Box>
          </Box>
          <Box className="proInfo">
            <Box className="proTitle">
              <SkeletonLoader height={11} width={120} />
              <SkeletonLoader height={10} width={200} />
            </Box>
          </Box>
          <Box className="proInfo">
            <Box className="proTitle">
              <SkeletonLoader height={11} width={120} />
            </Box>
           
          </Box>
          <Box className="proInfo">
            <Box className="proTitle">
              <Box className="probtn">
              <SkeletonLoader height={60} width={180} />
              <SkeletonLoader height={60} width={180} />
            </Box>
            </Box>
          </Box>
          <Box className="proInfo">
            <Box className="proTitle">
              <SkeletonLoader height={11} width={120} />
              <SkeletonLoader height={10} width={200} />
            </Box>
          </Box>
          <Box className="proInfo">
            <Box className="proTitle">
              <SkeletonLoader height={11} width={120} />
              <SkeletonLoader height={10} width={200} />
            </Box>
          </Box>
              <SkeletonLoader height={60} width={405} />

        </Box>
      </Box>
    </Box>
  );
};
export default ProfileEditSkeletonLoader;
