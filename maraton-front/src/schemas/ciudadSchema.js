import * as yup from "yup";

const schema = yup.object({
  nombre: yup.string().required("El nombre es obligatorio"),
});

export default schema;
