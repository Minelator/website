import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../store/fileSlice';

const FileUploader = () => {
  const dispatch = useDispatch();
  const [blobFile, setBlobFile] = useState(null);
  const [originalFileName, setOriginalFileName] = useState('');
  const { isLoading, error, isError, resultedDataURL } = useSelector((state) => state.file);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (blobFile) {
      dispatch(uploadFile(blobFile));
    } else {
      console.error('Файл не выбран');
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const blob = new Blob([file], { type: file.type });
      setBlobFile(blob);
      setOriginalFileName(file.name);
    }
  };

  const downloadFile = () => {
    if (resultedDataURL) {
      const a = document.createElement('a');
      a.href = resultedDataURL;
      a.download = originalFileName || 'processed_file.txt';
      a.click();
      window.URL.revokeObjectURL(resultedDataURL);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".txt" onChange={handleFileSelect} />
      <input type="submit" value="Upload File" />
      {isLoading && <div>Производится отправка файла...</div>}
      {isError && <div className="isError">Ошибка! {error}</div>}
      {resultedDataURL && (
        <div>
          <button type="button" onClick={downloadFile}>
            Скачать результат
          </button>
        </div>
      )}
    </form>
  );
};

export default FileUploader;
