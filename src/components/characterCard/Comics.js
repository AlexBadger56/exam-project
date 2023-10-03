import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import PaginationComponent from "../main/Pagination";

const Comics = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedComic, setSelectedComic] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Додали стан для сторінки
  const [itemsOnPage] = useState(10); // Змінили кількість елементів на сторінці
  const [offset, setOffset] = useState(0);
  const [totalComics, setTotalComics] = useState(0); // Додайте стан для загальної кількості сторінок

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://gateway.marvel.com/v1/public/characters/${id}/comics?ts=1&apikey=ba9129e72667df3ce251058a90350325&hash=40c90ea382c6aedf8e37c3cc497de90f&offset=${offset}&limit=${itemsOnPage}`
        );
        if (!response.ok) throw new Error(`Error! Status: ${response.status}`);
        const dataJson = await response.json();
        setItem(dataJson.data.results);

        // Отримайте загальну кількість коміксів та обчисліть загальну кількість сторінок
        const totalComics = dataJson.data.total;
        setTotalComics(totalComics);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id, offset, itemsOnPage]);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (comic) => {
    setSelectedComic(comic);
    setShowModal(true);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setOffset((pageNumber - 1) * itemsOnPage);
  };

  return (
    <>
      {item?.map((comic) => (
        <div className="col-12 col-md-6 col-lg-3 mb-4" key={comic.id}>
          <div className="card card-item">
            <div className="card-body d-flex flex-column justify-content-between">
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt="Hero Avatar"
                className="card-img-top mb-3"
              />
              <h3 className="card-title mb-3">{comic.title}</h3>

              <Button variant="primary" onClick={() => handleShowModal(comic)}>
                View Details
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedComic?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedComic?.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="container d-flex justify-content-center">
        <PaginationComponent
          totalItems={totalComics} // Використовуйте totalPage замість довжини масиву item
          itemsOnPage={itemsOnPage}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </>
  );
};

export default Comics;
