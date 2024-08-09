import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Image,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, fetchDetails, updateRecipe } from "../store/recipe";

export default function RecipeModal({ action, isOpen, onClose, recipeId }) {
  const data = useSelector((state) => state.recipes.details);
  const isLoading = useSelector((state) => state.recipes.isLoading);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
    cookTime: "",
    img: "",
    imgFile: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? URL.createObjectURL(files[0]) : value,
    });

    if (name === "imgFile" && files.length) {
      setFormData({
        ...formData,
        imgFile: files[0],
        img: URL.createObjectURL(files[0]),
      });
    }
  };

  useEffect(() => {
    if (recipeId) {
      dispatch(fetchDetails(recipeId));
      console.log(data);
    }
  }, [recipeId, dispatch]);

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title,
        description: data.description,
        ingredients: data.ingredients,
        steps: data.steps,
        cookTime: data.cookTime,
        img: data.imageUrl,
        imgFile: data.imageUrl,
      });
    }
  }, [data]);

  const addData = async (formData) => {
    const result = await dispatch(createRecipe(formData));
    if (result) {
      setFormData({
        title: "",
        description: "",
        ingredients: "",
        steps: "",
        cookTime: "",
        img: "",
        imgFile: "",
      });
      onClose();
    }
  };

  const updateData = async (formData) => {
    const result = await dispatch(updateRecipe(recipeId, formData));
    if (result) {
      setFormData({
        title: "",
        description: "",
        ingredients: "",
        steps: "",
        cookTime: "",
        img: "",
        imgFile: "",
      });
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    switch (action) {
      case "add":
        await addData(formData);
        break;
      case "edit":
        await updateData(formData);
        break;
      default:
        toast.error("Unknown action");
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="center">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              {`${action} recipe`}
            </ModalHeader>

            <ModalBody>
              <Input
                isRequired
                label="Title"
                placeholder="Enter your title"
                type="text"
                variant="bordered"
                name="title"
                onChange={handleChange}
                value={formData.title}
              />
              <Textarea
                isRequired
                variant="bordered"
                label="Description"
                placeholder="Enter your description"
                name="description"
                onChange={handleChange}
                value={formData?.description}
              />
              <Textarea
                isRequired
                variant="bordered"
                label="Ingredients"
                placeholder="Enter your ingredients"
                name="ingredients"
                onChange={handleChange}
                value={formData?.ingredients}
              />
              <Textarea
                isRequired
                variant="bordered"
                label="Steps"
                placeholder="Enter your steps"
                name="steps"
                onChange={handleChange}
                value={formData?.steps}
              />
              <Input
                isRequired
                label="Cook Time"
                placeholder="Enter your cookTime"
                type="number"
                variant="bordered"
                name="cookTime"
                onChange={handleChange}
                value={formData.cookTime}
              />
              <Image required alt="NextUI hero Image" src={formData.img} />
              <Input
                label="Image"
                placeholder="Select your image"
                type="file"
                variant="bordered"
                accept="image/*"
                name="imgFile"
                onChange={handleChange}
              />
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                type="submit"
                className="bg-indigo-400 text-white"
                variant="flat"
                onClick={(e) => handleSubmit(e)}
                isLoading={isLoading}
              >
                Submit
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
