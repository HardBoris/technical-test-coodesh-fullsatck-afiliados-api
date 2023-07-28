import * as yup from "yup";

class MovementShape {
  movement = yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number(),
        date: yup.string(),
        price: yup.number(),
        seller: yup.object().shape({
          name: yup.string(),
        }),
        product: yup.object().shape({
          product: yup.string(),
        }),
        type: yup.object().shape({
          id: yup.string(),
          type: yup.string(),
          kind: yup.string(),
        }),
      })
    )
    .required();

  movementByUser = yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number(),
        date: yup.string(),
        price: yup.number(),
        product: yup.object().shape({
          product: yup.string(),
        }),
        type: yup.object().shape({
          id: yup.string(),
          type: yup.string(),
          kind: yup.string(),
        }),
      })
    )
    .required();

  movementByProduct = yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number(),
        date: yup.date(),
        price: yup.number(),
        seller: yup.object().shape({
          name: yup.string(),
        }),
        type: yup.object().shape({
          id: yup.string(),
          type: yup.string(),
          kind: yup.string(),
        }),
      })
    )
    .required();
}

export default new MovementShape();
