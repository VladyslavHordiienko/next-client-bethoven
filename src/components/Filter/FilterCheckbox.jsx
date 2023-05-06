import React from 'react';
import {useRouter} from 'next/router';
import {setCurrentPage} from '../../redux/slices/GeneralSlice';
import {useDispatch, useSelector} from 'react-redux';
import {removeDouble, removeFilter, setDouble} from '../../redux/slices/FilterSlice';

import classNames from "classnames";

const FilterCheckbox = (props) => {
    const {products, item, queryTitle} = props;

    const [checked, setChecked] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)
    const double = useSelector(state => state.filter.double)

    const router = useRouter();
    const dispatch = useDispatch();
    const {query} = router;

    let {filterBy} = router.query;
    const info = products
        .map(el => el.info)
        .reduce((acc, el) => {
            acc = [...acc, ...el]
            return acc
        }, [])

    React.useEffect(() => {
        if (filterBy) {
            filterBy.split(',').find(el => el === item.value_back) ? setChecked(true) : setChecked(false)

            if (
                //проверяю если значение чекбокса НЕТ среди инфо текущих продуктов
                !info.find(el => el.value_back === item.value_back)
                &&
                // проверяю если среди фильтров НЕТ  хотя бы одного совпадения по productAttrId
                !filterBy.split(',').some(el => {
                    return info.find(info => info.value_back === el)?.productAttrId === item.productAttrId
                })
            ) {
                setDisabled(true)
            } else {
                setDisabled(false)
            }
            return
        }
        return setChecked(false)
    }, [router])

    const onChangeFilter = (e, item) => {

        if (e.target.checked) {
            if(filterBy?.split(',').find(el => info.find(info => info.value_back ===el )?.productAttrId === item.productAttrId)){
                dispatch(setDouble(item))
            }
            if (filterBy) {
                query.filterBy = `${filterBy},${item.value_back}`;
            } else {
                query.filterBy = item.value_back;
            }
        } else {
            if(double?.productAttrId === item.productAttrId){
                dispatch(removeDouble(item))
            }
            dispatch(removeFilter(item));
            query.filterBy = filterBy
                .split(',')
                .filter((el) => !(el === item.value_back))
                .join();
        }

        dispatch(setCurrentPage(1));
        delete router.query.page;
        router.push({
            pathname: router.pathname,
            query: query
        }, undefined, {scroll: false});
    };

    return (
        <label htmlFor={queryTitle + item.value_back} className={classNames({'--disabled': disabled && !checked})}>
            <input
                className="checkbox"
                type="checkbox"
                id={queryTitle + item.value_back}
                checked={checked}
                onChange={(e) => onChangeFilter(e, item)}
            />
            <span>{item['value_' + router.locale]}</span>
        </label>
    );
};

export default React.memo(FilterCheckbox);
