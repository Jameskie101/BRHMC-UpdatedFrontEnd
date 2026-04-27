import { useState } from "react";
import { Link } from "react-router";

type FavIconProps = {
  initial?: boolean;
};

const FavIcon: React.FC<FavIconProps> = ({ initial = false }) => {
  const [isFav, setIsFav] = useState(initial);

  return (
    <Link
      to="#"
      className="fav-icon"
      onClick={() => setIsFav((prev) => !prev)}
      aria-label="Add to favourites"
    >
      <i
        className={`fa ${isFav ? "fa-heart" : "fa-regular fa-heart"}`}
        style={{ color: isFav ? "red" : undefined }}
      />
    </Link>
  );
};

export default FavIcon;
