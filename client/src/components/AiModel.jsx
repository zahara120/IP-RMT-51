import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAiRecipe, resetAiRecipe } from "../store/recipe";
import { convertTime } from "../../helpers/time";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AiModel({ isOpen, onClose }) {
  const [ingredients, setIngredients] = useState("");
  const answer = useSelector((state) => state.recipes.aiRecipe);
  const isLoading = useSelector((state) => state.recipes.isLoading);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(fetchAiRecipe(ingredients));
    if (result) {
      setIngredients("");
    }
  };
  return (
    <>
      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                What Recipe Are You Looking For?
                <span className="text-indigo-400 text-sm">
                  Enter your ingredients now and find your next meal!
                </span>
              </ModalHeader>
              <ModalBody>
                <Textarea
                  isRequired
                  variant="bordered"
                  label="Ingredients"
                  placeholder="Enter your ingredients"
                  name="ingredients"
                  onChange={(e) => setIngredients(e.target.value)}
                  value={ingredients}
                />
                {answer.title.length ? (
                  <>
                    <div className="border-2 rounded-xl p-4 w-full">
                      <h3 className="text-xl font-bold mb-4">
                        AI Recipe Recommendation
                      </h3>
                      <div className="flex flex-col gap-4 w-full">
                        <div className="flex items-center justify-between w-full">
                          <strong className="text-2xl">{answer.title}</strong>
                          <span className="flex items-center gap-2">
                            <FontAwesomeIcon icon="fa-solid fa-clock" />
                            {convertTime(answer.cookTime)}
                          </span>
                        </div>

                        <p>{answer.description}</p>

                        <p>
                          <strong className="text-lg">Ingredients:</strong>
                          <span>{answer.ingredients}</span>
                        </p>

                        <p>
                          <strong className="text-lg">Instructions:</strong>
                          <span>{answer.steps}</span>
                        </p>
                      </div>
                    </div>
                  </>
                ) : null}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  onClick={() => dispatch(resetAiRecipe())}
                >
                  Close
                </Button>
                <Button
                  className="bg-indigo-400 text-white"
                  onClick={(e) => handleSubmit(e)}
                  isLoading={isLoading}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
