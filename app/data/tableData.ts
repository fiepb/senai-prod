export interface Column {
  key: string;
  label: string;
}

export interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  [key: string]: any;
}

// Mock data for columns
export const columnsMock: Column[] = [
  {
    key: "col1",
    label: "Título - Número de alunos matriculados",
  },
  { key: "col2", label: "Tipo cliente" },
  { key: "col3", label: "Empresas | Op atendidas" },
  { key: "col4", label: "Núcleo" },
  { key: "col5", label: "Nº alunos matriculados no SGE" },
  { key: "col6", label: "Nº alunos evadidos | desistentes | reprovados" },
  { key: "col7", label: "% Terminalidade" },
  { key: "col8", label: "SGE" },
  { key: "col9", label: "Status" },
  { key: "col10", label: "Cidade" },
  { key: "col11", label: "Unidade" },
  { key: "col12", label: "Modalidade" },
  { key: "col13", label: "Turno" },
  { key: "col14", label: "CH" },
  { key: "col15", label: "Hora aluno" },
  { key: "col16", label: "Período letivo" },
  { key: "col17", label: "Módulo" },
  { key: "col18", label: "Início" },
  { key: "col19", label: "Término" },
  { key: "col20", label: "Instrutor" },
];

// Mock data for tree structure
export const dataMock: TreeNode[] = [
  {
    id: "1",
    name: "Técnico em energias renováveis",
    col1: "OP",
    col2: "MTP",
    col3: "Energia renovável",
    col4: "16",
    col5: "8",
    col6: "50,00%",
    col7: "TEC.016.004",
    col8: "Concluído",
    col9: "Patos",
    col10: "CITI",
    col11: "Habilitação técnica - gratuidade",
    col12: "3 - noite",
    col13: "326",
    col14: "6.500",
    col15: "",
    col16: "",
    col17: "05-11-19",
    col18: "13-07-23",
    col19: "",
    col20: "",
    children: [
      {
        id: "1.1",
        name: "Module 1.1",
        col1: "M1.1 Value 1",
        col2: "M1.1 Value 2",
        // ... (add values for all 20 columns)
        col20: "M1.1 Value 20",
        children: [
          {
            id: "1.1.1",
            name: "Class 1.1.1",
            col1: "CL1.1.1 Value 1",
            col2: "CL1.1.1 Value 2",
            // ... (add values for all 20 columns)
            col20: "CL1.1.1 Value 20",
          },
          {
            id: "1.1.2",
            name: "Class 1.1.2",
            col1: "CL1.1.2 Value 1",
            col2: "CL1.1.2 Value 2",
            // ... (add values for all 20 columns)
            col20: "CL1.1.2 Value 20",
          },
        ],
      },
      {
        id: "1.2",
        name: "Module 1.2",
        col1: "M1.2 Value 1",
        col2: "M1.2 Value 2",
        // ... (add values for all 20 columns)
        col20: "M1.2 Value 20",
        children: [
          {
            id: "1.2.1",
            name: "Class 1.2.1",
            col1: "CL1.2.1 Value 1",
            col2: "CL1.2.1 Value 2",
            // ... (add values for all 20 columns)
            col20: "CL1.2.1 Value 20",
          },
          {
            id: "1.2.2",
            name: "Class 1.2.2",
            col1: "CL1.2.2 Value 1",
            col2: "CL1.2.2 Value 2",
            // ... (add values for all 20 columns)
            col20: "CL1.2.2 Value 20",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Course 2",
    col1: "C2 Value 1",
    col2: "C2 Value 2",
    // ... (add values for all 20 columns)
    col20: "C2 Value 20",
    children: [
      {
        id: "2.1",
        name: "Module 2.1",
        col1: "M2.1 Value 1",
        col2: "M2.1 Value 2",
        // ... (add values for all 20 columns)
        col20: "M2.1 Value 20",
        children: [
          {
            id: "2.1.1",
            name: "Class 2.1.1",
            col1: "CL2.1.1 Value 1",
            col2: "CL2.1.1 Value 2",
            // ... (add values for all 20 columns)
            col20: "CL2.1.1 Value 20",
          },
          {
            id: "2.1.2",
            name: "Class 2.1.2",
            col1: "CL2.1.2 Value 1",
            col2: "CL2.1.2 Value 2",
            // ... (add values for all 20 columns)
            col20: "CL2.1.2 Value 20",
          },
        ],
      },
      {
        id: "2.2",
        name: "Module 2.2",
        col1: "M2.2 Value 1",
        col2: "M2.2 Value 2",
        // ... (add values for all 20 columns)
        col20: "M2.2 Value 20",
        children: [
          {
            id: "2.2.1",
            name: "Class 2.2.1",
            col1: "CL2.2.1 Value 1",
            col2: "CL2.2.1 Value 2",
            // ... (add values for all 20 columns)
            col20: "CL2.2.1 Value 20",
          },
          {
            id: "2.2.2",
            name: "Class 2.2.2",
            col1: "CL2.2.2 Value 1",
            col2: "CL2.2.2 Value 2",
            // ... (add values for all 20 columns)
            col20: "CL2.2.2 Value 20",
          },
        ],
      },
    ],
  },
];
