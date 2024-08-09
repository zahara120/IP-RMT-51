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
            <div className="flex items-center">
              {Array.from({ length: el.rating }, (_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-300 ms-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>
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
