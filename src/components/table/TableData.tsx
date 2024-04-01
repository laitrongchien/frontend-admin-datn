import DataTable from "react-data-table-component";

const TableData = ({ columns, data }: { columns: any; data: any }) => {
  const customStyles = {
    rows: {
      style: {
        fontSize: "14px",
        minHeight: "64px",
        padding: "8px 0",
      },
    },
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "600",
        backgroundColor: "#fafbfb",
      },
    },
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      responsive
      paginationRowsPerPageOptions={[5, 10, 15]}
      customStyles={customStyles}
    />
  );
};

export default TableData;
