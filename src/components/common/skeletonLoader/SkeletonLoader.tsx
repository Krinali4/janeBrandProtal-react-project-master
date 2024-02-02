import { Box, TableBody, TableCell, TableRow } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

interface Iprops {
  boxCount?: number;
  height?: number | string;
  width?: number | string;
}
const SkeletonLoader = (props: Iprops) => {
  return (
    <Box width={"100%"}>
      {Array(props.boxCount)
        .fill("")
        .map((e, i) => (
          <Skeleton height={props.height} width={props.width} key={i} />
        ))}
    </Box>
  );
};
export default SkeletonLoader;
