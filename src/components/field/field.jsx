import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putData } from "../../store/api-actions";
import { createArrayUpdated, updateItem } from "../../utils/utils";
import { findWorkers } from "../../store/actions";

const Filed = ({ data, selected, id, isWorker, worker }) => {
  // redux-state
  const companies = useSelector((state) => state.companies);
  const workers = useSelector((state) => state.workers);

  // actions
  const dispatch = useDispatch();
  const onPutData = (data) => dispatch(putData(data));
  const onPutNewWorkers = (array) => dispatch(findWorkers(array));

  const inputRef = useRef();

  // entries
  const key = data[0];
  const value = data[1];

  // содержимое поля
  const [inputValue, setInputValue] = useState(value);

  // Отравка обновленных данных на сервер. Для придания универсальности компоненту в него была инкапсулирована логика изменения как данных компаний, так и работников
  const onUpdateData = useCallback(() => {
    if (!isWorker) {
      const newArrayOfCompanies = createArrayUpdated(
        companies,
        key,
        inputValue,
        id,
        null
      );
      onPutData(newArrayOfCompanies);
    } else {
      const newArrayOfPersonal = createArrayUpdated(
        workers,
        key,
        inputValue,
        worker.id
      );
      const entryPersonal = { personal: newArrayOfPersonal };
      const newArrCompanies = createArrayUpdated(
        companies,
        key,
        inputValue,
        id,
        entryPersonal
      );
      const currentWorker = newArrayOfPersonal.find(
        (item) => item.id === worker.id
      );
      const workersToRedux = updateItem(workers, currentWorker);
      onPutNewWorkers(workersToRedux);
      onPutData(newArrCompanies);
    }
  }, [key, id, inputValue]);

  // Послу потери фокуса происходит обновление данных, но если значение было изменено
  const onBlurHandler = () => {
    if (inputValue !== value) {
      onUpdateData();
    }
  };

  return (
    <td className={selected ? "text-center company-selected" : "text-center"}>
      <input
        onBlur={() => onBlurHandler()}
        onMouseLeave={() => inputRef.current.blur()}
        type="text"
        name={key}
        id={key}
        className="field-input"
        ref={inputRef}
        defaultValue={inputValue}
        onChange={() => setInputValue(inputRef.current.value)}
      />
    </td>
  );
};

export default Filed;
