import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [pokemon, setPokemon] = useState('pikachu');
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState('')

  const getPokemon = async ()=>{
    let array = [];
    try{
      const URL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(URL);
      console.log(res.data);
      array.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(array);
    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    getPokemon();
  },[]);
  const handleSubmit = (e)=>{
    e.preventDefault();
    getPokemon();
  }
  const handleChange = (e)=>{
    setPokemon(e.target.value.toLowerCase());
  }

  return (
    <div className="App">
     <form onSubmit={handleSubmit}>
       <label>
         <input className='mb-3 mt-3' type='text' placeholder='Enter Pokemon name.' onChange={handleChange}/>
       </label>
     </form>
     {pokemonData.map((data)=>{
       return(
    <div className="container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto bg-danger card">
      <figure className="figure bg-dark mt-3 ">
      <img src={data.sprites.front_default} className="figure-img img-fluid rounded h-60 w-50" alt="placeholdeer"></img>
      <figcaption className="figure-caption fs-3 text-white">{data.name}</figcaption>
      </figure>
      </div>
    </div>
    <div className="row ">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto bg-danger card">
      <table class="table table-hover text-nowrap bg-secondary mt-3">
      <tbody>
    <tr className='border border-dark'>
      <th scope="row">Type</th>
      <td>{pokemonType}</td>
    </tr>
    <tr className='border border-dark'>
      <th scope="row">Height</th>
      <td>{data.height / 10 + ' m'}</td>
    </tr>
    <tr className='border border-dark'>
      <th scope="row">Weight</th>
      <td>{data.weight / 10 + ' kg'}</td>
    </tr>
  </tbody>
      </table>
      </div>
    </div>
  </div>)
     })}
    </div>
  );
}

export default App;
