import { useDispatch, useSelector } from 'react-redux';
import { selectSearchFilter, setFilter } from '../slices/appConfigSlice';

const useSearchFilter = () => {
    const dispatch = useDispatch();
    const searchFilter = useSelector(selectSearchFilter);

    const setSearchFilter = (text: string) => dispatch(setFilter(text));

    return {
        searchFilter,
        setSearchFilter,
    };
};

export default useSearchFilter;
