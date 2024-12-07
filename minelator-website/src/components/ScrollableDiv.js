import React, { useState, useMemo } from "react";

const ScrollableDiv = ({ resultedData }) => {
  const linesPerPage = 10; // Количество строк на "страницу"

  // Преобразование данных в массив строк
  const dataLines = useMemo(() => {
    return resultedData 
      ? JSON.stringify(resultedData, null, 2).split("\n") 
      : [];
  }, [resultedData]);

  // Инициализация visibleLines
  const [visibleLines, setVisibleLines] = useState(() =>
    Math.min(linesPerPage, dataLines.length)
  );

  // Обработанные данные для отображения
  const displayedData = dataLines.slice(0, visibleLines).join("\n");

  // Обработчик для загрузки следующих строк
  const handleShowMore = () => {
    setVisibleLines((prev) => Math.min(prev + linesPerPage, dataLines.length));
  };

  // Обработчик для возврата к началу
  const handleReset = () => {
    setVisibleLines(linesPerPage);
  };

  return (
    <div className="resultWrapper">
      <h3>Обработанные данные:</h3>
      <div className="scrollContainer">
        <pre className="scrollContent">{displayedData}</pre>
      </div>
      <div className="buttons">
        {visibleLines < dataLines.length && (
          <button onClick={handleShowMore}>Дальше</button>
        )}
        {visibleLines > linesPerPage && (
          <button onClick={handleReset}>Сбросить</button>
        )}
      </div>
    </div>
  );
};

export default ScrollableDiv;
