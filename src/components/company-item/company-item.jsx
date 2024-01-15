import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedCompany, removeCompany } from "../../store/actions";
import Field from "../field/field";
import { nanoid } from "nanoid";

const CompanyItem = ({ company, isAll, isLoading }) => {
  // Добавление / удаление компаний из redux
  const dispatch = useDispatch();
  const onSelectCompany = (company) => dispatch(setSelectedCompany(company));
  const onRemoveCompany = (company) => dispatch(removeCompany(company));

  // Состояние переключение чекбокса
  const [selected, setSelected] = useState(false);

  // Получение массива данных компании
  const entries = Object.entries(company).slice(1);

  // Если включен флажок "Выбрать все", отсальные флажки тоже переключаются
  useEffect(
    () => (isAll && !isLoading ? setSelected(true) : setSelected(false)),
    [isAll, isLoading]
  );

  useEffect(() => {
    if (isLoading) {
      setSelected(false);
    }
  }, [isLoading]);

  // Логика пока только сотрудников выбранных компаний
  const onSelect = () => {
    if (selected) {
      setSelected(false);
      onRemoveCompany(company);
    } else {
      setSelected(true);
      onSelectCompany(company);
    }
  };
  return (
    <tr>
      <td className="text-center">
        <input
          className="checkbox-input"
          type="checkbox"
          name="select-all"
          checked={selected}
          onChange={() => onSelect()}
        />
      </td>
      {entries.length > 0 &&
        entries.map((item, index) =>
          index !== entries.length - 1 ? (
            <Field
              isPersonal={false}
              selected={selected && !isLoading}
              data={item}
              key={nanoid()}
              id={company.id}
              isWorker={false}
            />
          ) : (
            <td
              className={
                selected ? "text-center company-selected" : "text-center"
              }
              key={nanoid()}
            >
              {item[1].length}
            </td>
          )
        )}
    </tr>
  );
};

export default CompanyItem;
