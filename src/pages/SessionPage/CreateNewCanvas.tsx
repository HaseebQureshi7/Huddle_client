import { useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import Typography from "../../components/ui/Typography";
import { ColFlex, RowFlex } from "../../styles/utils/flexUtils";
import colors from "../../styles/colors";
import { ICanvas } from "../../types/ICanvas";
import useCreateCanvas from "../../hooks/useCreateCanvas";

interface ICreateNewCanvasProps {
  setCurrentCanvas: (data: ICanvas | null) => void;
}

function CreateNewCanvas({ setCurrentCanvas }: ICreateNewCanvasProps) {
  const { id: roomId } = useParams();
  const { mutate: createCanvas, isPending } = useCreateCanvas({
    onSuccess: (data: ICanvas) => {
      setCurrentCanvas(data.data);
    },
    onError: (error: Error) => {
      console.error("Error creating canvas:", error);
    },
  });

  const handleCreate = () => {
    if (!roomId) {
      console.error("Room ID not found!");
      return;
    }
    createCanvas({ roomId });
  };

  return (
    <div style={{ ...ColFlex, width: "100%", height: "100%", color: "white" }}>
      <Typography styles={{ ...RowFlex, gap: "10px" }}>
        No canvas found!{" "}
        <Button
          onClick={handleCreate}
          style={{ color: colors.primary }}
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create one?"}
        </Button>
      </Typography>
    </div>
  );
}

export default CreateNewCanvas;
