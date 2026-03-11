import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import type { SyntheticEvent } from "react";
import { useIntl } from "react-intl";

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
  const intl = useIntl();

  return (
    <Form action="#" onSubmit={onSubmit} className="c-weather-form">
      <Label htmlFor="input-city" className="u-visually-hidden">
        {intl.formatMessage({
          id: "weatherForm.cityLabel",
          defaultMessage: "City",
        })}
      </Label>
      <Input
        className="c-weather-form__input u-focus-ring"
        id="input-city"
        type="text"
        value={city}
        name="city"
        placeholder={intl.formatMessage({
          id: "weatherForm.placeholder",
          defaultMessage: "City or City, Country (e.g. Madrid, Spain)",
        })}
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
        {isLoading
          ? intl.formatMessage({
              id: "weatherForm.loading",
              defaultMessage: "Loading...",
            })
          : intl.formatMessage({
              id: "weatherForm.search",
              defaultMessage: "Search",
            })}
      </Button>
    </Form>
  );
};

export default WeatherForm;
