import React from 'react';
import {CancelIcon} from "../SvgIcons";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import uniqid from "uniqid";
import {addFilter, removeAllFilters, removeFilter, setSelectedFilters} from "../../redux/slices/FilterSlice";

const SelectedFilter = (props) => {
    const {filterItems} = props
    const selectedFilters = useSelector(state => state.filter.selectedFilters)
    const dispatch = useDispatch()
    const router = useRouter()

    React.useEffect(() => {
        if (router.query.filterBy) {
            const filterList = filterItems.reduce((acc, el) => {
                el.filter_list.forEach(item => acc.push(item))
                return acc
            }, [])
            router.query.filterBy.split(',').forEach(filter => {
                if (filterList.find(el => el.value_back === filter) && !selectedFilters.find(el => el.value_back === filter)) {
                    dispatch(addFilter(filterList.find(el => el.value_back === filter)))
                }
            })
        }
    }, [router.query])

    const removeFilterClick = (item) => {
        let {filterBy} = router.query
        dispatch(removeFilter(item))
        router.query.filterBy = filterBy?.split(',').filter(el => !(el === item.value_back)).join()
        if (!router.query.filterBy.length) {
            delete router.query.filterBy
        }
        router.push({
            pathname: router.pathname,
            query: router.query
        })
    }

    const removeAllFiltersClick = () => {
        dispatch(removeAllFilters())
        delete router.query.filterBy
        router.push({
            pathname: router.pathname,
            query: router.query
        })
    }
    if (!selectedFilters.length) return
    return (
        <>
            <div className="filter__title">Ви вибрали</div>
            <div className="filter__selected">
                <ul className="filter__selected-list">
                    {selectedFilters && selectedFilters.map(el => (
                        <li className="filter__selected-item" key={uniqid()}>
                            <span>{el['value_' + router.locale]}</span>
                            <CancelIcon onClick={() => removeFilterClick(el)}/>
                        </li>
                    ))}
                </ul>
                <div className="filter__reset" onClick={removeAllFiltersClick}>Скинути все</div>
            </div>
        </>
    );
};

export default SelectedFilter;