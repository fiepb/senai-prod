"use client";

import React, { useState, useCallback } from "react";
import { ChevronRight, ChevronDown, Edit, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  [key: string]: any;
}

const initialData: TreeNode[] = [
  {
    id: "1",
    name: "Curso 1",
    col1: "Value 1",
    col2: "Value 2",
    col3: "Value 3",
    col4: "Value 4",
    col5: "Value 5",
    children: [
      {
        id: "1.1",
        name: "Módulo A",
        col1: "Value 1.1",
        col2: "Value 1.2",
        col3: "Value 1.3",
        col4: "Value 1.4",
        col5: "Value 1.5",
        children: [
          {
            id: "1.1.1",
            name: "Disciplina X",
            col1: "Value 1.1.1",
            col2: "Value 1.1.2",
            col3: "Value 1.1.3",
            col4: "Value 1.1.4",
            col5: "Value 1.1.5",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Curso 2",
    col1: "Value 1",
    col2: "Value 2",
    col3: "Value 3",
    col4: "Value 4",
    col5: "Value 5",
    children: [
      {
        id: "2.1",
        name: "Módulo B",
        col1: "Value 1.1",
        col2: "Value 1.2",
        col3: "Value 1.3",
        col4: "Value 1.4",
        col5: "Value 1.5",
        children: [
          {
            id: "2.1.1",
            name: "Disciplina Y",
            col1: "Value 1.1.1",
            col2: "Value 1.1.2",
            col3: "Value 1.1.3",
            col4: "Value 1.1.4",
            col5: "Value 1.1.5",
          },
        ],
      },
    ],
  },
];

export default function TreeTable() {
  const [data, setData] = useState<TreeNode[]>(initialData);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [tempEditData, setTempEditData] = useState<TreeNode | null>(null);

  const toggleRow = useCallback((id: string) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleEdit = useCallback((node: TreeNode) => {
    setEditingRow(node.id);
    setTempEditData(node);
  }, []);

  const handleSave = useCallback(
    (id: string) => {
      if (tempEditData) {
        setData((prevData) => updateNode(prevData, id, tempEditData));
      }
      setEditingRow(null);
      setTempEditData(null);
    },
    [tempEditData]
  );

  const handleCancel = useCallback(() => {
    setEditingRow(null);
    setTempEditData(null);
  }, []);

  const updateNode = (
    nodes: TreeNode[],
    id: string,
    newData: TreeNode
  ): TreeNode[] => {
    return nodes.map((node) => {
      if (node.id === id) {
        return { ...node, ...newData };
      }
      if (node.children) {
        return { ...node, children: updateNode(node.children, id, newData) };
      }
      return node;
    });
  };

  const renderNode = (node: TreeNode, depth: number = 0) => {
    const isExpanded = expandedRows.has(node.id);
    const isEditing = editingRow === node.id;

    return (
      <React.Fragment key={node.id}>
        <div className="contents">
          <div
            className="sticky left-0 z-20 flex items-center bg-white border-b border-r border-gray-200"
            style={{ paddingLeft: `${depth * 20}px`, width: "200px" }}
          >
            {node.children && (
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 p-0"
                onClick={() => toggleRow(node.id)}
              >
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </Button>
            )}
            <span className="ml-2 truncate">{node.name}</span>
          </div>
          {Array.from({ length: 25 }, (_, i) => i + 1).map((colNum) => (
            <div
              key={colNum}
              className="flex items-center justify-center p-2 border-b border-gray-200"
              style={{ width: "160px" }}
            >
              {isEditing ? (
                <Input
                  value={tempEditData?.[`col${colNum}`] || ""}
                  onChange={(e) => {
                    setTempEditData((prev) =>
                      prev
                        ? { ...prev, [`col${colNum}`]: e.target.value }
                        : null
                    );
                  }}
                  className="w-full"
                />
              ) : (
                <span className="truncate" title={node[`col${colNum}`] || ""}>
                  {node[`col${colNum}`] || ""}
                </span>
              )}
            </div>
          ))}
          <div
            className="sticky right-0 z-20 flex items-center justify-center p-2 bg-white border-b border-l border-gray-200"
            style={{ width: "160px" }}
          >
            {isEditing ? (
              <div className="flex space-x-2">
                <Button size="sm" onClick={() => handleSave(node.id)}>
                  <Save className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(node)}
              >
                <Edit className="w-4 h-4" />
                Editar
              </Button>
            )}
          </div>
        </div>
        {isExpanded &&
          node.children &&
          node.children.map((child) => renderNode(child, depth + 1))}
      </React.Fragment>
    );
  };

  return (
    <div className="w-full overflow-hidden border border-gray-200 rounded-lg">
      <div className="relative" style={{ width: "100%", overflowX: "auto" }}>
        <div style={{ width: "calc(200px + 25 * 160px + 160px)" }}>
          <div className="grid grid-cols-[200px_repeat(25,160px)_160px] gap-0">
            <div className="sticky left-0 z-30 flex items-center justify-start p-2 font-bold bg-gray-100 border-b border-r border-gray-200">
              Name
            </div>
            {Array.from({ length: 25 }, (_, i) => (
              <div
                key={i}
                className="flex items-center justify-center p-2 font-bold bg-gray-100 border-b border-gray-200"
              >
                Column {i + 1}
              </div>
            ))}
            <div
              className="sticky right-0 z-30 flex items-center justify-center p-2 font-bold bg-gray-100 border-b border-l border-gray-200"
              style={{ width: "160px" }}
            >
              Actions
            </div>
            {data.map((node) => renderNode(node))}
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import React, { useState, useCallback } from "react";
// import { ChevronRight, ChevronDown, Edit, Save } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// interface TreeNode {
//   id: string;
//   name: string;
//   children?: TreeNode[];
//   [key: string]: any;
// }

// interface TreeTableProps {
//   columns: string[];
//   data: TreeNode[];
// }

// export default function TreeTable({ columns, data }: TreeTableProps) {
//   const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
//   const [editingRow, setEditingRow] = useState<string | null>(null);
//   const [tempEditData, setTempEditData] = useState<TreeNode | null>(null);

//   const toggleRow = useCallback((id: string) => {
//     setExpandedRows((prev) => {
//       const next = new Set(prev);
//       if (next.has(id)) {
//         next.delete(id);
//       } else {
//         next.add(id);
//       }
//       return next;
//     });
//   }, []);

//   const handleEdit = useCallback((node: TreeNode) => {
//     setEditingRow(node.id);
//     setTempEditData(node);
//   }, []);

//   const handleSave = useCallback(
//     (id: string) => {
//       if (tempEditData) {
//         setData((prevData) => updateNode(prevData, id, tempEditData));
//       }
//       setEditingRow(null);
//       setTempEditData(null);
//     },
//     [tempEditData]
//   );

//   const handleCancel = useCallback(() => {
//     setEditingRow(null);
//     setTempEditData(null);
//   }, []);

//   const updateNode = (
//     nodes: TreeNode[],
//     id: string,
//     newData: TreeNode
//   ): TreeNode[] => {
//     return nodes.map((node) => {
//       if (node.id === id) {
//         return { ...node, ...newData };
//       }
//       if (node.children) {
//         return { ...node, children: updateNode(node.children, id, newData) };
//       }
//       return node;
//     });
//   };

//   const renderNode = (node: TreeNode, depth: number = 0) => {
//     const isExpanded = expandedRows.has(node.id);
//     const isEditing = editingRow === node.id;

//     return (
//       <React.Fragment key={node.id}>
//         <div className="contents">
//           <div
//             className="sticky left-0 z-20 flex items-center bg-white border-b border-r border-gray-200"
//             style={{ paddingLeft: `${depth * 20}px`, width: "200px" }}
//           >
//             {node.children && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="w-6 h-6 p-0"
//                 onClick={() => toggleRow(node.id)}
//               >
//                 {isExpanded ? (
//                   <ChevronDown className="w-4 h-4" />
//                 ) : (
//                   <ChevronRight className="w-4 h-4" />
//                 )}
//               </Button>
//             )}
//             <span className="ml-2 truncate">{node.name}</span>
//           </div>
//           {columns.slice(1).map((colName) => (
//             <div
//               key={colName}
//               className="flex items-center justify-center p-2 border-b border-gray-200"
//               style={{ width: "160px" }}
//             >
//               {isEditing ? (
//                 <Input
//                   value={tempEditData?.[colName] || ""}
//                   onChange={(e) => {
//                     setTempEditData((prev) =>
//                       prev ? { ...prev, [colName]: e.target.value } : null
//                     );
//                   }}
//                   className="w-full"
//                 />
//               ) : (
//                 <span className="truncate" title={node[colName] || ""}>
//                   {node[colName] || ""}
//                 </span>
//               )}
//             </div>
//           ))}
//           <div
//             className="sticky right-0 z-20 flex items-center justify-center p-2 bg-white border-b border-l border-gray-200"
//             style={{ width: "160px" }}
//           >
//             {isEditing ? (
//               <div className="flex space-x-2">
//                 <Button size="sm" onClick={() => handleSave(node.id)}>
//                   <Save className="w-4 h-4" />
//                 </Button>
//                 <Button size="sm" variant="outline" onClick={handleCancel}>
//                   Cancelar
//                 </Button>
//               </div>
//             ) : (
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => handleEdit(node)}
//               >
//                 <Edit className="w-4 h-4" />
//                 Editar
//               </Button>
//             )}
//           </div>
//         </div>
//         {isExpanded &&
//           node.children &&
//           node.children.map((child) => renderNode(child, depth + 1))}
//       </React.Fragment>
//     );
//   };

//   return (
//     <div className="w-full overflow-hidden border border-gray-200 rounded-lg">
//       <div className="relative" style={{ width: "100%", overflowX: "auto" }}>
//         <div
//           style={{
//             width: `calc(200px + ${columns.length - 1} * 160px + 160px)`,
//           }}
//         >
//           <div className="grid grid-cols-[200px_repeat(25,160px)_160px] gap-0">
//             <div className="sticky left-0 z-30 flex items-center justify-start p-2 font-bold bg-gray-100 border-b border-r border-gray-200">
//               {columns[0]}
//             </div>
//             {columns.slice(1).map((colName) => (
//               <div
//                 key={colName}
//                 className="flex items-center justify-center p-2 font-bold bg-gray-100 border-b border-gray-200"
//               >
//                 {colName}
//               </div>
//             ))}
//             <div
//               className="sticky right-0 z-30 flex items-center justify-center p-2 font-bold bg-gray-100 border-b border-l border-gray-200"
//               style={{ width: "160px" }}
//             >
//               Actions
//             </div>
//             {data.map((node) => renderNode(node))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
