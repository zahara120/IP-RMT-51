import { Typewriter } from "react-simple-typewriter";
import { convertTime } from "../../helpers/time";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Typewriters({
  title,
  cookTime,
  description,
  ingredients,
  steps,
}) {
  return (
    <>
      <div className="border-2 rounded-xl p-4 w-full">
        <h3 className="text-xl font-bold mb-4">
          <Typewriter
            words={["AI Recipe Recommendation"]}
            loop={1}
            cursor
            cursorStyle="|"
            typeSpeed={10}
            deleteSpeed={0}
            delaySpeed={1000}
          />
        </h3>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center justify-between w-full">
            <strong className="text-2xl">
              <Typewriter
                words={[title]}
                loop={1}
                cursor
                cursorStyle="|"
                typeSpeed={10}
                deleteSpeed={0}
                delaySpeed={1000}
              />
            </strong>
            <span className="flex items-center gap-2">
              <FontAwesomeIcon icon="fa-solid fa-clock" />
              {convertTime(cookTime)}
            </span>
          </div>

          <p>
            <Typewriter
              words={[description]}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={10}
              deleteSpeed={0}
              delaySpeed={1000}
            />
          </p>

          <p>
            <strong className="text-lg">Ingredients:</strong>
            <span>
              <Typewriter
                words={[ingredients]}
                loop={1}
                cursor
                cursorStyle="|"
                typeSpeed={10}
                deleteSpeed={0}
                delaySpeed={1000}
              />
            </span>
          </p>

          <p>
            <strong className="text-lg">Instructions:</strong>
            <span>
              <Typewriter
                words={[steps]}
                loop={1}
                cursor
                cursorStyle="|"
                typeSpeed={10}
                deleteSpeed={0}
                delaySpeed={1000}
              />
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
