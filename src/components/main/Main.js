import "./main.scss";
import CharacterCard from "../characterCard/CharacterCard";
import md5 from "js-md5";
import { useEffect, useState } from "react";
import PaginationControlled from './Pagination';
import FullWidthTextField from '../Search/Search';


const PUBLIC_KEY = "ba9129e72667df3ce251058a90350325"; // your public key
const PRIVATE_KEY = "7381aeb9b9fdc26766a6b4d09cb04393b7a4f9b8"; // youur private key

function Main() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsOnPage] = useState(10);
  const offset = (currentPage - 1) * itemsOnPage; // Вычисляем смещение
  const limit = itemsOnPage; // Устанавливаем лимит

  useEffect(() => {
    const fetchData = async () => {
      const ts = Number(new Date());
      const hash = md5.create();
      hash.update(ts + PRIVATE_KEY + PUBLIC_KEY);
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/characters?ts=${ts}&orderBy=name&limit=${limit}&offset=${offset}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`
      );
      const data = await response.json();
      setItems(data);
    };
    fetchData();
  }, [currentPage, itemsOnPage,offset, limit]);
  console.log(items);

  const currentItem = items?.data?.results

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
        <div className="header">
            <div className="container">
            </div>

            <div>
                <FullWidthTextField />
            </div>
        </div>

        <div className="content">
           {
            (!items)?<p>Not Found</p>:<CharacterCard items={currentItem} />
           }
           
        </div>

        <div className="container">
           <PaginationControlled 
          totalItems={items?.data?.total}
          itemsOnPage={itemsOnPage}
          paginate={paginate}/>
        </div>
       
    </>
  );
          }
export default Main;