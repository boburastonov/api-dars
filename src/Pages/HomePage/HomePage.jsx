import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [data, setData] = useState([]);
  const getFunc = () => {
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories")
      .then((res) => res.json())
      .then((malumot) => setData(malumot?.data));
  };
  useEffect(() => {
    getFunc();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const modalFunc = () => {
    setOpenModal(!openModal);
  };

  const [nameEn, setNameEn] = useState();
  const [nameRu, setNameRu] = useState();
  const [pic, setPic] = useState();
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("name_en", nameEn);
  formData.append("name_ru", nameRu);
  formData.append("images", pic);

  const addFunc = (e) => {
    e.preventDefault();
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json)
      .then((dat) => {
        if (dat?.success) {
          toast.success(dat?.message);
          setOpenModal(false);
          // setData([...data, dat?.data]);
          getFunc();
        } else {
          toast.error(dat?.message);
        }
      });
  };

  return (
    <div>
      <button onClick={logOut}>log out</button>
      <h1>Home Page ga xush kelibsiz!</h1>
      <button onClick={modalFunc}>Modal</button>
      {openModal && (
        <div className="modal">
          <div className="modal-content">
            <h1>Modal content</h1>
            <form onSubmit={addFunc}>
              <input
                onChange={(e) => setNameEn(e?.target?.value)}
                type="text"
                placeholder="name"
                required
              />
              <input
                onChange={(e) => setNameRu(e?.target?.value)}
                type="text"
                placeholder="password"
                required
              />
              <input
                onChange={(e) => setPic(e?.target?.files[0])}
                type="file"
                placeholder="upload photo"
                required
                accept="image/png, image/jpeg"
              />
              <button>Add</button>
            </form>
          </div>
        </div>
      )}
      <div>
        <table id="customers">
          <tr>
            <th>name_en</th>
            <th>name_ru</th>
            <th>rasm</th>
          </tr>
          {data.map((item) => (
            <tr key={item?.id}>
              <td>{item?.name_en}</td>
              <td>{item?.name_ru}</td>
              <td>
                <img
                  src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`}
                  alt={item?.name_en}
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default HomePage;
