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
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../store/recipe";
import { Rating } from "@smastrom/react-rating";

export default function ReviewCard({ data }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.recipes.isLoading);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = dispatch(
      addReview(data.id, {
        rating,
        comment,
      })
    );
    if (resp) {
      setRating(4);
      setComment("");
      onOpenChange();
    }
  };

  const isLogin = localStorage.getItem("token");
  return (
    <>
      <div className="flex items-center justify-between">
        {data?.Reviews?.length > 0 && (
          <h1 className="text-2xl">{data?.Reviews?.length} Reviews</h1>
        )}
        {isLogin && (
          <>
            <Button className="bg-indigo-400 text-white" onPress={onOpen}>
              Add Review
              <FontAwesomeIcon icon="fa-regular fa-star" />
            </Button>
          </>
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
            <Rating style={{ maxWidth: 120 }} value={el.rating} readOnly />
            <p>{el.comment}</p>
          </div>
        ))}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Review
              </ModalHeader>
              <ModalBody>
                <Rating
                  isRequired
                  name="rating"
                  style={{ maxWidth: 180 }}
                  value={rating}
                  onChange={setRating}
                />
                <Textarea
                  isRequired
                  label="Comment"
                  name="comment"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-indigo-400 text-white"
                  isLoading={isLoading}
                  onClick={(e) => handleSubmit(e)}
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
