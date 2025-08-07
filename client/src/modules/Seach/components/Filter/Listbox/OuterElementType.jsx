import { AutocompleteListbox } from "@mui/joy";
import { forwardRef, useContext } from "react";
import { OuterElementContext } from "../../../contexts";

export const OuterElementType = forwardRef((props, ref) => {
  const outerProps = useContext(OuterElementContext);
  return (
    <AutocompleteListbox {...props} {...outerProps} component="div" ref={ref} />
  );
});
