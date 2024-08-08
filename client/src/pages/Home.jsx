import Headline from "./Headline";
import { PopularRecipe } from "./PopularRecipe";
import { ListRecipe } from "./ListRecipe";
export const Home = () => {
  return (
    <>
      {/* Headline */}
      <Headline />

      <div className="flex flex-col gap-12">
        {/* Popular Recipe */}
        <PopularRecipe />

        {/* All Recipe */}
        <ListRecipe />
      </div>
    </>
  );
};
