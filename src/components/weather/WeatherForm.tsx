import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import type { SyntheticEvent } from "react";
import { useIntl } from "react-intl";
import { useDefaultMessage } from "@/lib/use-default-message";

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

  const cityLabel = useDefaultMessage("weatherForm.cityLabel", "City");
  const placeholder = useDefaultMessage(
    "weatherForm.placeholder",
    "City or City, Country (e.g. Madrid, Spain)",
  );
  const loadingText = useDefaultMessage("weatherForm.loading", "Loading...");
  const searchText = useDefaultMessage("weatherForm.search", "Search");

  return (
    <Form
      action="#"
      onSubmit={onSubmit}
      className="c-weather-form"
      role="search"
      aria-label="Weather search form"
    >
      <Label htmlFor="input-city" className="u-visually-hidden">
        {intl.formatMessage({
          id: "weatherForm.cityLabel",
          defaultMessage: cityLabel,
        })}
      </Label>
      <Input
        className="c-weather-form__input u-focus-ring"
        id="input-city"
        type="search"
        value={city}
        name="city"
        placeholder={intl.formatMessage({
          id: "weatherForm.placeholder",
          defaultMessage: placeholder,
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
              defaultMessage: loadingText,
            })
          : intl.formatMessage({
              id: "weatherForm.search",
              defaultMessage: searchText,
            })}
      </Button>
    </Form>
  );
};

export default WeatherForm;
