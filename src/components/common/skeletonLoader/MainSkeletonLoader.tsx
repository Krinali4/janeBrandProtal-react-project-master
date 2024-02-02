import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import "./mainSkeletonLoader.scss";
import SkeletonLoader from "./SkeletonLoader";

const MainSkeletonLoader = () => {
  return (
    <Box className="mainSkeletonLoader">
      <Box className="headerBox">
        <Box className="logoBox">
          <SkeletonLoader height={50} />
        </Box>
        <Box className="logoutBtn">
          <SkeletonLoader height={40} />
        </Box>
      </Box>
      <Box className="wrapperBox">
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
        <Box className="progressBox">
          <SkeletonLoader height={25} width={180} />
          <SkeletonLoader height={25} />
          <SkeletonLoader height={20} width={300} />
        </Box>
        <Box className="listBox">
        <SkeletonLoader height={25} width={200} />
          <Box className="proInfo">
            <Box className="profileimg">
              <SkeletonLoader height={66} />
            </Box>
            <Box className="proTitle">
              <SkeletonLoader height={18} />
              <SkeletonLoader height={11} width={200} />
              <SkeletonLoader height={10} width={120} />
            </Box>
          </Box>
          <Box className="proInfo">
            <Box className="profileimg">
              <SkeletonLoader height={66} />
            </Box>
            <Box className="proTitle">
              <SkeletonLoader height={18} />
              <SkeletonLoader height={11} width={200} />
              <SkeletonLoader height={10} width={120} />
            </Box>
          </Box>
          <Box className="proInfo">
            <Box className="profileimg">
              <SkeletonLoader height={66} />
            </Box>
            <Box className="proTitle">
              <SkeletonLoader height={18} />
              <SkeletonLoader height={11} width={200} />
              <SkeletonLoader height={10} width={120} />
            </Box>
          </Box> 
        </Box>
      </Box>
    </Box>
  );
};
export default MainSkeletonLoader;
