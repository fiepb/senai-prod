"use client";

import React, { useState, useCallback } from "react";
import { ChevronRight, ChevronDown, Edit, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { TreeNode, columnsMock, dataMock } from "../data/tableData";

export default function TreeTable() {
  const [data, setData] = useState<TreeNode[]>(dataMock);
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="ml-2 truncate">{node.name}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{node.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {columnsMock.map((column) => (
            <div
              key={column.key}
              className="flex items-center justify-center p-2 border-b border-gray-200"
              style={{ width: "160px" }}
            >
              {isEditing ? (
                <Input
                  value={tempEditData?.[column.key] || ""}
                  onChange={(e) => {
                    setTempEditData((prev) =>
                      prev ? { ...prev, [column.key]: e.target.value } : null
                    );
                  }}
                  className="w-full"
                />
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="truncate" title={node[column.key] || ""}>
                        {node[column.key] || ""}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{node[column.key] || ""}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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

  // Calculate the total width based on the number of columns
  const totalWidth = 200 + columnsMock.length * 160 + 160;

  // Generate the grid template columns based on the number of columns
  const gridTemplateColumns = `200px repeat(${columnsMock.length}, 160px) 160px`;

  return (
    <div className="w-full overflow-hidden border border-gray-200 rounded-lg">
      <div className="relative" style={{ width: "100%", overflowX: "auto" }}>
        <div style={{ width: `${totalWidth}px` }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: gridTemplateColumns,
              gap: 0,
            }}
          >
            <div className="sticky left-0 z-30 flex items-center justify-start p-2 font-bold bg-gray-100 border-b border-r border-gray-200">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="truncate">
                      Nome (Curso | Módulo | Disciplina)
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Nome (Curso | Módulo | Disciplina)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {columnsMock.map((column) => (
              <div
                key={column.key}
                className="flex items-center justify-center p-2 font-bold bg-gray-100 border-b border-gray-200"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="truncate">{column.label}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{column.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
            <div
              className="sticky right-0 z-30 flex items-center justify-center p-2 font-bold bg-gray-100 border-b border-l border-gray-200"
              style={{ width: "160px" }}
            >
              Ações
            </div>
            {data.map((node) => renderNode(node))}
          </div>
        </div>
      </div>
    </div>
  );
}
