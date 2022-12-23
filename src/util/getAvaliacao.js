import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export const getAvaliacoes = (checkout, avaliacao) => {
  if (!checkout) {
    return "Refeição não realizada";
  } else if (!avaliacao) {
    return "Não avaliado";
  }
  return Array.from(Array(5)).map((_, i) =>
    (_, i + 1) <= avaliacao ? <AiFillStar /> : <AiOutlineStar />
  );
};
