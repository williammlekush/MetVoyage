import { Option, Select } from "@mui/joy";
import { useColorScheme } from '@mui/joy/styles';
import { useCallback, useEffect, useState } from "react";

function ThemePicker() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = useState(false);

    const handleChange = useCallback((event, newMode) => {
        setMode(newMode);
    }, [setMode]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Select
            value={mode}
            variant="plain"
            onChange={handleChange}
        >
            <Option value="system">System</Option>
            <Option value="light">Light</Option>
            <Option value="dark">Dark</Option>
        </Select>
    );
};

export default ThemePicker;