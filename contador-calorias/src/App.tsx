import { Form } from "./components/Form";

function App() {
  const categories = [
    { id: 1, name: 'Comida'},
    { id: 2, name: 'Ejercicio'}
  ]

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de calorías
          </h1>
        </div>
      </header>
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form />
        </div>
      </section>
    </>
  );
}

export default App;
