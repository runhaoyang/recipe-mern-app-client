const RecipeItem = ({ item }) => {
  const name = item.strMeal;
  const image = item.strMealThumb;
  const category = item.strCategory;

  return (
    <>
      <div>
        <h3>
          {name} <span>({category})</span>
        </h3>
        <div>
          <img src={image} alt="" />
        </div>
        <div className="learnMore">
          <a href="#">Learn More</a>
        </div>
      </div>
    </>
  );
};

export default RecipeItem;
