import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
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
      <Input
        className="c-weather-form__input u-focus-ring"
        id="input-city"
        type="text"
        value={city}
        name="city"
        placeholder="City or City, Country (e.g. Madrid, Spain)"
        onChange={(event) => onCityChange(event.target.value)}
        disabled={isLoading}
        loading={isLoading}
        required
      />
      <Button
        type="submit"
        disabled={isLoading}
        loading={isLoading}
        className="c-weather-form__submit u-focus-ring"
      >
        {isLoading ? "Loading..." : "Search"}
      </Button>
    </Form>
  );
};

export default WeatherForm;
