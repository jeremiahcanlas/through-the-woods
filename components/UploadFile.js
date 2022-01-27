import React from "react";
import { useState } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Image as AntImage } from "antd";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const UploadFile = ({ images, setImages }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  // const [previewTitle, setPreviewTitle] = useState("");

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewVisible(true);

    setPreviewImage(file.url || file.preview);

    // setPreviewTitle(
    //   file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    // );
  };

  const handleChange = ({ fileList }) => {
    setImages(fileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={images}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {images.length >= 8 ? null : uploadButton}
      </Upload>

      <Modal
        visible={previewVisible}
        title={"Upload Preview"}
        footer={null}
        onCancel={handleCancel}
      >
        <AntImage alt="image" preview={false} src={previewImage} placeholder />
      </Modal>
    </>
  );
};

export default UploadFile;
