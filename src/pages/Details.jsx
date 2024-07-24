import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import commonGetApi from "../server/Api";
import { useEffect } from "react";
import moment from "moment";
import { Image, Spinner } from "react-bootstrap";

export default function Details() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const para=useParams();
  async function getData() {
    setLoading(true);
    const baseUrl =
      `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats/${para?.id}`;
    const response = await commonGetApi(baseUrl);
    if (response.status > 199 && response.status < 230) {
      setData(response.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (

    <div className="card-main-wrapper vh-100">
          {loading ? (
            <div className="loader-wrapper gap-3">
              <Spinner animation="border" role="status"></Spinner>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
      <div  className="card">
        <div className="image-frame">
          <Image
            src={data?.image }
            alt="icon"
            className="card-image"
          />
        </div>
        <div className="card-content">
          <h5 className="fs-24-16">{data?.title}</h5>
          <p className="fs-18-14 ellipsis-3">{data?.description}</p>
          <p className="fs-18-14 mb-1">Date: {moment(data?.date).format("MMMM D, YYYY")}</p>
          <p className="fs-18-14 mb-1">Location: {data?.location}</p>
          <p className="fs-18-14 mb-1">Price: ${data?.price}</p>
          <p className="fs-18-14 mb-1">condition: {data?.condition}</p>
          <p className="fs-18-14 mb-1">Tags:{data?.tag?.map(ele=>ele)}</p>
        </div>
      </div>)}
    </div>
  );
}
