export const handleAllowedNumericalCharacters = (e:any) => {
  if (!e.key.match(`[0-9\-(Backspace)]`)) {
    e.preventDefault();
  }
};

export const preventImproperDashes = (e:any) => {
    if (e.target.value && e.data == "-")
        e.preventDefault();
}