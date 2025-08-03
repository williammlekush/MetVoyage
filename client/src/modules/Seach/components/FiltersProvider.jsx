import { useMemo, useState } from "react";
import { FiltersContext } from "../hooks/useFilters";
import Filter from "./Filter";
import {
  Castle,
  Category,
  Celebration,
  Diversity3,
  Draw,
  Face,
  Flag,
  LocationCity,
  Museum,
  SouthAmerica,
  Timeline,
  Title,
  TypeSpecimen,
} from "@mui/icons-material";
import { getArtistOptions, getObjectOptions } from "../api";
import {
  Accordion,
  accordionClasses,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/joy";

export default function FiltersProvider({ children }) {
  const [filters, setFilters] = useState();

  const iconProps = useMemo(() => ({ fontSize: "xs" }), []);

  const objectFilters = useMemo(
    () => ({
      title: "Basic filters",
      filters: [
        {
          id: "title",
          Icon: <Title {...iconProps} />,
          label: "Title",
          getOptions: () => getObjectOptions("titles"),
          tooltip: "Filter by title of the object",
        },
        {
          id: "artist",
          Icon: <Face {...iconProps} />,
          label: "Artist",
          getOptions: getArtistOptions,
          tooltip: "Filter by the artist associated with the object",
        },
        {
          id: "medium",
          Icon: <Draw {...iconProps} />,
          label: "Medium",
          getOptions: () => getObjectOptions("media"),
          tooltip: "Filter by the material or medium used to create the object",
        },
      ],
    }),
    [iconProps]
  );

  const museumFilters = useMemo(
    () => ({
      title: "Museum attributes",
      filters: [
        {
          id: "name",
          Icon: <Category {...iconProps} />,
          label: "Name",
          getOptions: () => getObjectOptions("names"),
          tooltip: "Filter by the name of the generic object",
        },
        {
          id: "classification",
          Icon: <TypeSpecimen {...iconProps} />,
          label: "Classification",
          getOptions: () => getObjectOptions("classifications"),
          tooltip: "Filter by the object's classification or type",
        },
        {
          id: "department",
          Icon: <Museum {...iconProps} />,
          label: "Department",
          getOptions: () => getObjectOptions("departments"),
          tooltip: "Filter by the museum department responsible for the object",
        },
      ],
    }),
    [iconProps]
  );

  const placeFilters = useMemo(
    () => ({
      title: "Place",
      filters: [
        {
          id: "city",
          Icon: <LocationCity {...iconProps} />,
          label: "City",
          getOptions: () => getObjectOptions("cities"),
          tooltip:
            "Filter by the city where the object originated or was found",
        },
        {
          id: "country",
          Icon: <Flag {...iconProps} />,
          label: "Country",
          getOptions: () => getObjectOptions("countries"),
          tooltip: "Filter by the country of origin or discovery",
        },
        {
          id: "region",
          Icon: <SouthAmerica {...iconProps} />,
          label: "Region",
          getOptions: () => getObjectOptions("regions"),
          tooltip: "Filter by the broader region related to the object",
        },
        {
          id: "culture",
          Icon: <Celebration {...iconProps} />,
          label: "Culture",
          getOptions: () => getObjectOptions("cultures"),
          tooltip: "Filter by the culture associated with the object",
        },
      ],
    }),
    [iconProps]
  );

  const timeFilters = useMemo(
    () => ({
      title: "Time",
      filters: [
        {
          id: "period",
          Icon: <Timeline {...iconProps} />,
          label: "Period",
          getOptions: () => getObjectOptions("periods"),
          tooltip: "Filter by the historical period of the object",
        },
        {
          id: "dynasty",
          Icon: <Diversity3 {...iconProps} />,
          label: "Dynasty",
          getOptions: () => getObjectOptions("dynasties"),
          tooltip: "Filter by the dynasty associated with the object",
        },
        {
          id: "reign",
          Icon: <Castle {...iconProps} />,
          label: "Reign",
          getOptions: () => getObjectOptions("reigns"),
          tooltip: "Filter by the reign of a ruler or era",
        },
      ],
    }),
    [iconProps]
  );

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      <AccordionGroup
        size="sm"
        sx={() => ({
          paddingX: "0.5rem",
          [`& .${accordionClasses.root}`]: {
            marginTop: "0.25rem",
            fontSize: "xs",
            transition: "0.2s ease",
            '& button:not([aria-expanded="true"])': {
              transition: "0.2s ease",
            },
            "& button:hover": {
              background: "transparent",
            },
          },
          [`& .${accordionClasses.root}.${accordionClasses.expanded}`]: {
            bgcolor: "background.level1",
            borderRadius: "md",
            borderColor: "background.level2",
          },
        })}
      >
        {[objectFilters, museumFilters, timeFilters, placeFilters].map(
          ({ title, filters }, index) => (
            <Accordion defaultExpanded={index === 0}>
              <AccordionSummary>{title}</AccordionSummary>
              <AccordionDetails>
                <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
                  {filters.map((filter) => (
                    <Filter key={filter.id} {...filter} />
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          )
        )}
      </AccordionGroup>

      {children}
    </FiltersContext.Provider>
  );
}
