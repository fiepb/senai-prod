import Header from "./components/CustomHeader";
import TreeTable from "./components/CustomTreeTable";

import { columnsData, rowData } from "./data/tableData";

function Home() {
  return (
    <div>
      <div className="mb-20">
        <Header />
      </div>
      <div className="px-8 mb-10 text-[32px] w-full">
        Acompanhamento de Cursos e Métricas do SENAI 2024
      </div>
      <div className="px-8">
        {/* <TreeTable columns={columnsData} data={rowData} /> */}
        <TreeTable />
      </div>
    </div>
  );
}

export default Home;
