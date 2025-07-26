import MetadataItem from '../Shared/MetadataItem.jsx';
import {Tab, TabList, TabPanel, Tabs} from '@mui/joy';

function ArtDetails({ art, artist }) {

    const artDetails = [
        {label: "Title", value: art.title},
        {label: "Date", value: art.date},
        {label: "Medium", value: art.medium},
        {label: "Dimensions", value: art.dimensions},
        {label: "Classification", value: art.classification},
        {label: "Credit Line", value: art.credit_line},
        {label: "Object Number", value: art.number},
    ]

    const artistDetails = [
        {label: "Name", value: artist.name},
        {label: "Nationality", value: artist.nationality},
        {label: "Birth Year", value: artist.begin_date},
        {label: "Death Year", value: artist.end_date},
    ]

    const artOrigin = [
        {label: "Country", value: art.country},
        {label: "Region", value: art.region},
        {label: "Period", value: art.period},
        {label: "Dynasty", value: art.dynasty},
        {label: "Reign", value: art.reign},
        {label: "Culture", value: art.culture},
        {label: "Locale", value: art.locale},
    ]

    return (
        <Tabs orientation="vertical" defaultValue={0}>
            <TabList>
                <Tab>
                    Description
                </Tab>
                <Tab>
                    Artist
                </Tab>
                <Tab>
                    Origin
                </Tab>
            </TabList>
            <TabPanel value={0}>
                {artDetails.map((item, index) => (
                    <MetadataItem key={index} label={item.label} value={item.value} />
                ))}
            </TabPanel>
            <TabPanel value={1}>
                {artistDetails.map((item, index) => (
                    <MetadataItem key={index} label={item.label} value={item.value} />
                ))}
            </TabPanel>
            <TabPanel value={2}>
                {artOrigin.map((item, index) => (
                    <MetadataItem key={index} label={item.label} value={item.value} />
                ))}
            </TabPanel>
        </Tabs>
    );
}

export default ArtDetails;