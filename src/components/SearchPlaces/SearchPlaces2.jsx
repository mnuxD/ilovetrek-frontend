import { useState, useRef, useEffect } from "react";

import { CarouselCards2 } from "../Carousel";
import { CardPlace } from "../CardPlace";

import images from "../../images/images.jsx";
import places from "../../utils/constants/MockPlaces";

import "./_SearchPlaces.scss";

const { catarata, notfound } = images;

const SearchPlaces = () => {
  const [selectedPlaces, setSelectedPlaces] = useState(places);
  const place = useRef("");
  const city = useRef("");
  const difficulty = useRef("");

  const filter = () => {
    let selected = [];
    const transformText = (str) => {
      return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    };
    const filterByName = (name, input) => {
      let a = 0;
      const nameArray = transformText(name).split(" ");
      for (let i = 0; i < nameArray.length; i++) {
        if (nameArray[i].startsWith(transformText(input))) a++;
      }
      return a;
    };

    places?.map((placemap, i) => {
      if (
        filterByName(placemap.name, place.current.value) &&
        transformText(placemap.city).startsWith(
          transformText(city.current.value)
        ) &&
        transformText(placemap.difficulty).includes(
          transformText(difficulty.current.value)
        )
      ) {
        selected.push(placemap);
      }
    });
    setSelectedPlaces(selected);
  };

  const handleCleanPlace = () => {
    place.current.value = "";
    filter();
  };
  const handleCleanCity = () => {
    city.current.value = "";
    filter();
  };
  const handleCleanDifficulty = () => {
    difficulty.current.value = "";
    filter();
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div className="search search2">
        <form className="search__form">
          <span className="search__form__label">Lugar: </span>
          <input
            className="search__form__input"
            placeholder="Nombre del destino"
            name="place"
            ref={place}
            onChange={filter}
          />
          <input
            onClick={handleCleanPlace}
            className="search__form__button"
            type="reset"
            value="X"
          />
        </form>
        <form className="search__form">
          <span className="search__form__label">Ciudad: </span>
          <input
            className="search__form__input"
            placeholder="Ciudad del destino"
            ref={city}
            onChange={filter}
          />
          <input
            onClick={handleCleanCity}
            className="search__form__button"
            type="reset"
            value="X"
          />
        </form>
        <form className="search__form">
          <span className="search__form__label" style={{ marginRight: "20px" }}>
            Dificultad:{" "}
          </span>
          <select
            style={{ marginLeft: "-10px", height: "28px" }}
            className="search__form__input"
            placeholder="Dificultad del destino"
            ref={difficulty}
            onChange={filter}
            defaultValue=""
          >
            <option value="">Seleccione una dificultad</option>
            <option value="Facil">Fácil</option>
            <option value="Media">Media</option>
            <option value="Exigente">Exigente</option>
            <option value="Experto">Experto</option>
          </select>
          <input
            onClick={handleCleanDifficulty}
            className="search__form__button2"
            type="reset"
            value="X"
          />
        </form>
      </div>
      {selectedPlaces.length !== 0 ? (
        <CarouselCards2
          body={selectedPlaces.map((place, i) => (
            <CardPlace
              key={i}
              name={place.name}
              difficulty={place.difficulty}
              walkTime={place.walkTime}
              time={place.time}
              city={place.city}
              image={catarata}
            />
          ))}
        />
      ) : (
        <div className="notFound">
          <img
            className="notFound__image"
            src={notfound}
            alt="place not found"
          />
          <p className="notFound__text">
            No hemos encontrado el destino que buscas :(
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPlaces;