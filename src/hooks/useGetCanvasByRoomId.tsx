import { useQuery } from "@tanstack/react-query";
import { getCanvasByRoomId } from "../api/canvas/GetCanvasByRoomId";
import { ICanvas } from "../types/ICanvas";

function useGetCanvasByRoomId(roomId: string) {
  return useQuery({
    queryKey: ["canvas", roomId], // ✅ Unique key per room
    queryFn: () => getCanvasByRoomId(roomId), // ✅ Pass argument
    enabled: !!roomId, // ✅ Prevent fetching when roomId is undefined
    retry: 0,
    select: (data) => {
      return data as ICanvas;
    },
  });
}

export default useGetCanvasByRoomId;
