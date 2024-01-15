import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putData } from "../../../store/api-actions";
import { findId } from "../../../utils/utils";
import Loader from "../../loader/loader";

const CompanyForm = () => {
  // содердимое полей формы привязно к state
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  // рефы для получения содержимых полей формы
  const nameRef = useRef();
  const addressRef = useRef();
  const formRef = useRef();

  // Отправка обновлненного массива компаний на почту
  const dispatch = useDispatch();
  const onSendData = (array, callback) => dispatch(putData(array, callback));

  // Текущие все компании
  const allCompanies = useSelector((state) => state.companies);

  const onReset = () => {
    setAddress("");
    setName("");
  };

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();

      // если поля заполнены, то отправить форму
      if (name && address) {
        setError(false);
        setLoading(true);
        // вычисление id для нового объекта
        const id = findId(allCompanies);

        // создание объекта новой компании
        const newCompany = {
          id: id,
          name: name,
          adress: address,
          personal: [],
        };

        // создание обновленного массива
        const newArrayOfCompanies = [...allCompanies, newCompany];

        // отправка обнолвенного массива на сервер с обновлением redux-state
        onSendData(newArrayOfCompanies, setLoading);

        // сброс содежимого полей
        onReset();
        formRef.current.reset();
      } else {
        setError(true);
      }
    },
    [name, address]
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
        <h2 className="form-title">Добавить новую компанию</h2>
      </div>
      <div className="form-item">
        <label htmlFor="name" className="form-label">
          Название компании:
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
        <label htmlFor="address" className="form-label">
          Адрес компании:
        </label>
        <input
          type="text"
          className="input-add"
          name="address"
          id="address"
          ref={addressRef}
          onChange={() => setAddress(addressRef.current.value)}
        />
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
          Добавить компанию
        </button>
        <button className="form-btn" type="reset" onClick={() => onReset()}>
          Сброс
        </button>
        {isLoading && <Loader />}
      </div>
    </form>
  );
};

export default CompanyForm;
