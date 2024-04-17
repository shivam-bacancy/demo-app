import { Box, Typography } from "@mui/material";

type PageHeaderProps = {
  title: string;
  rightElement?: React.ReactNode;
};

function PageHeader({ title, rightElement }: PageHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 2,
      }}
    >
      <Typography variant="h5" fontWeight={600}>
        {title}
      </Typography>
      {rightElement}
    </Box>
  );
}

export default PageHeader;
