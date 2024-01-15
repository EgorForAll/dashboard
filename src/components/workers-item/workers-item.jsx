import { useEffect, useState } from "react";
import Field from "../field/field";
import { nanoid } from "nanoid";

const WorkersItem = ({
  worker,
  isAll,
  putInSelectedWorkers,
  deleteFromSelectedWorkers,
  isLoading,
}) => {
  const [selected, setSelected] = useState(false);
  useEffect(() => (isAll ? setSelected(true) : setSelected(false)), [isAll]);
  useEffect(() => {
    if (isLoading) {
      setSelected(false);
    }
  }, [isLoading]);

  const onSelect = () => {
    if (selected) {
      setSelected(false);
      deleteFromSelectedWorkers(worker);
    } else {
      setSelected(true);
      putInSelectedWorkers(worker);
    }
  };

  // Получение данных для рендера компанентов таблицы
  const entries = Object.entries(worker).slice(2);

  return (
    <tr>
      <td className="text-center">
        <input
          className="checkbox-input"
          type="checkbox"
          id="select-all"
          name="select-all"
          checked={selected && !isLoading}
          onChange={() => onSelect()}
        />
      </td>
      {entries.length > 0 &&
        entries.map((item) => (
          <Field
            isPersonal={false}
            selected={selected}
            data={item}
            key={nanoid()}
            id={worker.company_id}
            isWorker={true}
            worker={worker}
          />
        ))}
    </tr>
  );
};

export default WorkersItem;
