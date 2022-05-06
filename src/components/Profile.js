import React, { useEffect, useRef, useState } from "react";
import { useProfile } from "../hooks/useProfile";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Dialog, Slider, Tooltip } from "@mui/material";
import Cropper from "react-easy-crop";
import getCroppedImg from "../utils/helper";
import { useNavigate } from "react-router-dom";
import profileApi from "../services/profileApi";

function Profile() {
  const navigate = useNavigate();
  const profileImageRef = useRef();
  const { profile, refetch } = useProfile();

  const [profileImage, setProfileImage] = useState();
  const [profileImageFormData, setProfileImageFormData] = useState();
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoomImage, setZoomImage] = useState(1);
  const [openCropImage, setOpenCropImage] = useState(false);
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    if (profile) {
      setProfileData({
        username: profile.username,
        email: profile.email,
        name: profile.name,
      });
      // setProfileImage()
    }
  }, [profile]);

  // console.log(profileImageFormData);
  const profileChangeHandler = (e) => {
    const { name, value } = e.target;
    setProfileData((oldState) => ({
      ...oldState,
      [name]: value,
    }));
  };
  const updatePostHandler = async () => {
    const formData = new FormData();
    formData.append("avatar", profileImageFormData, `${profile._id}.png`);
    formData.append("username", profileData.username);
    formData.append("name", profileData.name);

    try {
      await profileApi.updateProfile(formData);
      await refetch();
      alert("profile updated");
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) navigate("/login", { replace: true });
  }, [navigate]);
  const onSelectFile = (event) => {
    if (profileImage === undefined) {
      setProfileImage(null);
    }
    // console.log('d');

    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setProfileImage(reader?.result);
        setOpenCropImage(true);
      });
    }
  };
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
    console.log(croppedArea);
  };

  const chooseImage = async () => {
    const { base64, canvas } = await getCroppedImg(profileImage, croppedArea);

    canvas.toBlob(function (blob) {
      // link.href = URL.createObjectURL(blob);
      setProfileImageFormData(blob);
      // console.log(link.href);// this line should be here
    }, "image/png");

    setProfileImage(base64);
    setOpenCropImage(false);
  };

  const triggerImageProfileSelectPopup = () => {
    profileImageRef?.current?.click();
  };
  const handleClose = () => {
    // setOpen(false);
    setOpenCropImage(false);
  };
  console.log();
  return (
    <div className="bg-[#202225] relative h-screen">
      {profileImage ? (
        <Dialog
          fullWidth
          open={openCropImage}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          // className="relative"
        >
          <div className="h-[200px] min-h-[60vh] w-full">
            <Cropper
              image={profileImage}
              crop={crop}
              zoom={zoomImage}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoomImage}
              onCropComplete={onCropComplete}
            />
            <Slider
              min={1}
              max={3}
              step={0.1}
              value={zoomImage}
              onChange={(zoom) => setZoomImage(zoom)}
            />
          </div>
          {/* <div className='mb-12'>
            <Slider min={1} max={3} step={0.1} value={zoom} onChange={(zoom) => setZoom(zoom)} />
          </div> */}
          <div className="absolute bottom-1 right-1 flex items-center">
            <button
              type="button"
              className="bg-white py-1 px-3 rounded-md"
              onClick={chooseImage}
            >
              Choose
            </button>
          </div>
        </Dialog>
      ) : null}
      <div className="relative max-w-full w-full h-[220px] max-h-[220px]">
        <img src="/bg-1.jpg" alt="" className="w-full h-full objectFit-cover" />

        <div className="absolute w-[138px] h-[138px] bottom-[-66px] left-4 overflow-hidden rounded-full border-[6px] border-[#202225] z-40">
          <Tooltip
            placement="bottom"
            title={
              <PhotoCameraIcon
                className="text-[black] hover:opacity-50"
                onClick={triggerImageProfileSelectPopup}
              />
            }
          >
            <img
              src={
                profileImage?.includes("base64")
                  ? profileImage
                  : `${process.env.REACT_APP_SERVER}/avatars/${profile?.avatar}`
              }
              alt="Avatar"
              className="w-full h-full"
            />
          </Tooltip>
          <input
            ref={profileImageRef}
            accept="image/*"
            type="file"
            onChange={onSelectFile}
            className="hidden"
          />
        </div>
      </div>
      <div className="bg-[#2F3136] w-[64vw] h-[54vh] mx-auto px-16 py-12 mt-[10vh] rounded">
        <div className="flex flex-col items-center mx-auto">
          <div className="flex items-center w-full mt-6 mb-12">
            <span className="w-40 flex font-medium text-black justify-end">
              Username*
            </span>
            <input
              onChange={profileChangeHandler}
              value={profileData?.username}
              className="w-full p-3 outline-none rounded ml-8 bg-[#40444B]"
              name="username"
              type="text"
            />
          </div>
          <div className="flex items-start w-full mb-12">
            <span className="w-40 flex font-medium text-black justify-end px-1 py-2">
              Email*
            </span>
            <input
              // onChange={profileChangeHandler}
              value={profileData?.email}
              className="w-full p-3 outline-none rounded ml-8 bg-[#40444B]"
              name="email"
              type="text"
            />
          </div>
          <div className="flex items-start w-full mb-12">
            <span className="w-40 flex font-medium text-black justify-end px-1 py-2">
              Name
            </span>
            <input
              onChange={profileChangeHandler}
              value={profileData?.name}
              className="w-full p-3 outline-none rounded ml-8 bg-[#40444B]"
              name="name"
              type="text"
            />
          </div>
          <button
            onClick={updatePostHandler}
            className="py-2 px-5 rounded bg-[#40444B] cursor-pointer text-black font-medium tracking-wide "
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
