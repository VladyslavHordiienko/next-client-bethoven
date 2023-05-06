import React from 'react';
import uniqid from "uniqid";
import {useRouter} from "next/router";
import FilterCheckbox from "./FilterCheckbox";

const FilterItem = (props) => {
    const {products, filter} = props
    const router = useRouter()

    return (
        <div className="filter__field">
            <div className="filter__title">{filter.filter_name['title_' + router.locale]}</div>
            <div className="filter__inputs">
                {
                    filter.filter_list
                        .map(item => <FilterCheckbox
                            products={products}
                            item={item}
                            queryTitle={filter.filter_name.title_back}
                            key={uniqid()}
                        />)
                }
            </div>
        </div>
    );
};

export default FilterItem;