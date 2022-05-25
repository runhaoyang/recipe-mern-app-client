import Axios from "axios";
import { useState, useEffect, useMemo } from "react";
import Table from "./Table";
import Loading from "./Loading";
import SubmittedRecipesPortal from "./SubmittedRecipesPortal";
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

const StyledApproveButton = styled(Button)`
  background-color: #2a9d8f;
  color: white;
  font-weight: bold;
`;

const StyledDenyButton = styled(Button)`
  background-color: #e76f51;
  color: white;
  font-weight: bold;
`;

const SubmittedRecipes = () => {
  const [submittedRecipes, setSubmittedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dismissNotification();
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
                <StyledViewButton onClick={() => openPortal(row)}>
                  View Recipes
                </StyledViewButton>
              </>
            ),
          },
          {
            Header: "Approve",
            Cell: ({ row }) => (
              <StyledApproveButton onClick={() => approveRecipe(row)}>
                Approve
              </StyledApproveButton>
            ),
          },
          {
            Header: "Deny",
            Cell: ({ row }) => (
              <StyledDenyButton onClick={() => denyRecipe(row, true)}>
                Deny
              </StyledDenyButton>
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

  // Notifications
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

  const errorDeletingNotification = () => {
    toast.error("Error in deleting recipe.", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 20000,
    });
  };

  const errorApprovingNotification = () => {
    toast.error("Error in approving recipe.", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 20000,
    });
  };

  const dismissNotification = () => {
    toast.dismiss();
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
      errorApprovingNotification();
    }
  };

  const denyRecipe = async (row, display) => {
    try {
      Axios.delete(
        `https://recipe-mern-app-server.herokuapp.com/submittedRecipes/delete/${row.original.idMeal}`
      )
        .then(async () => {
          if (display) {
            deleteNotification();
          }
          await Axios.get(
            "https://recipe-mern-app-server.herokuapp.com/submittedRecipes"
          ).then((res) => {
            console.log(res.data);
            setSubmittedRecipes(res.data);
          });
        })
        .catch((error) => {
          console.log(error);
          errorDeletingNotification();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading source="recipes" />
      ) : (
        <>
          <Table columns={columns} data={submittedRecipes} />

          <div>
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
