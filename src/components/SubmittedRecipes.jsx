import Axios from "axios";
import { useState, useEffect, useMemo } from "react";
import Table from "./Table";
import SubmittedRecipesPortal from "./SubmittedRecipesPortal";
import Foco from "react-foco";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubmittedRecipes = () => {
  const [submittedRecipes, setSubmittedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await Axios.get(
          "https://recipe-mern-app-server.herokuapp.com/submittedRecipes"
        ).then((res) => {
          console.log(res.data);
          setSubmittedRecipes(res.data);
          setIsLoading(false);
        });
      } catch (err) {
        console.log(`The error is ${err}`);
      }
    };
    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Submitted Recipes",
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
              <>
                <button
                  className="tableActionButton"
                  onClick={() => openPortal(row)}
                >
                  View Recipe
                </button>
              </>
            ),
          },
          {
            Header: "Approve",
            Cell: ({ row }) => (
              <button
                onClick={() => approveRecipe(row)}
                className="tableActionButton approve"
              >
                {" "}
                Approve{" "}
              </button>
            ),
          },
          {
            Header: "Deny",
            Cell: ({ row }) => (
              <button
                onClick={() => denyRecipe(row, true)}
                className="tableActionButton deny"
              >
                Deny{" "}
              </button>
            ),
          },
        ],
      },
    ],
    []
  );

  const openPortal = (row) => {
    setOpen(true);
    setSelectedRow(row);
  };

  const successNotification = () => {
    toast.success("Successfully added to recipes.", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
  };

  const deleteNotification = () => {
    toast.info("Successfully deleted.", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const approveRecipe = async (row) => {
    try {
      console.log(row.original);
      await Axios.get(
        "https://recipe-mern-app-server.herokuapp.com/recipes/getLastId"
      ).then(async (res) => {
        const sendData = {
          idMeal: parseInt(res.data) + 1,
          strCategory: row.original.strCategory,
          strMeal: row.original.strMeal,
          strMealThumb: row.original.filePath,
          strInstructions: JSON.stringify(row.original.strInstructions),
          userSubmitted: true,
          postedBy: row.original.postedBy,
          date:
            new Date().toLocaleString([], { hour12: true }) +
            " " +
            new Date().toTimeString().slice(9, 17),
        };

        row.original.strIngredients.forEach((ingredient, index) => {
          sendData[`strIngredient${index + 1}`] = ingredient;
        });

        row.original.strQuantity.forEach((quantity, index) => {
          sendData[`strMeasure${index + 1}`] = quantity;
        });

        await Axios.post(
          "https://recipe-mern-app-server.herokuapp.com/recipes",
          sendData
        ).then((res) => {
          console.log(res);
          successNotification();
          denyRecipe(row, false);
        });
        console.log(sendData);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const denyRecipe = async (row, display) => {
    try {
      Axios.delete(
        `https://recipe-mern-app-server.herokuapp.com/submittedRecipes/delete/${row.original.idMeal}`
      ).then(async () => {
        try {
          if (display) {
            deleteNotification();
          }

          await Axios.get(
            "https://recipe-mern-app-server.herokuapp.com/submittedRecipes"
          ).then((res) => {
            console.log(res.data);
            setSubmittedRecipes(res.data);
          });
        } catch (err) {
          console.log(`The error is ${err}`);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isLoading ? (
        <div> Loading ... </div>
      ) : (
        <>
          <Table
            columns={columns}
            data={submittedRecipes}
            divContainerClassName="tableDivContainer"
            tableClassName="tableContainer"
          />

          <div className="portalContainer">
            <Foco onClickOutside={() => setOpen(false)}>
              <SubmittedRecipesPortal
                isOpen={open}
                onClose={() => setOpen(false)}
                selectedRow={selectedRow}
              />
            </Foco>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default SubmittedRecipes;
