import "./main.scss";
import CharacterCard from "../characterCard/CharacterCard";
import Pagination from "./Pagination";
import md5 from "js-md5";
import { useEffect, useState } from "react";

const PUBLIC_KEY = "ba9129e72667df3ce251058a90350325"; // your public key
const PRIVATE_KEY = "7381aeb9b9fdc26766a6b4d09cb04393b7a4f9b8"; // youur private key

function Main() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  useEffect(() => {
    const fetchData = async () => {
      const ts = Number(new Date());
      const hash = md5.create();
      hash.update(ts + PRIVATE_KEY + PUBLIC_KEY);
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/characters?ts=${ts}&orderBy=name&limit=10&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`
      );
      const data = await response.json();
      setItems(data);
    };
    fetchData();
  }, []);
  console.log(items);

  //Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = items.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
        <div className="header">
            <div className="container">
            </div>

            <div className="search-bar">
                <input type="search" placeholder="Search Here" className="search" />
            </div>
        </div>

        <div className="content">
           {
            (!items)?<p>Not Found</p>:<CharacterCard items={items?.data?.results} />
           }
           <Pagination itemsPerPage={itemsPerPage} totalItems={items?.data?.results?.total}/> 
        </div>
    </>
    
  );
}

export default Main;