import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const ArticleRightNavbar = () => {
  return (
    <div className="w-full h-full flex items-center px-5">
      <InputGroup className="max-w-xs">
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <MagnifyingGlassIcon
            size={32}
            weight="duotone"
          />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default ArticleRightNavbar;
