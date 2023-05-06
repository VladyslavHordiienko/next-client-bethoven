export const slugCreator = (word) => {
    let converter = {
        'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
        'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
        'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
        'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
        'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
        'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
        'э': 'e',    'ю': 'yu',   'я': 'ya'
    };

    word = word.toLowerCase();

    let answer = '';
    for (var i = 0; i < word.length; ++i ) {
        if (converter[word[i]] == undefined){
            answer += word[i];
        } else {
            answer += converter[word[i]];
        }
    }

    answer = answer.replace(/[^-0-9a-z]/g, '-');
    answer = answer.replace(/[-]+/g, '-');
    answer = answer.replace(/^\-|-$/g, '');
    return answer;
}

export const findItem = (array, id) => {
    return array.find(item => item.product.id === id)
}

export const pathnameWithoutQuery = (router) => router.asPath.split('?')[0]
export const paginationQueryCreator = (n) =>  n === 1 ? '' : `&page=${n}`

// USE FOR CREATE PERCENT IN POPULAR PRODUCTS, CATEGORY GRID,SINGLE PRODUCT PAGE
export const calcPercent = (old,current) => Math.round(100 - (current * 100 / old))

//USE THIS IN POPULAR PRODUCTS AND IN CATEGORY GRID
export const makeInfoTable = (attrArray,product, router) => {
    let infoTitle = attrArray
        .filter(attr => JSON.parse(attr.category_list)?.includes(product.categoryId))
        .filter(attr => attr.isFilter)
    let info = product.info
        .filter(i => infoTitle.find(el => el.id === i.productAttrId))
        .map(el => (
            {
                title: infoTitle.find(attr => attr.id === el.productAttrId)['title_' + router.locale],
                value: el['value_' + router.locale]
            }
        ))

    return info
}