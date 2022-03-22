import { useMemo, useState } from "react";
import { useTable, useSortBy } from "react-table";
import { useSelector } from "react-redux";
import { CheckIcon, XIcon, ChevronDownIcon, ChevronUpIcon, PlusIcon } from "@heroicons/react/solid";
import dateFormat from "dateformat";
import TaskOptions from "./TaskOptions";
import AddTaskModal from "./AddTaskModal";

function TaskTable() {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const data = useSelector((state) => state.currentProject.tasks);

  const columns = useMemo(
    () => [
      {
        accessor: "optionsCol",
        disableSortBy: true,
        Cell: (tableProps) => <TaskOptions tableProps={tableProps} />,
      },
      {
        Header: <div className="text-left">Description</div>,
        accessor: "description",
        sortType: "alphanumeric",
        Cell: ({ value }) => <div className={`whitespace-pre-wrap ${value ? "min-w-[200px]" : null}`}>{value}</div>,
      },
      {
        Header: <div className="text-center">Completed</div>,
        accessor: "completed",
        sortType: "basic",
        Cell: ({ value }) => (
          <div className="flex items-center">
            {value ? (
              <div className="rounded-full p-2 bg-green-300">
                <CheckIcon className="h-5" />
              </div>
            ) : (
              <div className="rounded-full p-2 bg-red-300">
                <XIcon className="h-5" />
              </div>
            )}
          </div>
        ),
      },
      {
        Header: <div className="text-left">Date Added</div>,
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
      <div className="flex flex-col gap-3 pt-5">
        <div className="flex justify-between items-end">
          <h1 className="text-3xl">Tasks</h1>
          <div className="customButton" onClick={() => setShowAddTaskModal(true)}>
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
      <AddTaskModal showModal={showAddTaskModal} setShowModal={setShowAddTaskModal} />
    </>
  );
}

export default TaskTable;
