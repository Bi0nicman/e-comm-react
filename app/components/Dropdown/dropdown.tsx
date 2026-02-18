  'use client';

  import { useState, useRef, useEffect } from 'react';

  interface DropdownProps {
    options: string[];
    placeholder?: string;
    name?: string;
    required?: boolean;
    onChange?: (value: string) => void;
  }

  export function Dropdown({ 
    options, 
    placeholder = "Select an option", 
    name, 
    required, 
    onChange }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleSelect = (value: string) => {
      setSelectedValue(value);
      setIsOpen(false);
      if (onChange) {
        onChange(value);
      }
    };

    return (
      <div className="relative inline-block w-full" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/5 hover:bg-white/20"
        >
          <span className={selectedValue ? 'text-white' : 'text-gray-400'}>
            {selectedValue || placeholder}
          </span>
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className={`-mr-1 size-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          >
            <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-2 w-full origin-top-right rounded-md bg-gray-800 ring-1 ring-white/10 shadow-lg transition">
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {name && (
          <input
            type="hidden"
            name={name}
            value={selectedValue}
            required={required}
          />
        )}
      </div>
    );
  }