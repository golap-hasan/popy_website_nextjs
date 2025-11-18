import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { addToWishlist } from "@/redux/feature/wishlist/wishListSlice";
import { InfoToast } from "@/lib/utils";
import { Book } from "@/types/shop";

type WishlistSourceBook = Book & {
  _id?: string;
  id?: string;
  author?: string;
  coverImage?: string;
};

export const useWishlist = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToWishlist = (rawBook: Book) => {
    const book = rawBook as WishlistSourceBook;

    const id = String(book._id ?? book.id ?? book.slug ?? book.title);
    const slug = book.slug ?? id;
    const priceNumber =
      typeof book.price === "number" ? book.price : Number(book.price ?? 0);
    const coverImage = book.coverImage ?? "";
    const author = book.author ?? "";

    dispatch(
      addToWishlist({
        id,
        slug,
        title: book.title,
        price: priceNumber,
        coverImage,
        author,
      })
    );

    InfoToast(`${book.title} added to wishlist`);
  };

  return { handleAddToWishlist };
};
