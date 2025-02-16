import axios from "axios";
import { useState, useEffect } from "react";

export default function TableList({
  handleOpen,
  tableData,
  setTableData,
  searchTerm,
  sortField,
  sortOrder,
}) {
  const [error, setError] = useState(null);

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const sortedData = [...tableData].sort((a, b) => {
    if (sortField) {
      const aValue = a[sortField] || "";
      const bValue = b[sortField] || "";
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    return 0;
  });

  const filteredData = sortedData.filter((client) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      client.name.toLowerCase().includes(searchLower) ||
      client.owner.toLowerCase().includes(searchLower) ||
      client.description.toLowerCase().includes(searchLower) ||
      client.date.toLowerCase().includes(searchLower)
    );
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await axios.delete(`http://localhost:3002/api/clients/${id}`);
        setTableData((prevData) => prevData.filter((client) => client.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="container mx-auto p-4 max-w-5xl">
        {filteredData.map((client) => (
          <div
            key={client.id}
            className="flex flex-col md:flex-row items-start md:items-center bg-transparent p-4 mb-4 border-b border-gray-300 mx-auto"
          >
            <div className="flex flex-row md:flex-col justify-center items-center md:items-start mr-4 mb-2 md:mb-0 space-x-2 md:space-x-0 md:space-y-2">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleOpen("edit", client)}
              >
                Update
              </button>
              <button
                className="btn btn-accent btn-sm"
                onClick={() => handleDelete(client.id)}
              >
                Delete
              </button>
            </div>
            <div className="flex-grow">
              <div className="font-bold text-lg">{client.name}</div>
              <div className="mt-2">
                <span className="font-semibold">Owner: </span>{client.owner}
              </div>
              <div className="mt-2">
                <span className="font-semibold"></span>{client.description}
              </div>
            </div>
            <div className="font-semibold text-right mt-2 md:mt-0 md:ml-auto">
              {formatDate(client.date)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
