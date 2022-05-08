const RecipeItem = ({ item, setModalState, setCurrentRecipe }) => {
  const name = item.strMeal;
  let image;
  const openModal = (e) => {
    e.preventDefault();
    setModalState(true);
    setCurrentRecipe(item);
  };

  if (item.userSubmitted) {
    if (item.strMealThumb === undefined) {
      image = `https://firebasestorage.googleapis.com/v0/b/recipe-mern-app-images.appspot.com/o/No-Image-Placeholder.svg.png?alt=media&token=8e2ad808-28be-415f-9597-bfaba677266e`;
    } else {
      image = item.strMealThumb;
    }
  } else {
    image = item.strMealThumb;
  }

  return (
    <>
      <div className="recipeItem">
        <p className="recipeItems-name">{name}</p>
        <div className="recipeItems-image-container">
          <img src={image} alt="" />
        </div>
        <div className="learnMore">
          <a href="/#" onClick={openModal}>
            Learn More
          </a>
        </div>
      </div>
    </>
  );
};

export default RecipeItem;
