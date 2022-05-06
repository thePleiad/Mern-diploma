import React, {useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

function Filters() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories

    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    return (
        <div className="filter_menu">
            <div className="row">
                <span>Фільтр: </span>
                <select name="category" value={category} onChange={handleCategory} >
                    <option value=''>Усі Товари</option>
                    {
                        categories.map(category => (
                            <option value={"category=" + category._id} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input type="text" value={search} placeholder="Пошук..."
            onChange={e => setSearch(e.target.value.toLowerCase())} />

            <div className="row sort">
                <span>Сортувати по: </span>
                <select value={sort} onChange={e => setSort(e.target.value)} >
                    <option value=''>Новіші</option>
                    <option value='sort=oldest'>Старіші</option>
                    <option value='sort=-sold'>Бестселлери</option>
                    <option value='sort=-price'>Ціна: спершу дорожчі</option>
                    <option value='sort=price'>Ціна: спершу дешевші</option>
                </select>
            </div>
        </div>
    )
}

export default Filters
