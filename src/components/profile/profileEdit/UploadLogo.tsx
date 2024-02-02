import { Component } from 'react';
import { Box } from "@mui/material";
import "./UploadLogo.scss";
import uploadText from "../../../statics/images/penCase.jpg";
import CancelIcon from '@mui/icons-material/Cancel';
import EditImage from "../../../statics/images/editImage.png"
import UserManager from '../../../core/utils/UserManager';
import { Typography } from "@mui/material";

interface IProps {
  imgUrl?: string;
  setImgUrl?: any;
  setImgObj?: any;
  imgObj?: any;
  setNewImgObj?:any
}

export class UploadLogo extends Component<IProps> {

  state = {
    profileImg: uploadText,
    flag: true,
    userName: "",
    userImg: ""
  }
  imageHandler = (e: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.props.setImgObj(null);
        this.props.setNewImgObj(e.target.files[0])
        this.setState({ profileImg: reader.result, flag: true, userName: "" })
      }
    }
    reader.readAsDataURL(e.target.files[0])
  };

  delete = (e: any): void => {
    this.setState({ profileImg: uploadText, flag: false, userName: UserManager.shared().user.name.charAt(0) });
    this.props.setImgObj(null);
    this.props.setImgUrl("");
  };

  componentDidMount() {

    const userDetails = UserManager.shared().user;
    if (userDetails.imgUrl != null) {

      this.setState({
        profileImg: userDetails.imgUrl
      })
    }
    else {
      this.setState({
        userName: userDetails.name?.charAt(0)
      })
    }

    if (this.props.imgObj == null) {
      this.setState({
        flag: false
      })
    }
  }
  render() {

    const { profileImg } = this.state;
    return (
      <>
        <Box className="uploadLogo">

          <Box className="imageHandler">

            <Box className='userImg' sx={{ color: "#FFF", fontWeight: "600", fontSize: "16px", mb: 1 }}>
              {this.state.userImg == "" &&
                <Typography>{this.state.userName}</Typography>}
            </Box>
            <Box className={this.state.flag ? "img-holder-active" : "img-holder"}>
              {this.state.flag && <CancelIcon className='deleteIcon' onClick={this.delete} />}
              <img src={this.state.userImg == "" ? profileImg : URL.createObjectURL(this.props.imgObj)} id="img" className="img" />
            </Box>
            <input type="file" accept="image/*" name="image-upload" id="input" onChange={this.imageHandler} />
          </Box>
          <img className='editIcon' style={{ position: "absolute", zIndex: 1 }} src={EditImage} width="25px" height="25px" alt="edit-icon" />
        </Box>
      </>
    )
  }
}
