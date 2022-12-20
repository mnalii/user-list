import SearchIcon from '@mui/icons-material/Search';

import { AutoFocusTextField } from './AutoFocusTextField';
import { IconContainer } from './IconContainer';
import { SearchBarContainer } from './SearchbarContainer';
import { Searchbox } from './Searchbox';

type Props = {
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  setSearchOption: React.Dispatch<React.SetStateAction<string>>;
  value: string;
};

export default function SearchboxSelect({
  value,
  handleChange,
  setSearchOption,
}: Props) {
  return (
    <SearchBarContainer>
      <Searchbox>
        <IconContainer>
          <SearchIcon />
        </IconContainer>
        <AutoFocusTextField
          value={value}
          onChange={handleChange}
          setSearchOption={setSearchOption}
        />
      </Searchbox>
    </SearchBarContainer>
  );
}
