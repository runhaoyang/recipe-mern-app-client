import ReactDOM from "react-dom";
import Table from "./Table";

const RecipePortal = ({ isOpen, onClose, selectedRow, modalColumns }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="portal">
      <button onClick={onClose}>Close</button>
      <Table
        columns={modalColumns}
        data={selectedRow.original.recipes}
        divContainerClassName="tableDivContainer"
        tableClassName="tableContainer"
      />
    </div>,
    document.body
  );
};

export default RecipePortal;
