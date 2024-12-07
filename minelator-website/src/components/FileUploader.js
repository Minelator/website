import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFile, uploadFile } from "../store/fileSlice";

const FileUploader = () => {
  const dispatch = useDispatch();
  const { isLoading, error, isError, resultedDataURL, file } = useSelector(
    (state) => state.file
  );

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    dispatch(setFile(selectedFile));
  };

  const handleFileUpload = (event) => {
    event.preventDefault();
    if (!file) {
      alert("Выберите файл для загрузки.");
      return;
    }
    dispatch(uploadFile(file));
  };

  const handleDownload = () => {
    if (resultedDataURL) {
      const link = document.createElement("a");
      link.href = resultedDataURL;
      link.download = file.name;
      link.click();
    }
  };

  return (
    <form>
      <input
        type="file"
        accept=".txt,.json,.yaml,.toml,.properties,.jar,.zip"
        onChange={handleFileSelect}
      />
      <button onClick={handleFileUpload} type="submit">
        Отправить файл
      </button>
      {isLoading && <div>Производится отправка файла...</div>}
      {isError && <div className="isError">Ошибка! {error}</div>}
      {resultedDataURL && (
        <div>
        <button type="button" onClick={handleDownload}>
          Скачать обработанный файл
        </button>
        </div>
      )}
    </form>
  );
};

export default FileUploader;
