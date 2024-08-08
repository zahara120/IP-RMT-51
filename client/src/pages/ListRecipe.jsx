import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Input,
  Pagination,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes } from "../store/recipe";
import { convertTime } from "../../helpers/time";
import { Link } from "react-router-dom";
export const ListRecipe = () => {
  const data = useSelector((state) => state.recipes.allRecipes);
  const [search, setSearch] = useState("title");
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("-createdAt");
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllRecipes(search, keyword, sort, page));
  }, [search, keyword, sort, page]);
  return (
    <>
      <section
        className="flex flex-col gap-12 border-t-2 border-slate-200 py-8"
        id="all"
      >
        <div className="flex flex-col gap-4 md:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            Recipe Gallery <FontAwesomeIcon icon="fa-solid fa-utensils" />
          </h1>
          <div className="flex items-center gap-4">
            <select
              name="search"
              className="px-4 py-2 rounded-lg text-default-500 border-2"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            >
              <option value="title">Title</option>
              <option value="ingredients">Ingredients</option>
            </select>
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500",
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
              }
              type="keyword"
              variant="bordered"
              name="keyword"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <select
              name="sorting"
              className="px-4 py-2 rounded-lg text-default-500 border-2"
              onChange={(e) => setSort(e.target.value)}
              value={sort}
            >
              <option value="createdAt">A-Z</option>
              <option value="-createdAt">Z-A</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-7">
          {data?.data?.map((el) => (
            <Link to="/" key={el.id}>
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
                <CardFooter className="text-small flex flex-col gap-4 items-start h-[100px] overflow-hidden">
                  <div className="flex items-center justify-between w-full">
                    <b className="w-[120px] overflow-hidden whitespace-nowrap text-ellipsis">
                      {el.title}
                    </b>
                    <p className="text-default-500 flex items-center gap-2">
                      <FontAwesomeIcon icon="fa-regular fa-clock" />
                      {convertTime(el.cookTime)}
                    </p>
                  </div>
                  <p className="text-start text-default-500 overflow-hidden whitespace-nowrap text-ellipsis w-[230px]">
                    {el.description}
                  </p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        <div className="flex justify-center">
          <Pagination
            className="mb-4"
            loop
            showControls
            total={data?.totalPage}
            page={1}
            onChange={(e) => setPage(e)}
          />
        </div>
      </section>
    </>
  );
};
