import React, {useEffect, useState} from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Recipe from "./Recipe";
import "./App.css";

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('chicken');

    const APP_ID = "40aa1b36";
    const APP_KEY = "b57e8c6ed7a099ab8daf9279dfe7dd25";
    const exampleReq = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&ingr=0-100&health=alcohol-free`;

    useEffect(() => {
        console.log("Effect has been used!");
        getReceipts();
    }, [query]);
    const getReceipts = async () => {
        const response = await fetch(exampleReq);
        const data = await response.json();
        setRecipes(data.hits);
        console.log(data);
    };

    const updateSearch = e => {
        setSearch(e.target.value);
        console.log("updateSearch is called!");
    }

    const getSearch = e => {
        // to stop page refreshes
        e.preventDefault();
        setQuery(search);
        console.log("getSearch is called!")
    }

    return (
        <div className="App">
            <form onSubmit={getSearch} className="search-form">
                <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
                <button className="search-button" type="submit">
                    {"submit"}
                </button>
            </form>
            <div className="recipes">
                {recipes.map((r) => {
                    const recipe = r.recipe;
                    return (
                        <Recipe
                            key={recipe.label + recipe.calories}
                            title={recipe.label}
                            calories={recipe.calories}
                            image={recipe.image}
                            ingredients={recipe.ingredients}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default App;
