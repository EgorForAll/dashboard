import { useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putData } from "../../../store/api-actions";
import { findId, updateItem } from "../../../utils/utils";
import { findWorkers, updateSelectedCompanies } from "../../../store/actions";
import Loader from "../../loader/loader";

const WorkersForm = () => {
  // Текущие все компании
  const selectedCompanies = useSelector((state) => state.selectedCompanies);
  const companies = useSelector((state) => state.companies);
  const workers = useSelector((state) => state.workers);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  // содержимое полей формы привязно к state
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState(selectedCompanies[0].name);

  // рефы для получения содержимых полей формы
  const nameRef = useRef();
  const surnameRef = useRef();
  const companyRef = useRef();
  const positionRef = useRef();
  const formRef = useRef();

  // Отправка обновлненного массива компаний на сервер
  const dispatch = useDispatch();
  const onSendData = (array, callback) => dispatch(putData(array, callback));
  const onUpdateWorkers = (array) => dispatch(findWorkers(array));
  const onUpdateSelectedCopmanies = (array) =>
    dispatch(updateSelectedCompanies(array));

  //   Сброс формы
  const onReset = () => {
    setSurname("");
    setCompany("");
    setName("");
    setPosition("");
    setCompany(selectedCompanies[0].name);
  };

  //   Отправка данных на сервер
  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();

      // если поля заполнены, то отправить данные
      if (name && surname && company && position) {
        setLoading(true);
        setError(false);
        const currentCompany = selectedCompanies.find(
          (item) => item.name === company
        );
        const currentPersonal = currentCompany.personal;
        const id = findId(currentPersonal);
        // Создание объекта новго работника
        const newWorker = {
          id: id,
          company_id: currentCompany.id,
          name: name,
          surname: surname,
          position: position,
        };

        // Помещение нового работника в массив персонала выбранной компании
        const newArrayOfPersonal = [...currentPersonal, newWorker];

        // Обнолвенный объект выбранной компании
        const companyUpdated = Object.assign({}, currentCompany, {
          personal: newArrayOfPersonal,
        });

        // Замена старого объекта обновленным
        const updatedArrayOfCompanies = updateItem(companies, companyUpdated);

        // Отправка данных на сервер и обнолвение redux
        onSendData(updatedArrayOfCompanies, setLoading);

        // Обновление redux
        const newArrayOfSelected = updateItem(
          selectedCompanies,
          companyUpdated
        );
        onUpdateSelectedCopmanies(newArrayOfSelected);

        // Сброс формы
        onReset();
        formRef.current.reset();
      } else {
        setError(true);
      }
    },
    [name, surname, company, position]
  );

  return (
    <form
      action=""
      className="form"
      method="POST"
      onSubmit={(e) => onSubmitHandler(e)}
      ref={formRef}
    >
      <div className="form-item">
        <h2 className="form-title">Добавить нового работника</h2>
      </div>
      <div className="form-item">
        <label htmlFor="name" className="form-label">
          Имя:
        </label>
        <input
          type="text"
          className="input-add"
          name="name"
          id="name"
          ref={nameRef}
          onChange={() => setName(nameRef.current.value)}
        />
      </div>
      <div className="form-item">
        <label htmlFor="surname" className="form-label">
          Фамилия:
        </label>
        <input
          type="text"
          className="input-add"
          name="surname"
          id="surname"
          ref={surnameRef}
          onChange={() => setSurname(surnameRef.current.value)}
        />
      </div>
      <div className="form-item">
        <label htmlFor="position" className="form-label">
          Должность:
        </label>
        <input
          type="text"
          className="input-add"
          name="position"
          id="position"
          ref={positionRef}
          onChange={() => setPosition(positionRef.current.value)}
        />
      </div>
      <div className="form-item">
        <label htmlFor="company" className="form-label">
          Название компании:
        </label>
        <select
          className="input-add select-form"
          id="company"
          name="company"
          ref={companyRef}
          defaultValue={selectedCompanies[0].name}
          onChange={() => setCompany(companyRef.current.value)}
        >
          {selectedCompanies.map((item) => (
            <option key={item.id} name={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      {isError && (
        <div className="form-item">
          <p className="error">Пожалуйста, заполните все поля формы</p>
        </div>
      )}
      <div className="form-item btns-wrapper">
        <button
          className="form-btn submit-btn"
          type="submit"
          disabled={isLoading}
        >
          Добавить работника
        </button>
        <button className="form-btn" type="reset" onClick={() => onReset()}>
          Сброс
        </button>
        {isLoading && <Loader />}
      </div>
    </form>
  );
};

export default WorkersForm;
