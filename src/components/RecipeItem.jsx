const RecipeItem = ({ item }) => {
  const name = item.strMeal;
  const image = item.strMealThumb;
  const category = item.strCategory;

  return (
    <>
      <div className="recipeItem">
        <h3 className="recipeItems-name">{name}</h3>
        {/* <span>{category}</span> */}
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
