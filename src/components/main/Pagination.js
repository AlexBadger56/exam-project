import React from "react";
import Pagination from "react-bootstrap/Pagination";

const PaginationComponent = ({
  totalItems,
  itemsOnPage,
  currentPage,
  paginate,
}) => {
  const totalPages = Math.ceil(totalItems / itemsOnPage);

  const pageItems = [];
  const maxPagesToShow = 5; // Максимальна кількість кнопок для показу

  // Перевірка, чи загальна кількість сторінок більше 1
  if (totalPages > 1) {
    // Попередня сторінка
    pageItems.push(
      <Pagination.Prev
        key="prev"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      />
    );

    // Сторінки для відображення
    for (let page = 1; page <= totalPages; page++) {
      if (
        page === 1 || // Перша сторінка завжди відображається
        page === totalPages || // Остання сторінка завжди відображається
        (page >= currentPage - 2 && page <= currentPage + 2) || // Відображати сторінки навколо поточної
        page === currentPage + maxPagesToShow - 1 // Остання сторінка в максимальному діапазоні
      ) {
        pageItems.push(
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => paginate(page)}
          >
            {page}
          </Pagination.Item>
        );
      } else if (
        page === currentPage - 3 && // Зробити перший елемент після пропуску
        currentPage > 3 // Якщо поточна сторінка більше 3
      ) {
        pageItems.push(<Pagination.Ellipsis key="ellipsis-before" disabled />);
      } else if (
        page === currentPage + maxPagesToShow && // Зробити останній елемент перед пропуском
        currentPage < totalPages - maxPagesToShow // Якщо поточна сторінка менше, ніж максимальна кількість сторінок залишилася
      ) {
        pageItems.push(<Pagination.Ellipsis key="ellipsis-after" disabled />);
      }
    }

    // Наступна сторінка
    pageItems.push(
      <Pagination.Next
        key="next"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    );
  }

  return <Pagination>{pageItems}</Pagination>;
};

export default PaginationComponent;
