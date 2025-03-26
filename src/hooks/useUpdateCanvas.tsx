import { useMutation } from "@tanstack/react-query";
import { updateCanvas } from "../api/canvas/UpdateCanvas";

const useUpdateCanvas = () => {
  return useMutation({
    mutationFn: updateCanvas,
    onSuccess: (data) => {
      console.log(data.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useUpdateCanvas;
