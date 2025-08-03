import Popper from "@mui/material/Popper";
import { forwardRef, useMemo } from "react";
import { FixedSizeList } from "react-window";
import Row from "./Row";
import { OuterElementType } from "./OuterElementType";
import { OuterElementContext } from "../../../contexts";

export const Listbox = forwardRef(function ListBox(props, ref) {
  const { children, anchorEl, open, modifiers, ...other } = props;
  const itemData = [];

  children[0].forEach((item) => {
    if (item) {
      itemData.push(item);
      itemData.push(...(item.children || []));
    }
  });

  const itemSize = useMemo(() => 40, []);

  return (
    <Popper
      ref={ref}
      anchorEl={anchorEl}
      open={open}
      modifiers={modifiers}
      sx={{ zIndex: 9000 }}
    >
      <OuterElementContext.Provider value={other}>
        <FixedSizeList
          itemData={itemData}
          height={itemSize * 8}
          width="100%"
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={itemSize}
          overscanCount={5}
          itemCount={itemData.length}
        >
          {Row}
        </FixedSizeList>
      </OuterElementContext.Provider>
    </Popper>
  );
});
