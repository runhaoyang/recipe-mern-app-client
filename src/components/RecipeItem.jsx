const RecipeItem = ({ item }) => {
  const name = item.strMeal;
  const image = item.strMealThumb;

  return (
    <>
      <div className="recipeItem">
        <p className="recipeItems-name">{name}</p>
        <div className="recipeItems-image-container">
          <img src={image} alt="" />
        </div>
        <div className="learnMore">
          <a href="/#">Learn More</a>
        </div>
      </div>
    </>
  );
};

export default RecipeItem;
