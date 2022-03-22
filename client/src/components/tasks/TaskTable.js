import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import { useSelector, useDispatch } from "react-redux";
import { ChevronDownIcon, ChevronUpIcon, PlusIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import dateFormat from "dateformat";
import { setActiveForm } from "../../features/modal/modalSlice";
import TaskOptions from "./TaskOptions";

function TaskTable() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.currentProject.tasks);

  const columns = useMemo(
    () => [
      {
        accessor: "optionsCol",
        disableSortBy: true,
        Cell: (tableProps) => <TaskOptions data={tableProps.row.original} />,
      },
      {
        Header: "Description",
        accessor: "description",
        sortType: "alphanumeric",
        Cell: ({ value }) => <div className={`whitespace-pre-wrap ${value ? "min-w-[200px]" : null}`}>{value}</div>,
      },
      {
        Header: "Completed",
        accessor: "completed",
        sortType: "basic",
        Cell: ({ value }) =>
          value ? <CheckCircleIcon className="h-10 text-green-400" /> : <XCircleIcon className="h-10 text-red-400" />,
      },
      {
        Header: "Date Added",
        id: "createdAt",
        accessor: (row) => new Date(row.createdAt),
        sortType: "datetime",
        Cell: ({ value }) => <p className="min-w-[150px]">{dateFormat(value, "mmmm dS, yyyy, h:MM TT")}</p>,
      },
    ],
    []
  );

  const initialSort = useMemo(() => [{ id: "createdAt", desc: true }], []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data, initialState: { sortBy: initialSort } },
    useSortBy
  );

  return (
    <>
      <div className="flex flex-col gap-3 pt-3">
        <div className="flex justify-between items-end">
          <h1 className="text-3xl">Tasks</h1>
          <div className="customButton" onClick={() => dispatch(setActiveForm("addTask"))}>
            <PlusIcon className="h-5" />
            New Task
          </div>
        </div>
        {data.length === 0 ? (
          <p className="text-slate-900 text-xl pb-5">No tasks found!</p>
        ) : (
          <div className="w-full overflow-auto border border-slate-900">
            <table {...getTableProps()} className="w-full">
              <thead className="bg-slate-900 text-white">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())} className="p-4">
                        <div className="flex gap-2">
                          {column.render("Header")}
                          <span className="flex items-end">
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <ChevronDownIcon className="h-5" />
                              ) : (
                                <ChevronUpIcon className="h-5" />
                              )
                            ) : (
                              ""
                            )}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="even:bg-gray-200">
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()} className="p-4">
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default TaskTable;
