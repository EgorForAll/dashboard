import { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, deleteAndPutWorkers } from "./store/api-actions";
import { findWorkers, selectAllCompanies } from "./store/actions";
import CompanyTable from "./components/tables/companies-table";
import WorkersTable from "./components/tables/workers-table";
import { countWorkers } from "./utils/utils";
import CompanyForm from "./components/forms/company-form/company-form";
import WorkersForm from "./components/forms/workers-form/workers-form";
import Loader from "./components/loader/loader";

function App() {
  const dispatch = useDispatch();
  const loadData = () => dispatch(fetchData());
  const onfindWorkers = (arr) => dispatch(findWorkers(arr));
  const onSelectAllCompanies = (companies) =>
    dispatch(selectAllCompanies(companies));
  const onDeleteAndPutData = (companies, callback) =>
    dispatch(deleteAndPutWorkers(companies, callback));

  const data = useSelector((state) => state.companies);
  const workers = useSelector((state) => state.workers);
  const selectedCompanies = useSelector((state) => state.selectedCompanies);
  // Поиск работников выбранных компаний и занесение их в redux для дальнеешего отображения таблицы работников
  useEffect(() => {
    const workers = countWorkers(selectedCompanies);
    onfindWorkers(workers);
  }, [selectedCompanies]);
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="container">
        <section className="forms-section">
          <div className="forms-wrapper">
            <CompanyForm />
            {selectedCompanies.length > 0 && <WorkersForm />}
          </div>
        </section>
        <section className="tables-section">
          <div className="columns-wrapper">
            {data.length > 0 ? (
              <CompanyTable data={data} selectedCompanies={selectedCompanies} />
            ) : (
              <Loader />
            )}
            {workers.length > 0 && (
              <WorkersTable
                workers={workers}
                selectedCompanies={selectedCompanies}
                totalCompanies={data}
                deleteData={onDeleteAndPutData}
                findWorkers={onfindWorkers}
                onSelectAllCompanies={onSelectAllCompanies}
              />
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
