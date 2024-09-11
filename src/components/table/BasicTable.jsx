// import React, { useMemo } from "react";
// import MOCK_DATA from "../../assets/data/MOCK_DATA.json";
// import { useTable } from "react-table";
// import COLUMNS from "../../constants/columns";

export const BasicTable = () => {
  //   const columns = useMemo(() => COLUMNS, []);
  //   const data = useMemo(() => MOCK_DATA, []);
  //   const tableInstance = useTable({
  //     columns,
  //     data,
  //   });
  //   const { getTableProps, getTableBodyProps, headerGroup, rows, prepareRow } =
  //     tableInstance;
  //   return (
  //     <div>
  //       <table {...getTableProps()} className="table-auto">
  //         <thead>
  //           {headerGroup.map((headerGroup) => (
  //             <tr {...headerGroup.getHeaderGroupProps()}>
  //               {headerGroup.headers.map((column) => (
  //                 <th {...column.getHeaderProps()}>{column.render("Header")}</th>
  //               ))}
  //             </tr>
  //           ))}
  //         </thead>
  //         <tbody {...getTableBodyProps()}>
  //           {rows.map((row) => {
  //             prepareRow(row);
  //             return (
  //               <tr {...row.getRowProps()}>
  //                 {row.cells.map((cell) => {
  //                   return <td {...cell.getCellProps}>{cell.render("cell")}</td>;
  //                 })}
  //               </tr>
  //             );
  //           })}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
};
