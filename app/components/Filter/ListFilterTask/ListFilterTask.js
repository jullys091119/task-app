"use client";
import { useContext, useState } from "react";
import { AppContext } from "../../../AppContext";;
import {Popover } from "@heroui/react";
import { SquareChartBar, Video, BarsAscendingAlignLeftArrowDown } from '@gravity-ui/icons';

export function ListFilterTask() {
  const { setListBoxFilter } = useContext(AppContext)
  const [open, setOpen] = useState(false);
  return (
    <Popover isOpen={open} onOpenChange={setOpen} placement="bottom end">
      <Popover.Trigger>
        <button>
          <BarsAscendingAlignLeftArrowDown />
        </button>
      </Popover.Trigger>

      <Popover.Content className="w-[110px] p-2">
        <button
          className="flex items-center gap-2 w-full px-2 py-1 hover:bg-gray-100"
          onClick={() => {
            setListBoxFilter("allTask");
            setOpen(false);
          }}
        >
          <SquareChartBar /> All
        </button>
        <button
          className="flex items-center gap-2 w-full px-2 py-1 hover:bg-gray-100"
          onClick={() => {
            setListBoxFilter("task");
            setOpen(false);
          }}
        >
          <SquareChartBar /> Task
        </button>

        <button
          className="flex items-center gap-2 w-full px-2 py-1 hover:bg-gray-100"
          onClick={() => {
            setListBoxFilter("event");
            setOpen(false);
          }}
        >
          <Video /> Events
        </button>
      </Popover.Content>
    </Popover>
  );
}