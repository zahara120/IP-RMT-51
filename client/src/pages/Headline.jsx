import { useEffect } from "react";
import { Image, Card, CardHeader } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllRecipes } from "../store/recipe";

export default function Headline() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.recipes.allRecipes);

  useEffect(() => {
    dispatch(fetchAllRecipes());
  }, [dispatch]);

  if (!data || data.length < 4) {
    return <p>Loading...</p>; 
  }

  return (
    <>
      <section className="mt-10">
        <div className="col-span-2 flex flex-col md:flex-row gap-12">
          <Link to={`/details/${data?.data[0]?.id}`} className="h-fit w-full">
            <Card className="w-full">
              <Image
                removeWrapper
                className="z-0 w-full h-full object-cover"
                isZoomed
                width={500}
                height={500}
                alt="NextUI Fruit Image with Zoom"
                src={data?.data[0]?.imageUrl}
              />
              <CardHeader className="absolute z-10 flex-col !items-start bg-black/60">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  New Recipe!
                </p>
                <h4 className="text-white font-medium text-large">
                  {data?.data[0]?.title}
                </h4>
              </CardHeader>
            </Card>
          </Link>
          <div className="grid grid-rows-2 gap-4 w-full">
            <Link to={`/details/${data?.data[1]?.id}`} className="h-fit w-full">
              <Card className="w-full">
                <Image
                  removeWrapper
                  className="z-0 w-full h-full object-cover"
                  isZoomed
                  width={500}
                  height={270}
                  alt="NextUI Fruit Image with Zoom"
                  src={data?.data[1]?.imageUrl}
                />
                <CardHeader className="absolute z-10 flex-col !items-start bg-black/60">
                  <p className="text-tiny text-white/60 uppercase font-bold">
                    New Recipe!
                  </p>
                  <h4 className="text-white font-medium text-large">
                    {data?.data[1]?.title}
                  </h4>
                </CardHeader>
              </Card>
            </Link>
            <div className="flex gap-4 w-full">
              <Link to={`/details/${data?.data[2]?.id}`} className="h-fit w-full">
                <Card className="w-full">
                  <Image
                    removeWrapper
                    className="z-0 w-full h-full object-cover"
                    isZoomed
                    width={370}
                    height={200}
                    alt="NextUI Fruit Image with Zoom"
                    src={data?.data[2]?.imageUrl}
                  />
                  <CardHeader className="absolute z-10 flex-col !items-start bg-black/60">
                    <p className="text-tiny text-white/60 uppercase font-bold">
                      New Recipe!
                    </p>
                    <h4 className="text-white font-medium text-large">
                      {data?.data[2]?.title}
                    </h4>
                  </CardHeader>
                </Card>
              </Link>
              <Link to={`/details/${data?.data[3]?.id}`} className="h-fit w-full">
                <Card className="w-full">
                  <Image
                    removeWrapper
                    className="z-0 w-full h-full object-cover"
                    isZoomed
                    width={370}
                    height={200}
                    alt="NextUI Fruit Image with Zoom"
                    src={data?.data[3]?.imageUrl}
                  />
                  <CardHeader className="absolute z-10 flex-col !items-start bg-black/60">
                    <p className="text-tiny text-white/60 uppercase font-bold">
                      New Recipe!
                    </p>
                    <h4 className="text-white font-medium text-large">
                      {data?.data[3]?.title}
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
