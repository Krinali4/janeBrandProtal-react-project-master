import { Box } from "@mui/material";
import "./RewardsHistoryLoader.scss";
import SkeletonLoader from "../SkeletonLoader";

const RewardsHistoryLoader = () => {
  return (
    <Box className="mainSkeletonLoader">
      <Box className="wrapperBox">
        <Box className="listBox">
          <Box className="proInfo">
            <Box className="profileimg">
              <SkeletonLoader height={66} />
            </Box>
            <Box className="proTitle">
              <SkeletonLoader height={18} />
              <SkeletonLoader height={10} width={200} />
            </Box>
          </Box>
          <Box className="proInfo">
            <Box className="profileimg">
              <SkeletonLoader height={66} />
            </Box>
            <Box className="proTitle">
              <SkeletonLoader height={18} />
              <SkeletonLoader height={10} width={200} />
            </Box>
          </Box>
          <Box className="proInfo">
            <Box className="profileimg">
              <SkeletonLoader height={66} />
            </Box>
            <Box className="proTitle">
              <SkeletonLoader height={18} />
              <SkeletonLoader height={10} width={200} />
            </Box>
          </Box>

          <Box className="proInfo">
            <Box className="profileimg">
              <SkeletonLoader height={66} />
            </Box>
            <Box className="proTitle">
              <SkeletonLoader height={18} />
              <SkeletonLoader height={10} width={200} />
            </Box>
          </Box>
          <Box className="proInfo">
            <Box className="profileimg">
              <SkeletonLoader height={66} />
            </Box>
            <Box className="proTitle">
              <SkeletonLoader height={18} />
              <SkeletonLoader height={10} width={200} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default RewardsHistoryLoader;
