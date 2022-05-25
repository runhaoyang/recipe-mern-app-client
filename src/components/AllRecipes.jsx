import { useMemo, useState, useEffect } from "react";
import Axios from "axios";
import Table from "./Table";
import Loading from "./Loading";
import AllRecipesPortal from "./AllRecipesPortal";
import Foco from "react-foco";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  -webkit-box-shadow: 0px 0px 3px 0px #000000;
  box-shadow: 0px 0px 3px -5px #000000;
  border-radius: 5px;
  min-height: 3em;
`;

const StyledViewButton = styled(Button)`
  background-color: #264653;
  color: white;
  font-weight: bold;
`;

const StyledDenyButton = styled(Button)`
  background-color: #e76f51;
  color: white;
  font-weight: bold;
`;

const AllRecipes = () => {
  const [recipesList, setRecipesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
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
              <StyledViewButton onClick={() => openPortal(row)}>
                View Recipe
              </StyledViewButton>
            ),
          },
          {
            Header: "Delete",
            Cell: ({ row }) => (
              <StyledDenyButton onClick={() => deleteRecipe(row)}>
                Delete
              </StyledDenyButton>
            ),
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    const fetchRecipes = async () => {
      dismissNotification();
      setIsLoading(true);
      try {
        await Axios.get(
          "https://recipe-mern-app-server.herokuapp.com/recipes"
        ).then((res) => {
          setRecipesList(res.data);
          setIsLoading(false);
        });
      } catch (error) {
        console.error(`The error is ${error}`);
        setIsLoading(false);
        errorNotification();
      }
    };
    fetchRecipes();
  }, []);

  const deleteRecipe = async (row) => {
    console.log(row.original);
    try {
      await Axios.delete(
        `https://recipe-mern-app-server.herokuapp.com/recipes/delete/${row.original.idMeal}`
      ).then(async () => {
        await Axios.get(
          "https://recipe-mern-app-server.herokuapp.com/recipes"
        ).then((res) => {
          console.log(res.data);
          setRecipesList(res.data);
          deleteSuccessNotification();
        });
      });
    } catch (error) {
      console.log(error);
      deleteErrorNotification();
    }
  };

  const deleteSuccessNotification = () => {
    toast.success("Successfully deleted.", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const deleteErrorNotification = () => {
    toast.error("Error deleting recipe.", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 15000,
    });
  };

  const openPortal = (row) => {
    setOpen(true);
    setSelectedRow(row);
  };

  const errorNotification = () => {
    toast.error("Error fetching recipes from backend", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 15000,
    });
  };

  const dismissNotification = () => {
    toast.dismiss();
  };

  return (
    <>
      {isLoading ? (
        <Loading source={"recipes"} />
      ) : (
        <>
          <Table columns={columns} data={recipesList} />
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
