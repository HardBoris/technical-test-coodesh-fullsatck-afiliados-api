import * as yup from "yup";

class ProductShape {
  products = yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      product: yup.string(),
      producer: yup.object().shape({
        name: yup.string().required(),
      }),
    })
  );
}

export default new ProductShape();
