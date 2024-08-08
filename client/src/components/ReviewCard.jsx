import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  User,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../store/recipe";
export default function ReviewCard({ data }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.recipes.isLoading);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState({
    rating: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = dispatch(addReview(data.id, formData));
    if (resp) {
      setFormData({
        rating: "",
        comment: "",
      });
      onOpenChange();
    }
  };

  const isLogin = localStorage.getItem("token");
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Reviews</h1>
        {isLogin && (
          <Button className="bg-indigo-400 text-white" onPress={onOpen}>
            Add Review
            <FontAwesomeIcon icon="fa-regular fa-star" />
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-4 h-[500px] overflow-y-auto">
        {data?.Reviews?.map((el) => (
          <div
            key={el.id}
            className="flex flex-col gap-4 items-start border-2 border-slate-200 p-4 rounded-xl shadow-lg"
          >
            <User
              name={el.User.username}
              description={el.User.email}
              avatarProps={{
                src: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
              }}
            />
            <p className="flex flex-col text-sm">
              <span>Rating: {el.rating}</span>
              {el.comment}
            </p>
          </div>
        ))}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Review
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  label="Rating"
                  name="rating"
                  type="number"
                  max={5}
                  onChange={handleChange}
                  value={formData.rating}
                />
                <Textarea
                  isRequired
                  label="Comment"
                  name="comment"
                  onChange={handleChange}
                  value={formData?.comment}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  isLoading={isLoading}
                  onClick={(e) => handleSubmit(e)}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
