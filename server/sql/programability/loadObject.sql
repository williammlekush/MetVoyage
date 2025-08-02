CREATE PROCEDURE loadObject(IN objectId INT)
BEGIN
    SELECT objects.id,
        objects.number,
        objects.name,
        objects.title,
        objects.link_resource,
        objects.is_highlight,
        objects.credit_line,
        objects.culture,
        objects.period,
        objects.dynasty,
        objects.reign,
        objects.date,
        objects.begin_date,
        objects.end_date,
        objects.geography_type,
        objects.city,
        objects.state,
        objects.county,
        objects.country,
        objects.region,
        objects.subregion,
        objects.locale,
        objects.locus,
        objects.excavation,
        objects.river,
        objects.classification,
        objects.medium,
        objects.dimensions,
        objects.rights_and_reproductions,
        objects.department,
        objects.portfolio,
        images.id AS image_id,
        images.url,
        images.public_caption,
        images.caption
    FROM objects
    LEFT JOIN images
        ON objects.id = images.object_id
    WHERE objects.id = objectId;
END;