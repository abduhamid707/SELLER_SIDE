import React, { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface TagSelectProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  allowCustomTags?: boolean;
}

const TagSelect: React.FC<TagSelectProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Teglar tanlang",
  className = "",
  error,
  allowCustomTags = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase()) &&
      !selectedValues.includes(opt.value)
  );

  const handleSelect = (value: string) => {
    if (!selectedValues.includes(value)) {
      onChange([...selectedValues, value]);
    }
    setSearch("");
    setHighlightedIndex(0);
    setIsOpen(false);
  };

  const handleRemove = (value: string) => {
    onChange(selectedValues.filter((v) => v !== value));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev + 1 >= filteredOptions.length ? 0 : prev + 1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev - 1 < 0 ? filteredOptions.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredOptions[highlightedIndex]) {
        handleSelect(filteredOptions[highlightedIndex].value);
      } else if (allowCustomTags && search.trim()) {
        handleSelect(search.trim());
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Tashqariga bosilsa yopilsin
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div
        className={`flex flex-wrap gap-2 items-center border rounded-lg px-4 py-2 min-h-[44px] cursor-text ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-orange-500"
        }`}
        onClick={() => setIsOpen(true)}
      >
        {selectedValues.map((val) => {
          const label = options.find((opt) => opt.value === val)?.label || val;
          return (
            <span
              key={val}
              className="flex items-center gap-1 bg-orange-100 text-orange-800 text-sm px-2 py-1 rounded-full max-w-full break-words"
            >
              {label}
              <button
                type="button"
                className="ml-1 text-xs hover:text-red-600"
                onClick={() => handleRemove(val)}
              >
                ×
              </button>
            </span>
          );
        })}
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-sm text-gray-700 dark:text-white placeholder:text-gray-400"
          placeholder={selectedValues.length === 0 ? placeholder : ""}
        />
      </div>

      {isOpen && (filteredOptions.length > 0 || (allowCustomTags && search)) && (
        <ul className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-md dark:bg-gray-800">
          {filteredOptions.map((opt, index) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`cursor-pointer px-4 py-2 hover:bg-orange-100 dark:hover:bg-gray-700 ${
                index === highlightedIndex ? "bg-orange-50 dark:bg-gray-700" : ""
              }`}
            >
              {opt.label}
            </li>
          ))}
          {allowCustomTags && search.trim() && !filteredOptions.length && (
            <li
              className="cursor-pointer px-4 py-2 text-orange-500 hover:bg-orange-100 dark:hover:bg-gray-700"
              onClick={() => handleSelect(search.trim())}
            >
              “{search}” ni yangi tag sifatida qo‘shish
            </li>
          )}
        </ul>
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TagSelect;
