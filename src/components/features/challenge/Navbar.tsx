import ThemeToggleChallengeNavbar from "./ThemeToggleChallengeNavbar";

const Navbar = () => {
  return (
    <div className="w-full h-14 flex items-center justify-between px-4">
      <div className="font-serif">codeforge</div>
      <div></div>
      <div>
        <ThemeToggleChallengeNavbar />
      </div>
    </div>
  );
};

export default Navbar;
