import { useMemo, useState, useEffect } from "react";
import Axios from "axios";
import Table from "./Table";
import Loading from "./Loading";
import AllRecipesPortal from "./AllRecipesPortal";
import Foco from "react-foco";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllRecipes = () => {
  const [recipesList, setRecipesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  // const [modalState, setModalState] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: "Recipes List",
        columns: [
          {
            Header: "ID",
            accessor: "idMeal",
          },

          {
            Header: "Recipe",
            accessor: "strMeal",
          },

          {
            Header: "Category",
            accessor: "strCategory",
          },
          {
            Header: "Posted by",
            accessor: "postedBy",
          },
          {
            Header: "Date added",
            accessor: "date",
          },
          {
            Header: "View",
            Cell: ({ row }) => (
              <button
                className="tableActionButton"
                onClick={() => openPortal(row)}
              >
                View Recipe
              </button>
            ),
          },
          {
            Header: "Delete",
            Cell: ({ row }) => (
              <button
                className="tableActionButton deny"
                onClick={() => deleteRecipe(row)}
              >
                Delete
              </button>
            ),
          },
        ],
      },
    ],
    []
  );

  const deleteRecipe = async (row) => {
    console.log(row.original);
    try {
      await Axios.delete(
        `http://localhost:5000/recipes/delete/${row.original.idMeal}`
      ).then(async () => {
        await Axios.get("http://localhost:5000/recipes").then((res) => {
          console.log(res.data);
          setRecipesList(res.data);
          deleteNotification();
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNotification = () => {
    toast.info("Successfully deleted.", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const openPortal = (row) => {
    setOpen(true);
    // setModalState(true);
    setSelectedRow(row);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await Axios.get("http://localhost:5000/recipes").then((res) => {
          console.log(res.data);
          setRecipesList(res.data);
          setIsLoading(false);
        });
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading source={"recipes"} />
      ) : (
        <>
          <Table
            columns={columns}
            data={recipesList}
            divContainerClassName="tableDivContainer"
            tableClassName="tableContainer"
          />{" "}
          <Foco onClickOutside={() => setOpen(false)}>
            <AllRecipesPortal
              isOpen={open}
              onClose={() => setOpen(false)}
              selectedRow={selectedRow}
            />
          </Foco>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default AllRecipes;
