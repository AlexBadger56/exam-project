import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// import PaginationControlled from "../components/Pagination";

const Comics = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://gateway.marvel.com/v1/public/characters/${id}/comics?ts=1&apikey=ba9129e72667df3ce251058a90350325&hash=40c90ea382c6aedf8e37c3cc497de90f`
        );
        if (!response.ok) throw new Error(`Error! Status: ${response.status}`);
        const dataJson = await response.json();
        setItem(dataJson.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      {item?.map((item) => (
        <div className="col-12 col-md-6 col-lg-3 mb-4" key={item.id}>
          <div className="card">
            <div className="card-body">
              <img
                src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                alt="Hero Avatar"
                className="card-img-top"
              />
              <h3 className="card-title">{item.title}</h3>

              <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                Launch demo modal
              </button>

              <div
                class="modal fade"
                id="exampleModalCenter"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">
                        Modal title
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">{item.description}</div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="button" class="btn btn-primary">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Comics;
