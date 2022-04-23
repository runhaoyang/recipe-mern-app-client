import { useRef } from "react";

const UploadFile = () => {
  const inputFileRef = useRef();

  const handleButtonClick = () => {
    inputFileRef.current.click();
  };

  return (
    <>
      <input type="file" ref={inputFileRef} />
      <button type="button" onClick={handleButtonClick}>
        Select file
      </button>
    </>
  );
};

export default UploadFile;
