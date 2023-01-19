import { Request, Response, Error } from "npm:express@^4.17";
import { books, Book } from './books.ts';
import { nanoid } from 'npm:nanoid@3.3.4';

export class Books {

    getAllBuku(_req: Request, res: Response): void {
        try {
            return res.status(200).json(books);
        } catch (error: Error) {
            return res.status(404).json({ message: error.message });
        }
    }

    getBukuById(req: Request, res: Response): void {
        const id: string = req.params.id;
        try {
            const getBook: Book | undefined = books.find((b: Book): boolean => b.id == id);
            res.status(200).json(getBook);
        } catch (error: Error) {
            return res.status(404).json({ message: error.message });
        }
    }

    createBuku(req: Request, res: Response): void {
        const {
            name,
            year,
            author,
            pageCount,
        } = req.body;

        try {
            const createBook: Book = {
                id: nanoid(30),
                name,
                year: Number(year),
                author,
                pageCount: Number(pageCount),
                insertedAt: String(new Date()),
                updatedAt: String(new Date())
            }

            books.push(createBook);
            res.status(201).json(createBook);

        } catch (error: Error) {
            return res.status(400).json({ message: error.message });
        }
    }
}