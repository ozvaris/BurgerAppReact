import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    // const transformedIngredients0 = Object.keys(props.ingredients)
    // .map(igKey => {
    //     return[...Array(3)]

    // });

    // const transformedIngredients1 = Object.keys(props.ingredients)
    // .map(igKey => {
    //     return[...Array(props.ingredients[igKey])];

    // });

    // const transformedIngredients2 = Object.keys(props.ingredients)
    // .map(igKey => {
    //     return[...Array(props.ingredients[igKey])].map((_, i) =>{
    //        return <div  key={igKey +1} type={igKey} />;
    //     });

    // });

    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return[...Array(props.ingredients[igKey])].map((_, i) =>{
           return <BurgerIngredient  key={igKey +i} type={igKey} />;
        });

    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);

    if(transformedIngredients.length === 0)
    {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    //console.log(transformedIngredients0);
    //console.log(props.ingredients);
    //console.log(Object.keys(props.ingredients));
    //console.log(transformedIngredients1);
    //console.log(transformedIngredients2);
    //console.log(transformedIngredients);

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>

        </div>
    );
}

export default burger;