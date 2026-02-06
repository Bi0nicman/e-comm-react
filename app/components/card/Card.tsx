
import Image from "next/image";
type CardProps = {
  imgLink?: string;
  title?: string;
  id: number;
  description?: string;
  isFavorite: boolean;
  onToggleFavorite: (game: number) => void;
};

export function Card({
  imgLink,
  title,
  id,
  description,
  isFavorite,
  onToggleFavorite
}: CardProps) {
  const pathNoPicture = "/no_photo.jpg";
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-emerald-950">
      <Image className="w-full h-60 object-cover" src={imgLink || pathNoPicture}
        width={540}
        height={360}
        alt={title || "no-image"} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">

        <button
          onClick={() => onToggleFavorite(id)}
          className={`bg-emerald-950 font-bold py-2 px-4 rounded transition-colors cursor-pointer
    ${isFavorite ? "text-yellow-400" : "text-white hover:text-yellow-400"}
  `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFavorite ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>


      </div>
    </div >
  );
}