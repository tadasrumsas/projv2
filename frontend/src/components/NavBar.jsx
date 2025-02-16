export default function NavBar({ onOpen, onSearch, onSortChange }) {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="navbar bg-base-100 p-4 flex flex-col items-center">
      <a className="text-5xl font-bold mb-4">Pets Clinic</a>
      <div className="w-full max-w-md mb-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearchChange}
          className="input input-bordered w-full"
        />
        <select className="select select-bordered" onChange={handleSortChange}>
          <option value="">Sort by</option>
          <option value="name_asc">Pet Name (A-Z)</option>
          <option value="name_desc">Pet Name (Z-A)</option>
          <option value="date_asc">Date (Oldest First)</option>
          <option value="date_desc">Date (Newest First)</option>
          <option value="owner_asc">Owner (A-Z)</option>
          <option value="owner_desc">Owner (Z-A)</option>
        </select>
      </div>
      <button
        className="btn btn-success btn-md w-full lg:w-112 "
        onClick={onOpen}
      >
        + Add Appointment
      </button>
      <button
        className="mt-4 btn btn-error btn-md w-full lg:w-112 "
        onClick={onOpen}
      >
        Log Out
      </button>
    </div>
  );
}
