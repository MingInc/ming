import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
      inputRef.current?.click();
    };

    React.useImperativeHandle(ref, () => inputRef.current!);

    return type === "file" ? (
      <div className="flex flex-col space-y-2">
        <input
          type="file"
          className="hidden"
          ref={inputRef}
          // onChange={handleFileChange}
          {...props}
          accept="image/*"
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className={cn(
            "px-3 py-2 rounded-md bg-blue-600 text-white text-sm font-medium",
            className
          )}
        >
          Select File
        </button>
      </div>
    ) : (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={inputRef}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
