import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import TextInput from "./TextInput";
import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import { UserDetails } from "../../types/UserFormTypes";
import { Delete } from "@mui/icons-material";

const EducationFields = ({
  fields,
  register,
  errors,
  remove,
  append,
}: {
  fields: FieldArrayWithId<UserDetails, "educations", "id">[];
  register: UseFormRegister<UserDetails>;
  errors: FieldErrors<UserDetails>["educations"];
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<UserDetails>;
}) => {
  return (
    <Box>
      <Box display={"flex"} gap={1} mb={1}>
        <Typography variant="h6">Educations</Typography>
        <Button
          onClick={() =>
            append({
              schoolName: "",
              degree: "",
              startDate: new Date(),
              endDate: null,
            })
          }
          variant="contained"
        >
          + Add Education
        </Button>
      </Box>
      {fields.map((field, index) => {
        return (
          <Box
            key={field.id}
            sx={{
              p: 2,
              border: "1px solid grey",
              borderRadius: 2,
              position: "relative",
              mb: 1,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextInput
                  fullWidth
                  label="School Name"
                  register={register}
                  name={`educations.${index}.schoolName`}
                  error={errors?.[index]?.schoolName}
                />
              </Grid>
              <Grid item xs={4}>
                <TextInput
                  fullWidth
                  label="Degree"
                  register={register}
                  name={`educations.${index}.degree`}
                  error={errors?.[index]?.degree}
                />
              </Grid>
              <Grid item xs={4}>
                <TextInput
                  fullWidth
                  label="Description"
                  register={register}
                  name={`educations.${index}.description`}
                  error={errors?.[index]?.description}
                />
              </Grid>
              <Grid item xs={4}>
                <TextInput
                  fullWidth
                  label="Start Date"
                  register={register}
                  name={`educations.${index}.startDate`}
                  error={errors?.[index]?.startDate}
                  type="date"
                />
              </Grid>
              <Grid item xs={4}>
                <TextInput
                  fullWidth
                  label="End Date"
                  register={register}
                  name={`educations.${index}.endDate`}
                  error={errors?.[index]?.endDate}
                  type="date"
                />
              </Grid>
            </Grid>
            <IconButton
              color="error"
              onClick={() => remove(index)}
              sx={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
              }}
            >
              <Delete />
            </IconButton>
          </Box>
        );
      })}
    </Box>
  );
};

export default EducationFields;
