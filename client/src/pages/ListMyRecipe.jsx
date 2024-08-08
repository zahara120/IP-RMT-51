import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Tooltip,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe, fetchMyRecipe } from "../store/recipe";
import RecipeModal from "./RecipeModal";

export default function ListMyRecipe() {
  const [selectedId, setSelectedId] = useState(null);
  const data = useSelector((state) => state.recipes.myRecipe);
  const dispatch = useDispatch();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: openEdit,
    onOpen: onEdit,
    onOpenChange: onOpenEdit,
  } = useDisclosure();
  const handleEdit = (action, id) => {
    setSelectedId(id);
    onOpenEdit();
  };

  // const handleDelete = async (id) => {
  //   try {
  //     const { data } = await axios({
  //       method: "delete",
  //       url: `/news/${id}`,
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     getData();
  //     toast.success(`Delete ${data.title} success`);
  //   } catch (error) {
  //     toast.error(error.response.data.message || error.message);
  //   }
  // };

  useEffect(() => {
    dispatch(fetchMyRecipe());
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 my-2">
        <div className="flex justify-between items-center my-5">
          <h1 className="text-3xl">My Recipe</h1>
          <Button
            className="bg-black text-white"
            variant="flat"
            onPress={onOpen}
            startContent={<FontAwesomeIcon icon="fa-solid fa-plus" />}
          >
            Add Recipe
          </Button>
        </div>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>TITLE</TableColumn>
            <TableColumn>IMAGE</TableColumn>
            <TableColumn>VIEWS</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          {data.length ? (
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    <Image
                      isZoomed
                      className="w-[100px] h-[63px]"
                      src={item.imageUrl}
                      alt={item.title}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon="fa-solid fa-eye" />
                      {item.viewsCount}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Tooltip content="Edit recipe">
                        <Button
                          isIconOnly
                          variant="bordered"
                          color="error"
                          onPress={() => handleEdit("edit", item.id)}
                          startContent={
                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                          }
                        ></Button>
                      </Tooltip>
                      <Tooltip content="Delete recipe">
                        <Button
                          isIconOnly
                          variant="bordered"
                          color="danger"
                          onPress={() => dispatch(deleteRecipe(item.id))}
                          startContent={
                            <FontAwesomeIcon icon="fa-regular fa-trash-can" />
                          }
                        ></Button>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody emptyContent={"No data to display."}>{[]}</TableBody>
          )}
        </Table>
      </div>
      <RecipeModal
        action="add"
        isOpen={isOpen}
        onClose={onOpenChange}
      />
      <RecipeModal
        action="edit"
        isOpen={openEdit}
        onClose={onOpenEdit}
        recipeId={selectedId}
      />
    </>
  );
}
