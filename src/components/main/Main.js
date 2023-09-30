import "./main.scss";
import CharacterCard from "../characterCard/CharacterCard";
import { useEffect, useState } from "react";
import PaginationComponent from "./Pagination";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function Main() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsOnPage] = useState(50);
  const offset = (currentPage - 1) * itemsOnPage;
  const limit = itemsOnPage;
  const [url, setUrl] = useState(
    "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=ba9129e72667df3ce251058a90350325&hash=40c90ea382c6aedf8e37c3cc497de90f"
  );
  const [search, setSearch] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    // Функція для отримання даних з локального сховища (кешу)
    const getCachedData = () => {
      const cachedData = localStorage.getItem(url);
      if (cachedData) {
        setItems(JSON.parse(cachedData));
      }
    };

    // Перевірка наявності даних в кеші
    getCachedData();

    // Виконання запиту та оновлення даних
    const fetchData = async () => {
      const response = await fetch(`${url}&offset=${offset}&limit=${limit}`);
      const data = await response.json();

      // Збереження даних в локальному сховищі (кешу)
      localStorage.setItem(url, JSON.stringify(data));

      setItems(data);
    };

    const delay = 1000; // 1 секунда (1000 мілісекунд)
    const timeoutId = setTimeout(() => {
      fetchData();
    }, delay);

    fetchData();
    return () => clearTimeout(timeoutId);
  }, [url, offset, limit]);

  const currentItem = items?.data?.results;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const searchMarvel = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    if (search.trim() === "") {
      setUrl(
        `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=2e1cdeec426ae323484f29024084c206&hash=d516513ba95b9407c7aca0f73b241f8a`
      );
      return;
    }

    setUrl(
      `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${search}&ts=1&apikey=2e1cdeec426ae323484f29024084c206&hash=d516513ba95b9407c7aca0f73b241f8a`
    );
    setCurrentPage(1); // Оновити сторінку після пошуку
  };

  return (
    <>
      <div className="header"></div>

      <div className="container mt-4">
        <Form onSubmit={searchMarvel} noValidate validated={validated}>
          <Form.Group className="mb-3" controlId="validationCustom01">
            <InputGroup className="mb-3">
              <Button
                variant="primary"
                id="button-addon1"
                type="submit"
                style={{
                  backgroundColor: "#379683",
                  color: "#ffffff",
                  border: "none",
                }}
              >
                Search
              </Button>
              <Form.Control
                type="text"
                placeholder="Enter hero name..."
                required
                onChange={(e) => setSearch(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please type character name.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>

      <div className="content container">
        <div className="row">
          {!items ? <p>Not Found</p> : <CharacterCard items={currentItem} />}
        </div>
      </div>

      <div className="container d-flex justify-content-center">
        <PaginationComponent
          totalItems={items?.data?.total}
          itemsOnPage={itemsOnPage}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </>
  );
}
export default Main;
