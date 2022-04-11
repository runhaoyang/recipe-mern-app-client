import ReactDOM from "react-dom";
import UsersListTable from "./UsersListTable";

const RecipePortal = ({ isOpen, onClose, selectedRow, modalColumns }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="portal">
      <button onClick={onClose}>Close</button>
      <div className="recipeListTableContainer">
        <UsersListTable
          columns={modalColumns}
          data={selectedRow.original.recipes}
          className="portalTable"
        />
      </div>
    </div>,
    document.body
  );
};

export default RecipePortal;
