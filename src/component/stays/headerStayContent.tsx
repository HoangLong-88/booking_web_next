import type { StayDetail } from "@/types/stays";
import { Input } from "../ui/input";
import { useRoomAvailability } from "@/hook/rooms/useRoomAvailability";
import { CustomButton } from "../ui/Button";
import { DateBarRangePicker } from "../ui/DateBar";

interface Props {
  hook: ReturnType<typeof useRoomAvailability>;
  stay?: StayDetail
}
export function HeaderStayContent({ hook, stay }: Props) {
  if (!stay) {
    return (
      <div className="w-[360px] h-[180px] bg-white border rounded-lg animate-pulse" />
    )
  }
  const { dates, checkAvailability } = hook;
  return (  
    <aside className="w-[360px] space-y-4">
      <div className="rounded-lg bg-white border p-4 shadow-sm">
        <div className="flex justify-between items-baseline">
          <div>
            <p className="text-xs text-slate-500">From</p>
            <p className="text-2xl font-semibold">${stay.price}</p>
            <p className="text-xs text-slate-500">per night</p>
          </div>

          <div className="text-right">
            <p className="font-medium">{stay.rating ?? "—"}</p>
            <p className="text-xs text-slate-500">reviews</p>
          </div>
        </div>

        <form className="mt-4 space-y-3" 
        >
          <DateBarRangePicker onCheckInChange={hook.setCheckInDate} onCheckOutChange={hook.setCheckOutDate} />
          <CustomButton onClick={checkAvailability} type="submit" className="w-full bg-emerald-700 text-white py-2 rounded-md">
            Check availability
          </CustomButton>
        </form>
      </div>


    </aside>
  )
}
