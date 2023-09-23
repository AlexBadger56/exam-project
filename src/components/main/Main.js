import "./main.scss";
import CharacterCard from "../characterCard/CharacterCard";
import { useEffect, useState } from "react";
import PaginationControlled from './Pagination';


function Main() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsOnPage] = useState(48);
  const offset = (currentPage - 1) * itemsOnPage; 
  const limit = itemsOnPage; 
  const [url, setUrl] = useState("https://gateway.marvel.com/v1/public/characters?ts=1&apikey=ba9129e72667df3ce251058a90350325&hash=40c90ea382c6aedf8e37c3cc497de90f")
  const [search, setSearch] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${url}&offset=${offset}&limit=${limit}`);
      const data = await response.json();
      setItems(data);
    };
    fetchData();
  }, [url, offset, limit]);
  
  console.log(items);

  const currentItem = items?.data?.results

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const searchMarvel = () => {
    setUrl(
      `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${search}&ts=1&apikey=2e1cdeec426ae323484f29024084c206&hash=d516513ba95b9407c7aca0f73b241f8a`
    );
    setCurrentPage(1); // Оновити сторінку після пошуку
  };
  

  return (
    <>
        <div className="header">
            <div className="container">
            </div>

            <div>
            <input type="search" placeholder='Search Here'
                 className='search'
                 onChange={e=>setSearch(e.target.value)}
                 onKeyPress={searchMarvel}/>
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