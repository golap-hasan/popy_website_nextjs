
import { InfoToast } from "@/lib/utils";
import { addToCart } from "@/redux/feature/cart/cartSlice";
import { AppDispatch } from "@/redux/store";
import { Book } from "@/types/shop";
import { useDispatch } from "react-redux";

export const useAddToCart = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (book: Book) => {
    const id = String(book._id ?? book.id ?? book.slug ?? book.title);
    const slug = book.slug ?? String(book._id ?? book.id ?? "");
    const priceNumber =
      typeof book.price === "number" ? book.price : Number(book.price ?? 0);

    const rawImage = book.coverImage ?? book.image ?? "";
    const imageUrl = rawImage ? rawImage : "";

    dispatch(
      addToCart({
        id,
        slug,
        title: book.title,
        price: priceNumber,
        coverImage: rawImage,
        author: book.author ?? "",
        quantity: 1,
        variant: book.subtitle,
        image: imageUrl,
      })
    );

    InfoToast(`${book.title} added to cart`);
  };

  return { handleAddToCart };
};