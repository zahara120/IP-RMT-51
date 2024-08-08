import { useEffect } from "react";
import { Image, Card, CardHeader } from "@nextui-org/react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getAllRecipe } from "../store/recipe";

export default function Headline() {
  const data = useSelector(state => state.recipes.all)
  const dispatch = useDispatch()

  const getData = async () => {
    const { data } = await axios({
      method: "get",
      url: "/recipes",
    });
    dispatch(getAllRecipe(data?.data?.slice(0, 4)))
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <section className="mt-10">
        <div className="col-span-2 flex flex-col md:flex-row gap-12">
          <Link to={`/detail/${data[0]?.id}`} className="h-fit w-full">
            <Card className="w-full">
              <Image
                removeWrapper
                className="z-0 w-full h-full object-cover"
                isZoomed
                width={500}
                height={500}
                alt="NextUI Fruit Image with Zoom"
                src={data[0]?.imageUrl}
              />
              <CardHeader className="absolute z-10 flex-col !items-start bg-black/60">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  New Recipe!
                </p>
                <h4 className="text-white font-medium text-large">
                  {data[0]?.title}
                </h4>
              </CardHeader>
            </Card>
          </Link>
          <div className="grid grid-rows-2 gap-4 w-full">
            <Link to={`/detail/${data[1]?.id}`} className="h-fit w-full">
              <Card className="w-full">
                <Image
                  removeWrapper
                  className="z-0 w-full h-full object-cover"
                  isZoomed
                  width={500}
                  height={270}
                  alt="NextUI Fruit Image with Zoom"
                  src={data[1]?.imageUrl}
                />
                <CardHeader className="absolute z-10 flex-col !items-start bg-black/60">
                  <p className="text-tiny text-white/60 uppercase font-bold">
                    New Recipe!
                  </p>
                  <h4 className="text-white font-medium text-large">
                    {data[1]?.title}
                  </h4>
                </CardHeader>
              </Card>
            </Link>
            <div className="flex gap-4 w-full">
              <Link to={`/detail/${data[2]?.id}`} className="h-fit w-full">
                <Card className="w-full">
                  <Image
                    removeWrapper
                    className="z-0 w-full h-full object-cover"
                    isZoomed
                    width={370}
                    height={200}
                    alt="NextUI Fruit Image with Zoom"
                    src={data[2]?.imageUrl}
                  />
                  <CardHeader className="absolute z-10 flex-col !items-start bg-black/60">
                    <p className="text-tiny text-white/60 uppercase font-bold">
                      New Recipe!
                    </p>
                    <h4 className="text-white font-medium text-large">
                      {data[2]?.title}
                    </h4>
                  </CardHeader>
                </Card>
              </Link>
              <Link to={`/detail/${data[3]?.id}`} className="h-fit w-full">
                <Card className="w-full">
                  <Image
                    removeWrapper
                    className="z-0 w-full h-full object-cover"
                    isZoomed
                    width={370}
                    height={200}
                    alt="NextUI Fruit Image with Zoom"
                    src={data[3]?.imageUrl}
                  />
                  <CardHeader className="absolute z-10 flex-col !items-start bg-black/60">
                    <p className="text-tiny text-white/60 uppercase font-bold">
                      New Recipe!
                    </p>
                    <h4 className="text-white font-medium text-large">
                      {data[3]?.title}
                    </h4>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
