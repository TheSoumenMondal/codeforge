import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

const ProblemLeftNav = () => {
  return (
    <div className="w-full flex justify-between items-center h-full px-4">
      <p className="font-semibold text-sm">Problems</p>
      <div>
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
            Solved
          </Button>
          <Button
            size="lg"
            animation="none"
            variant="warning"
          >
            Unsolved
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
    </div>
  );
};

export default ProblemLeftNav;
