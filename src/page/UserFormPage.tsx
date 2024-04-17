import { Box, Button } from "@mui/material";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserDetails } from "../types/UserFormTypes";
import EducationFields from "../components/user-form/EducationField";
import TextInput from "../components/user-form/TextInput";
import PageHeader from "../components/common/PageHeader";
import { Link } from "react-router-dom";

const educationSchema = Yup.object().shape({
  schoolName: Yup.string().required("School name is required"),
  degree: Yup.string().required("Degree is required"),
  description: Yup.string().optional(),
  startDate: Yup.date()
    .required("Start date is required")
    .typeError("Invalid Date")
    .transform((v) => (!isNaN(v) ? v : null)),
  endDate: Yup.date()
    .nullable()
    .typeError("Invalid Date")
    .transform((v) => (v instanceof Date && !isNaN(v) ? v : null))
    .when("startDate", (dates, schema) => {
      if (!Yup.ref("endDate") || dates[0] === null) return schema;
      return schema
        .min(dates[0], "End date must be greater than start date")
        .required();
    })
    .optional(),
});
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  age: Yup.number()
    .optional()
    .transform((v) => (v instanceof Number && !isNaN(v) ? v : undefined)),
  educations: Yup.array(educationSchema).required("Educations are required"),
});

function UserForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserDetails>({
    defaultValues: {
      educations: [{}],
    },
    resolver: yupResolver(validationSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  const onSubmit: SubmitHandler<UserDetails> = (data) => console.log(data);
  return (
    <Box>
      <PageHeader
        title="User Form"
        rightElement={
          <Link to={"/user-details"}>
            <Button variant="contained">Go To Books</Button>
          </Link>
        }
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <TextInput
            fullWidth
            label="Name"
            register={register}
            name={`name`}
            error={errors.name}
          />
          <TextInput
            fullWidth
            label="Email"
            register={register}
            name={`email`}
            error={errors.email}
          />
          <TextInput
            fullWidth
            label="Age"
            register={register}
            name={`age`}
            type="number"
            error={errors.age}
          />

          <EducationFields
            fields={fields}
            errors={errors.educations}
            register={register}
            remove={remove}
            append={append}
          />

          <Button type="submit" variant="contained" disabled={!isValid}>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default UserForm;
