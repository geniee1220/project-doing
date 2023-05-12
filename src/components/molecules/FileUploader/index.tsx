import React, { useState, useRef, useCallback } from "react";

// Components
import { RiDragDropLine } from "react-icons/ri";
import styledComponent from "./FileUploader.style";
const { FileUploaderContainer, FileUploadInput, FileDropZone } =
  styledComponent;
import ErrorMessage from "../../atoms/Message/ErrorMessage";

export interface FileUploaderCSSProps {
  className?: string;
}

interface FileUploaderProps extends FileUploaderCSSProps {
  onFileSelected: (file: File) => void;
}

function FileUploader({ onFileSelected, className }: FileUploaderProps) {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>();
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFileUpload = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.DragEvent<HTMLDivElement>,
    setUrl: React.Dispatch<React.SetStateAction<string | undefined>>
  ) => {
    event.preventDefault();

    // 드래그 이벤트
    if ("dataTransfer" in event) {
      const file = event.dataTransfer?.files[0];
      if (!file || !file.type.match(/image.*/)) {
        setError(true);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
      onFileSelected(file);
    }

    // Input 이벤트
    else {
      const file = event.target.files?.[0];
      if (!file || !file.type.match(/image.*/)) {
        setError(true);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
      onFileSelected(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsHovered(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsHovered(false);
  };

  return (
    <FileUploaderContainer className={className}>
      <FileUploadInput
        type="file"
        accept="image/*"
        onChange={(event) => handleFileUpload(event, setThumbnailUrl)}
      />

      <FileDropZone
        onDragOver={handleDragOver}
        onDrop={(event) => handleFileUpload(event, setThumbnailUrl)}
        onDragLeave={handleDragLeave}
        className={isHovered ? "hover" : ""}
      >
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt="스터디 그룹 커버 이미지" />
        ) : (
          <>
            <RiDragDropLine className="dragIcon" />
            <p>
              스터디 그룹 커버 이미지를 올려주세요 <br />
              권장 이미지 사이즈: 700 x 160
            </p>
          </>
        )}
      </FileDropZone>

      {error && <ErrorMessage>이미지 파일만 업로드 가능합니다.</ErrorMessage>}
    </FileUploaderContainer>
  );
}

export default FileUploader;
