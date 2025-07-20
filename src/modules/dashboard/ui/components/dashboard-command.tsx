import {
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const DashboardCommand = ({ open, setOpen }: Props) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Find a meeting or agent" />
      <CommandList>
        <CommandItem>Test</CommandItem>
        <CommandItem>Test 2</CommandItem>
        <CommandItem>Test 3</CommandItem>
        <CommandItem>Test 4</CommandItem>
        <CommandItem>Test 5</CommandItem>
      </CommandList>
    </CommandDialog>
  );
};

export default DashboardCommand;
