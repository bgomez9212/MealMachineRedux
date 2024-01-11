import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export function RecipeCard({
  image,
  title,
  missedIngredientCount,
  handleSaveClick,
  handleReadRecipe,
  handleDeleteSavedRecipe,
  isSaved,
  handleModalOpen,
  handleModalClose,
  modalOpen,
}: {
  image: string;
  title: string;
  handleSaveClick: () => void;
  handleReadRecipe: () => void;
  handleDeleteSavedRecipe: () => void;
  isSaved: boolean;
  missedIngredientCount: number;
  handleModalOpen: () => void;
  handleModalClose: () => void;
  modalOpen: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <Card className="w-full mt-10 flex flex-col overflow-hidden recipe-card bg-[#FCFCF6] dark:bg-[#526345]">
        <CardContent className="h-50 overflow-hidden flex items-center justify-center">
          <img src={image} className="w-full" />
        </CardContent>
        <CardHeader className="flex mb-0">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardDescription
          onClick={handleModalOpen}
          className="flex flex-grow flex-col justify-end mb-5 mx-6"
        >
          Missing {missedIngredientCount} ingredients
        </CardDescription>
        <CardFooter className="flex justify-between">
          <Button onClick={handleReadRecipe} variant={"link"}>
            Read Recipe
          </Button>
          {isSaved ? (
            <Button
              variant={"saved"}
              onClick={handleDeleteSavedRecipe}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {hovered ? "Unsave" : "Saved"}
            </Button>
          ) : (
            <Button onClick={handleSaveClick}>Save Recipe</Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
