import {
  Card,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularRecipes } from "../store/recipe";
import { convertTime } from "../../helpers/time";
import { Link } from "react-router-dom";
export const PopularRecipe = () => {
  const data = useSelector((state) => state.recipes.popularRecipes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularRecipes());
  }, []);
  return (
    <>
      <section className="flex flex-col gap-12" id="popular">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          Most Popular <FontAwesomeIcon icon="fa-solid fa-fire-flame-curved" />
        </h1>
        <div className="grid grid-cols-3 gap-7">
          {data?.map((el) => (
            <Link to={`/details/${el.id}`} key={el.id}>
              <Card
                className="w-full"
                shadow="sm"
                key={el.id}
                isPressable
                onPress={() => console.log("item pressed")}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt="title"
                    className="w-full object-cover h-[200px]"
                    src={el.imageUrl}
                  />
                </CardBody>
                <CardFooter className="text-small flex flex-col gap-4 items-start">
                  <div className="flex items-center justify-between w-full">
                    <b>{el.title}</b>
                    <p className="text-default-500 flex items-center gap-2">
                      <FontAwesomeIcon icon="fa-regular fa-clock" />
                      {convertTime(el.cookTime)}
                    </p>
                  </div>
                  <p className="text-default-500">{el.description}</p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};
