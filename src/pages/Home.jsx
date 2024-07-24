import React, { useEffect, useState } from "react";
import commonGetApi from "../server/Api";
import hero_image from "../assets/images/hero1.jpg";
import { Dropdown, Image, Spinner } from "react-bootstrap";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";

const WellnessType = ['Standalone', 'Signature'];

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(Number(params.get('page')) || 1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const limit = Number(params.get('limit')) || 5;

  async function getData() {
    setLoading(true);
    const baseUrl='https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats';
    const filter = params.get('filter') || '';
    const date = selectedDate ? `&date=${moment(selectedDate).unix()}` : '';
    const type = selectedType ? `&type=${selectedType}` : '';
    const response = await commonGetApi(
      `${baseUrl}?filter=${filter}&page=${currentPage}&limit=${limit}${date}${type}`
    );
    if (response.status > 199 && response.status < 230) {
      setData(response.data);
      setLoading(false);
    }else{
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [location.search, currentPage, selectedDate, selectedType]);

  function changeHandler(e) {
    setSearchValue(e.target.value);
  }

  function searchHandler(e) {
    e.preventDefault();
    setSelectedDate('');
    navigate({
      search: `filter=${searchValue}&page=1&limit=${limit}`
    });
    setCurrentPage(1);
  }

  function handleDateChange(e) {
    setSelectedDate(e.target.value);
  }

  function handleTypeChange(type) {
    setSelectedDate('');
    setCurrentPage(1)
    setSelectedType(type);
  }

  function goToPage(page) {
    setCurrentPage(page);
    setSelectedDate('');
    navigate({
      search: `filter=${params.get('filter') || ''}&page=${page}&limit=${limit}`
    });
  }

  return (
    <section className="main-home-section">
      <div className="container">
        <header className="header">
          <h4 className="fs-28-18 text-white m-0">Wellness Retreats</h4>
        </header>
        <div className="main-hero-section">
          <div className="color-light-taupe-3 hero-content-wrapper">
            <Image src={hero_image} alt="" className="hero-image" />
            <h3 className="fs-28-18 fw-semibold mt-3">Discover Your Inner Peace</h3>
            <p className="fs-18-14 mb-1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, laborum, quibusdam vel exercitationem obcaecati inventore nulla totam architecto cupiditate nostrum facere modi sapiente quia.
            </p>
          </div>

          <div className="filter-button-frame">
            <div className="button-frame d-flex gap-3">
              <input className="input-box color-blue" type="date" placeholder="Filter by Date" name="" id="date" onChange={handleDateChange} />
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  {selectedType ||'Filter by Type'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {WellnessType.map((ele, i) => (
                    <Dropdown.Item key={i} onClick={() => handleTypeChange(ele)}>{ele}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="filter-frame d-flex">
              <input
                type="text"
                className="input-box color-blue"
                placeholder="Search retreats title"
                onChange={changeHandler}
                value={searchValue}
              />
              <button onClick={searchHandler} className="primary-btn">Search</button>
            </div>
          </div>

          {loading ? (
            <div className="loader-wrapper gap-3">
              <Spinner animation="border" role="status"></Spinner>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="card-main-wrapper">
              {data.length > 0 ? (
                data.map((ele, i) => {
                  const formattedDate = moment.unix(ele?.date).format("MMMM D, YYYY");
                  return (
                    <div key={i} className="card">
                      <div className="image-frame" onClick={()=>navigate(`/details/${ele.id}`)}>
                        <Image src={ele?.image || hero_image} alt="icon" className="card-image" />
                      </div>
                      <div className="card-content">
                        <h5 className="fs-24-16">{ele?.title}</h5>
                        <p className="fs-18-14 ellipsis-3">{ele?.description}</p>
                        <p className="fs-18-14 mb-1">Date: {formattedDate}</p>
                        <p className="fs-18-14 mb-1">Location: {ele?.location}</p>
                        <p className="fs-18-14 mb-1">Price: ${ele?.price}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No data found</p>
              )}
            </div>
          )}

          <div className="py-3 d-flex gap-3 justify-content-center">
            <button
              onClick={() => goToPage(currentPage > 1 ? currentPage - 1 : 1)}
              className="primary-btn"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              onClick={() => goToPage(currentPage + 1)}
              className="primary-btn"
            >
              Next
            </button>
          </div>
          <p className="text-center fs-14-12 mt-4">@ 2024 Wellness Retreats. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
