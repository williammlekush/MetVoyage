import fs from "fs";
import csv from "csv-parser";

//#region CSV to SQL maps
export const objectMap = {
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

export const artistMap = {
  artist_display_name: "name",
  artist_suffix: "suffix",
  artist_nationality: "nationality",
  artist_begin_date: "begin_date",
  artist_end_date: "end_date",
};

export const createdMap = {
  artist_role: "artist_role",
  artist_prefix: "artist_prefix",
  object_id: "object_id",
};

export const imagesMap = {
  original_image_url: "url",
  object_id: "object_id",
  public_caption: "public_caption",
  caption: "caption",
};
//#endregion

//#region helpers
const mapRow = (map, row) => {
  const mapped = {};

  for (const [rowKey, key] of Object.entries(map)) {
    mapped[key] = row[rowKey];
  }

  return mapped;
};

const mapSplitRow = (splitRow, map, index) => {
  return Object.fromEntries(
    Object.entries(map).map(([rowKey, key])=> [key, getSplitValue(splitRow, rowKey, index)])
  );
}

const getSplitValue = (splitRow, rowKey, index) => {
  return splitRow[rowKey] && splitRow[rowKey].length === 1
    ? splitRow[rowKey][0] // Return the single value if only one index exists
    : splitRow[rowKey] && splitRow[rowKey][index] !== undefined
    ? splitRow[rowKey][index] // Return the value at the specified index
    : ""; // Default to an empty string
}
//#endregion

//#region parsers
export const parseMetObjects = () =>
  new Promise((resolve, reject) => {
    const objects = [];
    const artists = [];
    const createdArray = [];

    const artistDictionary = new Map(); //used for deduplication
    let artistIdCounter = 1;

    fs.createReadStream("../raw_data/met_objects.csv")
      .pipe(csv())
      .on("data", (row) => {
        row.is_highlight = row.is_highlight === "true" ? 1 : 0;

        // For classifications delimited by | or -, just take the first part
        if (row.classification) {
          row.classification = String(row.classification).split(/[|\-]/)[0];
        }
        objects.push(mapRow(objectMap, row));

        const splitRow = {};

        for (const [rowKey, value] of Object.entries(row)) {
          splitRow[rowKey] = String(value).includes("|")
            ? String(value).split("|")
            : [value];
        }
        
        // Iterate over the split values and map each one
        const rowCount = Math.max(...Object.values(splitRow).map((arr) => arr.length));

        for (let i = 0; i < rowCount; i++) {
          const artist = mapSplitRow(splitRow, artistMap, i);
          let artistId = 0;

          const artistKey = JSON.stringify(artist);
          if (!artistDictionary.has(artistKey)) {
            artistDictionary.set(artistKey, artistIdCounter);
            artistIdCounter++;
            artists.push(artist);
          }
          artistId = artistDictionary.get(artistKey);

          const created = mapSplitRow(splitRow, createdMap, i);
          //Don't trust the csv to not have duplicates
          if (!createdArray.some((c) => c.artist_id === artistId && c.object_id === created.object_id)) {
            createdArray.push({artist_id: artistId, ...created});
          }
        }
      })
      .on("end", () => resolve({ objects, artists, created: createdArray }))
      .on("error", (err) => reject(err));
  });

export const parseMetImages = () =>
  new Promise((resolve, reject) => {
    const images = [];
    fs.createReadStream("../raw_data/met_images.csv")
      .pipe(csv())
      .on("data", (row) => {
        if (row.is_oasc === true || row.is_oasc === "true") {
          images.push(mapRow(imagesMap, row));
        }
      })
      .on("end", () => resolve(images))
      .on("error", (err) => reject(err));
  });
//#endregion
