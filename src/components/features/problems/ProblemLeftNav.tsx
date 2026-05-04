import { PencilCircleIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

const ProblemLeftNav = () => {
  const router = useRouter();

  const handleNavigateToCreate = () => {
    router.push("/problems/create");
  };

  return (
    <div className="w-full flex justify-between items-center h-full px-4">
      <p className="font-semibold text-sm">Problems</p>
      <div className="flex gap-3 items-center">
        <ButtonGroup>
          <Button
            size="lg"
            animation="none"
            variant="warning"
          >
            All
          </Button>
          <Button
            size="lg"
            animation="none"
            variant="warning"
          >
            Easy
          </Button>
          <Button
            size="lg"
            animation="none"
            variant="warning"
          >
            Medium
          </Button>
          <Button
            size="lg"
            animation="none"
            variant="warning"
          >
            Hard
          </Button>
        </ButtonGroup>

        <Button
          size="lg"
          animation="none"
          onClick={handleNavigateToCreate}
        >
          <PencilCircleIcon
            size={32}
            weight="duotone"
          />
          Contribute
        </Button>
      </div>
    </div>
  );
};

export default ProblemLeftNav;
