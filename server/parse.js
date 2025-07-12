import fs from "fs";
import csv from "csv-parser";

const mapRow = (map, row) => {
  const mapped = {};

  for (const [rowKey, key] of Object.entries(map)) {
    mapped[key] = row[rowKey];
  }

  return mapped;
};

export const parseMetObjects = () => {
  const objectMap = {
    object_id: "id",
    object_number: "number",
    object_name: "name",
    title: "title",
    link_resource: "link_resource",
    is_highlight: "is_highlight",
    culture: "culture",
    period: "period",
    dynasty: "dynasty",
    reign: "reign",
    object_date: "date",
    object_begin_date: "begin_date",
    object_end_date: "end_date",
    artist_role: "artist_role",
    artist_prefix: "artist_prefix",
    credit_line: "credit_line",
    geography_type: "geography_type",
    city: "city",
    state: "state",
    county: "county",
    country: "country",
    region: "region",
    subregion: "subregion",
    locale: "locale",
    locus: "locus",
    excavation: "excavation",
    river: "river",
    classification: "classification",
    medium: "medium",
    dimensions: "dimensions",
    rights_and_reproductions: "rights_and_reproductions",
    department: "department",
    portfolio: "portfolio",
  };

  const artistMap = {
    artist_display_name: "name",
    artist_suffix: "suffix",
    artist_nationality: "nationality",
    artist_begin_date: "begin_date",
    artist_end_date: "end_date",
  };

  const objects = [];
  const artists = [];

  fs.createReadStream("../raw_data/met_objects.csv")
    .pipe(csv())
    .on("data", (row) => {
      objects.push(mapRow(objectMap, row));
      artists.push(mapRow(artistMap, row));
    })
    .on("error", (err) => {
      console.error(err);
    });

  return { objects, artists };
};

export const parseMetImages = () => {
  const imagesMap = {
    original_image_url: "url",
    object_id: "object_id",
    public_caption: "public_caption",
    caption: "caption",
  };

  const images = [];

  fs.createReadStream("../raw_data/met_images.csv")
    .pipe(csv())
    .on("data", (row) => {
      objects.push(mapRow(imagesMap, row));
    })
    .on("error", (err) => {
      console.error(err);
    });

  return images;
};
