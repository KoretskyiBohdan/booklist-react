import { BookType } from 'apiTypes';

export const formValuesToBookData = (
  data: Record<string, string>
): Omit<BookType, 'id'> | BookType => {
  const book: any = {
    name: data.name,
    price: Number(data.price),
    category: data.category,
    description: data.description,
  };

  if (data.id) book.id = Number(data.id);

  return book;
};
