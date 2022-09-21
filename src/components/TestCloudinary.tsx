import axios from "axios";
import React, { useState } from "react";
import { UPLOAD_ENPOINT_CLOUDINARY, UPLOAD_PRESET } from "../config/constants";

export default function TestCloudinary() {
  const [image, setImage] = useState<File>();

  const handleUploadImage = async () => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", UPLOAD_PRESET!);
      console.log(UPLOAD_PRESET);
      console.log(data);
      const res = await axios.post(UPLOAD_ENPOINT_CLOUDINARY, data);
      console.log(res.data);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setImage(e.target.files![0])} />
      <button onClick={handleUploadImage}>Enviar imagen</button>
    </div>
  );
}
