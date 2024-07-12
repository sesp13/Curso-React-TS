import { MenuItemComponent } from './components/MenuItemComponent';
import { OrderContentsComponent } from './components/OrderContentsComponent';
import { OrderTotals } from './components/OrderTotals';
import { TipPercentageForm } from './components/TipPercentageForm';
import { menuItems } from './data/db';
import { useOrder } from './hooks/useOrder';

function App() {
  const { addItem, removeItem, order } = useOrder();

  return (
    <>
      <header className="bg-teal-400 py-5">
        <h1 className="text-center text-4xl font-black">
          Calculadora de Propinas y Consumo
        </h1>
      </header>

      <main className="max-w-7xl mx-auto py-20 grid md:grid-cols-2">
        <div className="p-5">
          <h2 className="text-4xl font-black">Menú</h2>
          <div className="space-y-3 mt-10">
            {menuItems.map((item) => (
              <MenuItemComponent key={item.id} item={item} addItem={addItem} />
            ))}
          </div>
        </div>
        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
          <OrderContentsComponent order={order} removeItem={removeItem} />
          <TipPercentageForm />
          <OrderTotals order={order}/>
        </div>
      </main>
    </>
  );
}

export default App;
