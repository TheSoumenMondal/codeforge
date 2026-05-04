import { SlidersIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const ExploreLeftNav = () => {
  return (
    <div className="w-full flex justify-between items-center h-full px-4">
      <p className="font-semibold text-sm">Explore</p>
      <div>
        <ButtonGroup>
          <Button
            size="lg"
            animation="none"
            variant="warning"
          >
            Trending
          </Button>
          <Button
            size="lg"
            animation="none"
            variant="warning"
          >
            Following
          </Button>
          <Button
            size="lg"
            animation="none"
            variant="warning"
          >
            Saved
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <Select defaultValue="#interview">
          <SelectTrigger
            variant="secondary"
            size="default"
            icon={<SlidersIcon weight="duotone" />}
          ></SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="#interview">#Interview</SelectItem>
              <SelectItem value="#general">#General</SelectItem>
              <SelectItem value="#problem">#Problem</SelectItem>
              <SelectItem value="#discussion">#Discussion</SelectItem>
              <SelectItem value="#ask">#ask</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ExploreLeftNav;
