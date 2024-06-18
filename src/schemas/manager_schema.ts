import * as Yup from "yup"
import { validationErrors } from "../tools/validationErrors"

export const manager_schema = Yup.object().shape({
    email: Yup.string().email("E-mail inválido").required(validationErrors.required),
    name: Yup.string().required(validationErrors.required),
})
