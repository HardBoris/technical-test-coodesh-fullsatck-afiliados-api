import { Response } from "express";

type TMessage = string | Record<string, any>;

class ErrorHandler {
  public status: number;
  public message: TMessage;

  constructor(status: number, message: TMessage) {
    this.status = status;
    this.message = message;
  }
}

const errorHandler = (err: Error, res: Response) => {
  if (err instanceof ErrorHandler) {
    return res.status(err.status).json({ message: err.message });
  }

  console.error(err);

  return res.status(500).json({ message: "Internal server error." });
};

export { ErrorHandler, errorHandler };
