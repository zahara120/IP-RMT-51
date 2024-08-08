import { Image, Avatar, Button } from "@nextui-org/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertTime } from "../../helpers/time";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetails } from "../store/recipe";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import ReviewCard from "../components/ReviewCard";

export const RecipeDetail = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.recipes.details);
  let { id } = useParams();

  useEffect(() => {
    dispatch(fetchDetails(id));
  }, []);

  const handleDonation = async () => {
    try {
      const { data } = await axios({
        method: "post",
        url: `/donation`,
        data: {
          amount: 5000
        }
      });
      window.snap.pay(data.transactionToken, {
        onSuccess: function (result) {
          toast.success("Thank you for your donation!");
        },
        onClose: function () {
          toast.success("You closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

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
            <span className="flex items-center gap-2">
              <Avatar src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png" />
              By: {data?.User?.username}
              <Button
                className="animate-bounce"
                color="danger"
                aria-label="Like"
                onPress={() => handleDonation()}
              >
                Support This Recipe
                <FontAwesomeIcon icon="fa-solid fa-heart" />
              </Button>
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
      <ReviewCard data={data} />
    </>
  );
};
