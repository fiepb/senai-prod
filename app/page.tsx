import Header from "./components/CustomHeader";
import TreeTable from "./components/CustomTreeTable";

function Home() {
  return (
    <div>
      <div className="mb-10">
        <Header />
      </div>
      <div className="px-8 mb-10 text-[32px] w-full">
        Acompanhamento de Cursos e Métricas do SENAI 2024
        <p className="text-sm">Modelo exemplo</p>
      </div>
      <div className="px-8">
        <TreeTable />
      </div>
    </div>
  );
}

export default Home;
