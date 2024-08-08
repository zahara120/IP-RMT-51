import { Image, Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertTime } from "../../helpers/time";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetails } from "../store/recipe";

export const RecipeDetail = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.recipes.details);
  let { id } = useParams();

  useEffect(() => {
    dispatch(fetchDetails(id));
  }, []);

  return (
    <>
      <div className="md:col-span-3 flex flex-col">
        <div className="flex flex-col justify-center items-center">
          <Image
            width={500}
            src={data?.imageUrl}
            alt="NextUI Album Cover"
            className="my-12"
          />
        </div>
        <div className="flex flex-col gap-4 my-4">
          <h1 className="text-3xl">{data.title}</h1>
          <div className="flex justify-between items-center gap-2">
            <span className="flex items-center gap-2 bg-slate-200 px-3 py-2 rounded-xl">
              <Avatar src={data?.User?.imageUrl} />
              By: {data?.User?.username}
            </span>
            <div className="flex item-center gap-4">
              <p className="text-default-500 flex items-center gap-2">
                <FontAwesomeIcon icon="fa-regular fa-clock" />
                {convertTime(data.cookTime)}
              </p>
              <p className="text-default-500 flex items-center gap-2">
                <FontAwesomeIcon icon="fa-regular fa-eye" />
                {data.viewsCount}
              </p>
            </div>
          </div>
          <p className="text-justify w-full">
            Description: {data?.description}
          </p>
          <p className="text-justify w-full">
            Ingredients: {data?.ingredients}
          </p>
          <p className="text-justify w-full">Instructions: {data?.steps}</p>
        </div>
      </div>
    </>
  );
};
