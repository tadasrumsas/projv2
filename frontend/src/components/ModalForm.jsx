import { useState, useEffect } from "react";

export default function ModalForm({
  isOpen,
  onClose,
  mode,
  OnSubmit,
  clientData,
}) {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !owner || !description || !dateTime) {
      setError("All fields are required");
      return;
    }
    setError("");
    try {
      const clientData = { name, owner, description, date: dateTime };
      await OnSubmit(clientData);
      onClose();
    } catch (err) {
      console.error("Error adding client:", err);
      setError("An error occurred while adding the client");
    }
  };

  const convertToLocalTime = (dateStr) => {
    const date = new Date(dateStr);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (mode === "edit" && clientData) {
      setName(clientData.name);
      setOwner(clientData.owner);
      setDescription(clientData.description);
      const formattedDateTime = clientData.date
        ? convertToLocalTime(clientData.date)
        : "";
      setDateTime(formattedDateTime);
    } else {
      setName("");
      setOwner("");
      setDescription("");
      setDateTime("");
    }
  }, [mode, clientData]);

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setOwner("");
      setDescription("");
      setDateTime("");
    }
  }, [isOpen]);

  return (
    <>
      <dialog
        id="my_modal_5"
        className={`modal ${isOpen ? "block" : "hidden"} fixed inset-0 flex justify-center items-center`}
        open={isOpen}
      >
        <div className="modal-box p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg py-4">
            {mode === "edit" ? "Edit Appointment" : "Appointment Details"}
          </h3>
          {error && <div className="alert alert-error mb-4">{error}</div>}
          <form method="dialog" onSubmit={handleSubmit}>
            <label className="block mb-2">
              Name
              <input
                type="text"
                className="input input-bordered w-full mt-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label className="block mb-2">
              Owner
              <input
                type="text"
                className="input input-bordered w-full mt-1"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                required
              />
            </label>

            <label className="block mb-2">
              Description
              <input
                type="text"
                className="input input-bordered w-full mt-1"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>

            <label className="block mb-4">
              Date
              <input
                type="datetime-local"
                className="input input-bordered w-full mt-1"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                required
              />
            </label>

            <div className="flex justify-end space-x-2">
              <button type="button" className="btn" onClick={onClose}>
                X
              </button>
              <button type="submit" className="btn btn-success">
                {mode === "edit" ? "Save changes" : "Add client"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
