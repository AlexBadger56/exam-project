import "./main.scss";
import CharacterCard from "../characterCard/CharacterCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PaginationComponent from "./Pagination";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import logo from "../../assets/images/marvel-logo.png";
import CustomizedSwitches from "../ThemeToggle/ThemeToggle";

function Main() {
  const [items, setItems] = useState([]); // Створення стану для збереження списку персонажів
  const [currentPage, setCurrentPage] = useState(1); // Створення стану для поточної сторінки
  const [itemsOnPage] = useState(20); // Створення стану для кількості елементів на сторінці
  const offset = (currentPage - 1) * itemsOnPage; // Обчислення зсуву для отримання даних з сервера
  const limit = itemsOnPage; // Ліміт кількості елементів на сторінці
  const [url, setUrl] = useState(
    "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=ba9129e72667df3ce251058a90350325&hash=40c90ea382c6aedf8e37c3cc497de90f"
  ); // Створення стану для URL-адреси запиту до сервера Marvel
  const [search, setSearch] = useState(""); // Створення стану для рядка пошуку
  const [validated, setValidated] = useState(false); // Створення стану для перевірки валідації форми

  useEffect(() => {
    // Ефект виконує запит до сервера Marvel при зміні URL, зсуву або ліміту
    const fetchData = async () => {
      const response = await fetch(`${url}&offset=${offset}&limit=${limit}`);
      const data = await response.json();

      setItems(data);
    };

    fetchData(); // Виклик функції fetchData при завантаженні компонента та при зміні станів url, offset або limit
  }, [url, offset, limit]);

  const currentItem = items?.data?.results; // Отримання списку персонажів з відповіді сервера
  const paginate = (pageNumber) => setCurrentPage(pageNumber); // Функція для зміни поточної сторінки

  const searchMarvel = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    if (search.trim() === "") {
      // Перевірка, чи рядок пошуку не порожній
      setUrl(
        `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=2e1cdeec426ae323484f29024084c206&hash=d516513ba95b9407c7aca0f73b241f8a`
      );
      return;
    }

    setUrl(
      `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${search}&ts=1&apikey=2e1cdeec426ae323484f29024084c206&hash=d516513ba95b9407c7aca0f73b241f8a`
    );
    setCurrentPage(1); // Оновлення сторінки після пошуку
  };

  return (
    <div className="global__wrapper">
      {/* Верхній блок сторінки */}
      <div className="header">
        <div className="container">
          <div className="row d-flex align-items-center justify-content-between">
            <div className="col-xs-12 col-md-2 col-lg-2 mb-4 mt-4 header__wrapper">
              {/* Логотип Marvel з посиланням на головну сторінку */}
              <Link to="/" className="header__logo">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="col-xs-12 col-md-6 col-lg-7">
              {/* Форма пошуку персонажів */}
              <Form onSubmit={searchMarvel} noValidate validated={validated}>
                <Form.Group className="mb-3" controlId="validationCustom01">
                  <InputGroup className="mb-3">
                    {/* Кнопка пошуку */}
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
                    {/* Рядок для введення тексту пошуку */}
                    <Form.Control
                      type="text"
                      placeholder="Enter character name..."
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
            <div className="col-xs-12 col-2 col-md-2 col-lg-1 mw-50 pb-3">
              {/* Компонент для перемикання теми */}
              <CustomizedSwitches />
            </div>
          </div>
        </div>
      </div>

      {/* Блок вмісту сторінки */}
      <div className="content container">
        <div className="row">
          {/* Відображення списку персонажів або повідомлення "Not Found" */}
          {!items ? <p>Not Found</p> : <CharacterCard items={currentItem} />}
        </div>
      </div>

      {/* Блок пагінації */}
      <div className="container d-flex justify-content-center">
        <PaginationComponent
          totalItems={items?.data?.total}
          itemsOnPage={itemsOnPage}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
export default Main;
