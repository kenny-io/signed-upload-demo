import { useState } from "react";
import styles from "../styles/Home.module.css";
import { generateSignature } from "../utils/generateSignature";
export function ImageUpload() {
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  async function handleWidgetClick() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "kennyy",
        uploadSignature: generateSignature,
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        resourceType: "image",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setIsImageUploaded(true);
        } else if (error) {
          console.log(error);
        }
      }
    );
    widget.open();
  }

  return (
    <div className={styles.container}>
      <div className={styles.vertical}>
        <button
          className={styles.button}
          type="button"
          onClick={handleWidgetClick}
        >
          Upload image
        </button>
      </div>

      {isImageUploaded ? (
        <>
          <div>Successfully uploaded</div>
        </>
      ) : null}
    </div>
  );
}
