import Axios from "axios";
import { useState, useEffect, useMemo } from "react";
import SubmittedRecipesTable from "./SubmittedRecipesTable";
import SubmittedRecipesPortal from "./SubmittedRecipesPortal";
import Foco from "react-foco";

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

  const columns = useMemo(() => [
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
              onClick={() => denyRecipe(row)}
              className="tableActionButton deny"
            >
              Deny{" "}
            </button>
          ),
        },
      ],
    },
  ]);

  const modalColumns = useMemo(
    () => [
      {
        Header: "Ingredients List",
        columns: [
          {
            Header: "Ingredient name",
            accessor: "ingredient",
          },
          {
            Header: "Quantity",
            accessor: "quantity",
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

  const approveRecipe = async (row) => {
    console.log("Recipe approved");
    console.log(row.original);

    try {
      await Axios.get(
        "https://recipe-mern-app-server.herokuapp.com/recipes/getLastId"
      ).then(async (res) => {
        // console.log(res.data);
        const formData = new FormData();
        const sendData = {
          idMeal: parseInt(res.data + 1),
          strCategory: row.original.strCategory,
          strMeal: row.original.strMeal,
          strMealThumb: row.original.filePath,
          strInstructions: JSON.stringify(row.original.strInstructions),
          userSubmitted: true,
        };
        formData.append("idMeal", parseInt(res.data) + 1);
        formData.append("strCategory", row.original.strCategory);
        formData.append("strMeal", row.original.strMeal);
        formData.append("strMealThumb", row.original.filePath);
        row.original.strIngredients.forEach((ingredient, index) => {
          // console.log(ingredient);
          formData.append(`strIngredient${index + 1}`, ingredient);
          sendData[`strIngredient${index + 1}`] = ingredient;
        });

        row.original.strQuantity.forEach((quantity, index) => {
          // console.log(quantity);
          formData.append(`strMeasure${index + 1}`, quantity);
          sendData[`strMeasure${index + 1}`] = quantity;
        });

        formData.append(
          "strInstructions",
          JSON.stringify(row.original.strInstructions)
        );

        formData.append("userSubmitted", true);

        console.log("After combining everything:");

        for (const pair of formData.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        await Axios.post(
          "https://recipe-mern-app-server.herokuapp.com/recipes",
          sendData
        ).then((res) => {
          console.log(res);
        });
        console.log(sendData);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const denyRecipe = async (row) => {
    console.log("Recipe denied");
    console.log(row.original);
    try {
      Axios.delete(
        `https://recipe-mern-app-server.herokuapp.com/submittedRecipes/delete/${row.original.idMeal}`
      ).then(async () => {
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
          <SubmittedRecipesTable
            columns={columns}
            data={submittedRecipes}
            className="submittedRecipesTable"
          />

          <div className="portalContainer">
            <Foco
              onClickOutside={() => setOpen(false)}
              onFocusOutside={() => setOpen(false)}
            >
              <SubmittedRecipesPortal
                isOpen={open}
                onClose={() => setOpen(false)}
                selectedRow={selectedRow}
                modalColumns={modalColumns}
              />
            </Foco>
          </div>
        </>
      )}
    </>
  );
};

export default SubmittedRecipes;
