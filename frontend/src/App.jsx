
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import TableList from "./components/TableList";
import ModalForm from "./components/ModalForm";
import axios from "axios";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [clientData, setClientData] = useState(null);
  const [tableData, setTableData] = useState([]);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/clients");
      setTableData(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleOpen = (mode, client) => {
    setClientData(client);
    setIsOpen(true);
    setModalMode(mode);
  };

  const handleSubmit = async (newClientData) => {
    if (modalMode === "add") {
      try {
        const response = await axios.post(
          "http://localhost:3002/api/clients",
          newClientData
        );
        setTableData((prevData) => [...prevData, response.data]);
      } catch (error) {
        console.error("Error adding client:", error);
      }
    } else {
      try {
        const response = await axios.put(
          `http://localhost:3002/api/clients/${clientData.id}`,
          newClientData
        );
        setTableData((prevData) =>
          prevData.map((client) =>
            client.id === response.data.id ? response.data : client
          )
        );
      } catch (error) {
        console.error("Error updating client:", error);
      }
    }
    setIsOpen(false);
  };

  const handleSortChange = (value) => {
    const [field, order] = value.split("_");
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <>
      <NavBar
        onOpen={() => handleOpen("add")}
        onSearch={setSearchTerm}
        onSortChange={handleSortChange}
      />
      <TableList
        setTableData={setTableData}
        tableData={tableData}
        handleOpen={handleOpen}
        searchTerm={searchTerm}
        sortField={sortField}
        sortOrder={sortOrder}
      />
      <ModalForm
        isOpen={isOpen}
        OnSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
        mode={modalMode}
        clientData={clientData}
      />
    </>
  );
}

export default App;
