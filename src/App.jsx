import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("pikachu");
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function getPokemon() {
    setLoading(true);
    try {
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      let pokemonData = await res.json();
      setData(pokemonData);
    } catch (err) {
      setData(false);
      setError(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    getPokemon();
    console.log(data);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-cyan-300 to-blue-600">
      <div className="bg-white text-center rounded-3xl border shadow-lg p-10 max-w-xs">
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="p-3 border-solid border-2 border-blue-500 rounded-md"
            placeholder="Search by name"
          />
          <button className="bg-blue-500 px-3 mt-5 text-lg rounded text-gray-100 ">
            search
          </button>
        </form>
        {error ? (
          <p className="p-5">No data was found!!</p>
        ) : (
          <>
            {loading ? (
              <div>
                <p className="my-5">Loading...</p>
              </div>
            ) : (
              <>
                <img
                  className="my-5 w-50 h-50 rounded-xl shadow-lg mx-auto"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
                  alt={data.name}
                />
                <h1 className="text-lg text-gray-900">{data.name}</h1>
                <h3 className="mt-1 text-md text-gray-700">
                  weight : {data.weight}
                </h3>
                {/* <button type="button" class="bg-indigo-500 ..." disabled>
                  <svg
                    class="animate-spin h-5 w-5 mr-3 ..."
                    viewBox="0 0 24 24"
                  ></svg>
                  Loading...
                </button> */}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
