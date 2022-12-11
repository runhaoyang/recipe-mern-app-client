import { useState, useRef } from "react";
import Loading from "./Loading";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styled, { createGlobalStyle } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

`;

const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 87vh;
  padding: 20px;
`;

const StyledForm = styled.form`
  width: 100%;
  height: 100%;
  max-width: 700px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  overflow-y: auto;
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  margin: 0px 0 10px 0;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledIngredientContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1em;
`;

const StyledButton = styled.button`
  display: block;
  background-color: #2a9d8f;
  color: #fff;
  font-size: 1em;
  border: 0;
  border-radius: 5px;
  height: 40px;
  padding: 0 20px;
  margin-top: 0.5em;
  margin-bottom: 1em;
  cursor: pointer;
  box-sizing: border-box;
`;

const StyledSubmitButton = styled(StyledButton)`
  background-color: #e76f51;
`;

const StyledFileInput = styled.input`
  display: none;
`;

const StyledInputLabel = styled.label`
  cursor: pointer;
  background-color: #264653;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  height: 2.5em;
  width: 8em;
  border: 0;
  border-radius: 5px;
  color: #ffffff;
`;

const AddRecipe = ({ userInfo, isLoggedIn, backendUrl }) => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeCategory, setRecipeCategory] = useState("");
  // Number of ingredients and quantity input to display
  const [ingredientCount, setIngredientCount] = useState(3);
  //   const [textArea, setTextArea] = useState(
  //     "The content of a textarea goes in the value attribute"
  //   );
  const [instructionsCount, setInstructionsCount] = useState(3);
  //   const [item, setItem] = useState({ title: "", image: "" });
  const [inputFile, setInputFile] = useState(null);

  const nameRef = useRef(null);
  const categoryRef = useRef(null);
  // Contains the ingredient names
  const ingredientsRef = useRef([]);
  // Contains the quantity corresponding to each ingredient name
  const quantityRef = useRef([]);
  const instructionsRef = useRef([]);
  // const inputFileRef = useRef(null);
  const formRef = useRef(null);

  const increaseIngredientFields = () => {
    if (ingredientCount === 20) {
      ingredientLimitNotification();
      return;
    }
    setIngredientCount(ingredientCount + 1);
    setTimeout(() => {
      focusLastRef(ingredientsRef);
    }, 0);
  };

  const increaseInstructionsFields = () => {
    setInstructionsCount(instructionsCount + 1);
    setTimeout(() => {
      focusLastRef(instructionsRef);
    }, 0);
  };

  const focusLastRef = (ref) => {
    const lastRef = ref.current[ref.current.length - 1];
    lastRef.focus();
    if (ref === ingredientsRef) {
      ref.current[Math.floor(ref.current.length / 2)].scrollIntoView({
        behavior: "smooth",
      });
    } else {
      lastRef.scrollIntoView({ behavior: "smooth" });
    }
  };

  const resetInputFields = () => {
    setRecipeName("");
    setRecipeCategory("");

    setIngredientCount(3);
    setInstructionsCount(3);
    ingredientsRef.current = [[], [], []];
    instructionsRef.current = [[], [], []];

    setInputFile(null);
    // inputFileRef.current.value = "";
  };

  const ingredientLimitNotification = () => {
    toast.info("Maximum of 20 ingredients reached.", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const errorNotification = () => {
    toast.error("Recipe name is required.", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const successNotification = () => {
    toast.success(
      "Recipe added to submissions. Needs review before adding to recipes database.",
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 20000,
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let ingredientList = [];
    let quantityList = [];
    for (let i = 0; i < ingredientsRef.current.length; i++) {
      if (ingredientsRef.current[i].value !== "") {
        ingredientList.push(ingredientsRef.current[i].value);
        quantityList.push(quantityRef.current[i].value);
      }
    }
    let instructionsList = [];
    for (let i = 0; i < instructionsRef.current.length; i++) {
      if (instructionsRef.current[i].value !== "") {
        instructionsList.push(instructionsRef.current[i].value);
      }
    }
    try {
      const sendData = {};
      if (inputFile === null) {
        await Axios.get(`${backendUrl}/submittedRecipes/getLastId`).then(
          async (res) => {
            sendData.lastId = parseInt(res.data) + 1;
            sendData.postedBy = userInfo.username;
            sendData.recipeName = nameRef.current.value;
            sendData.recipeCategory = categoryRef.current.value;
            sendData.ingredientList = JSON.stringify(ingredientList);
            sendData.quantityList = JSON.stringify(quantityList);
            sendData.instructions = JSON.stringify(instructionsList);
            sendData.date =
              new Date().toLocaleString([], { hour12: true }) +
              " " +
              new Date().toTimeString().slice(9, 17);
            console.log("sendData: ");
            console.log(sendData);

            await Axios.post(`${backendUrl}/submittedRecipes/submit`, sendData)
              .then((res) => {
                console.log(res);
                // Clear all fields
                formRef.current.reset();
                resetInputFields();
                successNotification();
              })
              .catch((error) => {
                console.log(error);
                errorNotification();
                console.log("line 122");
              });
          }
        );
      } else {
        const imageRef = ref(storage, inputFile.name);
        uploadBytes(imageRef, inputFile).then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              sendData.filePath = url;
            })
            .then(async () => {
              await Axios.get(`${backendUrl}/submittedRecipes/getLastId`).then(
                async (res) => {
                  sendData.lastId = parseInt(res.data) + 1;
                  sendData.postedBy = userInfo.username;
                  sendData.recipeName = nameRef.current.value;
                  sendData.recipeCategory = categoryRef.current.value;
                  sendData.ingredientList = JSON.stringify(ingredientList);
                  sendData.quantityList = JSON.stringify(quantityList);
                  sendData.instructions = JSON.stringify(instructionsList);
                  sendData.date =
                    new Date().toLocaleString([], { hour12: true }) +
                    " " +
                    new Date().toTimeString().slice(9, 17);
                  sendData.fileName = inputFile.name;
                  sendData.fileType = inputFile.type;
                  console.log("sendData: ");
                  console.log(sendData);

                  await Axios.post(
                    `${backendUrl}/submittedRecipes/submit`,
                    sendData
                  )
                    .then((res) => {
                      console.log(res);
                      // Clear all fields
                      formRef.current.reset();
                      resetInputFields();
                      successNotification();
                    })
                    .catch((error) => {
                      console.log(error);
                      errorNotification();
                      console.log("line 166");
                    });
                }
              );
            })
            .catch((error) => {
              console.log(error);
            });
          // setInputFile(null);
        });
      }
    } catch (err) {
      console.error(`The error is ${err}`);
      console.log("line 176");
      errorNotification();
    }
  };

  const handleInputFile = (e) => {
    console.log(e.target.files[0]);
    setInputFile(e.target.files[0]);
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <GlobalStyle />
          <StyledFormWrapper>
            <StyledForm
              ref={formRef}
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <h2> Add Recipe Form </h2>
              <label>
                Recipe name{" "}
                <StyledInput
                  type="text"
                  ref={nameRef}
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  autoFocus
                />
              </label>
              {/* <div>
                <label>
                  Name{" "}
                  <input
                    ref={nameRef}
                    type="text"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                  />
                </label>
              </div> */}
              {/* <div>
                <label>
                  Category{" "}
                  <input
                    ref={categoryRef}
                    type="text"
                    value={recipeCategory}
                    onChange={(e) => setRecipeCategory(e.target.value)}
                  />
                </label>
              </div> */}
              <label>
                Recipe category{" "}
                <StyledInput
                  type="text"
                  ref={categoryRef}
                  value={recipeCategory}
                  onChange={(e) => setRecipeCategory(e.target.value)}
                />
              </label>

              {Array.from(Array(ingredientCount)).map(
                (ingredientCount, index) => {
                  return (
                    <StyledIngredientContainer key={index}>
                      <label>
                        Ingredient {index + 1}
                        <StyledInput
                          type="text"
                          ref={(el) => (ingredientsRef.current[index] = el)}
                        />
                      </label>
                      <label>
                        Quantity
                        <StyledInput
                          type="text"
                          ref={(el) => (quantityRef.current[index] = el)}
                        />
                      </label>
                    </StyledIngredientContainer>
                  );
                }
              )}

              <div>
                {/* <button type="button" onClick={increaseIngredientFields}>
                  Add more ingredients
                </button> */}
                <StyledButton type="button" onClick={increaseIngredientFields}>
                  <FontAwesomeIcon icon={faPlusCircle} />
                  <>&nbsp;</> Add more ingredients
                </StyledButton>
              </div>
              {Array.from(Array(instructionsCount)).map(
                (instructionsCount, index) => {
                  return (
                    <div key={index}>
                      <label>
                        Instruction {index + 1}{" "}
                        <StyledInput
                          type="text"
                          ref={(el) => (instructionsRef.current[index] = el)}
                        />
                      </label>
                    </div>
                  );
                }
              )}
              <div>
                {/* <button type="button" onClick={increaseInstructionsFields}>
                  Add more instructions
                </button> */}
                <StyledButton
                  type="button"
                  onClick={increaseInstructionsFields}
                >
                  <FontAwesomeIcon icon={faPlusCircle} />
                  <>&nbsp;</>
                  Add more instructions
                </StyledButton>
              </div>

              <StyledFileInput
                type="file"
                // ref={inputFileRef}
                accept="image/*"
                name="photo"
                id="photo"
                onChange={handleInputFile}
              />
              <StyledInputLabel htmlFor="photo">
                <FontAwesomeIcon icon={faFileImage} />
                <>&nbsp;</>
                Select image
              </StyledInputLabel>
              {inputFile ? "File selected: " + inputFile.name : null}

              {/* <div>
                <button type="submit">Submit</button>
              </div> */}
              <StyledSubmitButton type="submit">
                <FontAwesomeIcon icon={faCircleArrowRight} />
                <>&nbsp;</>
                Submit
              </StyledSubmitButton>
            </StyledForm>
          </StyledFormWrapper>
        </>
      ) : (
        <Loading source={"addARecipe"} />
      )}
      <ToastContainer />
    </>
  );
};

export default AddRecipe;
