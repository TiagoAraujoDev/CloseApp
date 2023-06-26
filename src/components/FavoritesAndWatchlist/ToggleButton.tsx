import * as ToggleGroup from "@radix-ui/react-toggle-group";

interface ToggleButtonProps {
  handleMediaType: (value: string) => void;
}
export function ToggleButton({ handleMediaType }: ToggleButtonProps) {
  return (
    <ToggleGroup.Root
      onValueChange={(value: string) => handleMediaType(value)}
      type="single"
      defaultValue="movies"
      className="space-x-2 rounded text-sm"
    >
      <ToggleGroup.Item
        value="movies"
        className="radix-state-on:border-b radix-state-on:border-emerald-500"
      >
        Movies
      </ToggleGroup.Item>
      <ToggleGroup.Item
        value="tv"
        className="radix-state-on:border-b radix-state-on:border-emerald-500"
      >
        Tvshows
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
}
