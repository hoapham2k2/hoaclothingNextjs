const uploadFileToCloudinary = async (
  file: File,
  callback: (url: string) => void
) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "clothing");
  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dxjnvnxco/image/upload",
    {
      method: "POST",
      body: data,
    }
  );
  const fileData = await res.json();
  callback(fileData.secure_url);
};

export default uploadFileToCloudinary;
