import { useMemo, useState, useEffect } from "react";
import Loading from "./Loading";
import Axios from "axios";
import Foco from "react-foco";
import Table from "./Table";
import styled from "styled-components";
import RecipePortal from "./RecipePortal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const UsersList = () => {
  const [selectedRow, setSelectedRow] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "Users List",
        columns: [
          {
            Header: "Username",
            accessor: "username",
          },
          {
            Header: "ID",
            accessor: "_id",
          },
          {
            Header: "Recipes",
            accessor: "recipes.length",
          },
          {
            Header: "View",
            Cell: ({ row }) => (
              <StyledViewButton onClick={() => openPortal(row)}>
                View Recipes
              </StyledViewButton>
            ),
          },
        ],
      },
    ],
    []
  );

  const modalColumns = useMemo(
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
            maxWidth: 250,
            minWidth: 250,
            width: 100,
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    const fetchUsers = async () => {
      dismissNotification();
      setIsLoading(true);
      try {
        await Axios.get(
          "https://recipe-mern-app-server.onrender.com/users"
        ).then((res) => {
          setUsersList(res.data);
          setIsLoading(false);
        });
      } catch (error) {
        setIsLoading(false);
        console.error(`The error is ${error}`);
        errorNotification();
      }
    };
    fetchUsers();
  }, []);

  const errorNotification = () => {
    toast.error("Error fetching users from backend", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 15000,
    });
  };

  const dismissNotification = () => {
    toast.dismiss();
  };

  const openPortal = (row) => {
    setOpen(true);
    setSelectedRow(row);
  };

  return (
    <>
      {isLoading ? (
        <Loading source="users" />
      ) : (
        <>
          <Table columns={columns} data={usersList} />
          <Foco onClickOutside={() => setOpen(false)}>
            <RecipePortal
              isOpen={open}
              onClose={() => setOpen(false)}
              selectedRow={selectedRow}
              modalColumns={modalColumns}
            />
          </Foco>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default UsersList;
