import React from 'react';
import {setSearchValue} from "../redux/slices/GeneralSlice";
import {SearchIcon} from "./SvgIcons";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";


const SearchInput = (props) => {
    const { searchValue } = useSelector((state) => state.general);
    const { t } = useTranslation('common');
    const dispatch = useDispatch();
    const router = useRouter();
    const onSearch = () => {
            router.push({
                pathname: '/search',
                query: `search_query=${searchValue}`,
            });
    };

    return (
        <div className="header__search">
            <input
                type="text"
                className="header__search-input"
                placeholder={t('Пошук товарів') + '...'}
                value={searchValue}
                onChange={(e) => {
                    dispatch(setSearchValue(e.target.value));
                }}
            />
            <button className="header__search-button" onClick={onSearch}>
                <SearchIcon/>
            </button>
        </div>
    );
};

export default SearchInput;