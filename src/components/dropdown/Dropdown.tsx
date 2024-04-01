import { useEffect, useRef, useState } from "react";

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const triggerRef = useRef<any>(null);
  const dropdownRef = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdownRef.current || !triggerRef.current) return;
      if (
        !dropdownOpen ||
        dropdownRef.current.contains(target) ||
        triggerRef.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <div
        ref={triggerRef}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      <div
        ref={dropdownRef}
        onFocus={() => setDropdownOpen(true)}
        onClick={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-2 z-[200] rounded-sm border border-gray-300 bg-white shadow-default ${
          dropdownOpen ? "block" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
