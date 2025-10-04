import * as yup from "yup";

const schema = yup.object({
  nombre: yup.string().required("El nombre es obligatorio"),
  dni: yup
    .number()
    .typeError("El DNI debe ser un número")
    .required("El DNI es obligatorio")
    .positive("El DNI debe ser positivo"),
  tiempo: yup
    .string()
    .required("El tiempo es obligatorio")
    .matches(/^\d+h \d+m \d+s$/, "Formato válido: 2h 07m 30s"),
  posicion: yup
    .number()
    .typeError("La posición debe ser un número")
    .required("La posición es obligatoria")
    .min(1, "La posición debe ser mayor a 0"),
  ciudadId: yup.number().required("Debe seleccionar una ciudad"),
});

export default schema;
