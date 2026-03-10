import Form from "@/components/ui/Form";
import type { SyntheticEvent } from "react";

interface WeatherFormProps {
  city: string;
  isLoading: boolean;
  onCityChange: (city: string) => void;
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
}

const WeatherForm = ({
  city,
  isLoading,
  onCityChange,
  onSubmit,
}: WeatherFormProps) => {
  return (
    <Form action="#" onSubmit={onSubmit} className="c-weather-form">
      <input
        id="input-city"
        type="text"
        value={city}
        name="city"
        placeholder="Enter a city name"
        onChange={(event) => onCityChange(event.target.value)}
        disabled={isLoading}
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="u-btn u-focus-ring u-inline"
      >
        {isLoading ? "Loading..." : "Search"}
      </button>
    </Form>
  );
};

export default WeatherForm;
