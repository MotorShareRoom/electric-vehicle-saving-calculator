import { useState, useEffect } from 'react';
import './style.css';

type SliderProps = {
  label: string;
  unit: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (val: number) => void;
};

// Función de formateo para los números
// que usa el formato de idioma "es-ES" para miles y decimales
const formatNumber = (num: number, decimalPlaces = 2) => {
  return new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(num);
};

function Slider({ label, unit, min, max, step = 1, value, onChange }: SliderProps) {
  const [bubblePos, setBubblePos] = useState(0);
  const [showMin, setShowMin] = useState(true);
  const [showMax, setShowMax] = useState(true);

  useEffect(() => {
    const percent = ((value - min) / (max - min)) * 100;
    setBubblePos(percent);
    setShowMin(percent > 10);
    setShowMax(percent < 90);
  }, [value, min, max]);

  const valueDisplay = Number.isInteger(step) ? formatNumber(value, 0) : formatNumber(value, 2);

  return (
    <div className="slider-block">
      <h2>{label}</h2>
      <div className="slider-wrapper">
        <div className="value-bubble" style={{ left: `${bubblePos}%` }}>
          {valueDisplay} {unit}
          <div className="bubble-arrow" />
        </div>
        <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} />
        <div className="slider-minmax">
          <span className="min-label" style={{ visibility: showMin ? 'visible' : 'hidden' }}>
            {formatNumber(min, 0)} {unit}
          </span>
          <span className="max-label" style={{ visibility: showMax ? 'visible' : 'hidden' }}>
            {formatNumber(max, 0)} {unit}
          </span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [value1, setValue1] = useState(50);
  const [value2_1, setValue2_1] = useState(1.50);
  const [value2_2, setValue2_2] = useState(0.10);
  const [value3_1, setValue3_1] = useState(25000);
  const [value3_2, setValue3_2] = useState(40000);
  const [value4_1, setValue4_1] = useState(6.5);
  const [value4_2, setValue4_2] = useState(13);
  const [value5_1, setValue5_1] = useState(0);
  const [value5_2, setValue5_2] = useState(0);
  const [value6_1, setValue6_1] = useState(40);
  const [value6_2, setValue6_2] = useState(40);
  const [value7_1, setValue7_1] = useState(300);
  const [value7_2, setValue7_2] = useState(200);
  const [value8_1, setValue8_1] = useState(400);
  const [value8_2, setValue8_2] = useState(200);
  const [value9_1, setValue9_1] = useState(0);
  const [value9_2, setValue9_2] = useState(0);
  const [value10_1, setValue10_1] = useState(0);
  const [value10_2, setValue10_2] = useState(1100);
  const [value11_1, setValue11_1] = useState(0);
  const [value11_2, setValue11_2] = useState(7000);

  // Costes iniciales
  const totalValue1_1 = value3_1 + value5_1 + value10_1 - value11_1;
  const totalValue1_2 = value3_2 + value5_2 + value10_2 - value11_2;

  // Costes anuales
  const totalValue2_1 =
    ((value4_1 * value1) / 100) * (value2_1 * 365) + value6_1 + value7_1 + value8_1 + value9_1 * 12;
  const totalValue2_2 =
    ((value4_2 * value1) / 100) * (value2_2 * 365) + value6_2 + value7_2 + value8_2 + value9_2 * 12;

  const result1 = totalValue1_2 - totalValue1_1;
  const result2 = totalValue2_1 - totalValue2_2;
  const totalValue3_2 = result2 !== 0 ? result1 / result2 : Infinity;

  // MODIFICACIÓN: Mensaje para cuando el ahorro es inmediato o el resultado es infinito
  const amortizationMessage = totalValue3_2 < 0
    ? '¡Ahorro desde el primer día!'
    : isFinite(totalValue3_2)
      ? `${formatNumber(totalValue3_2, 2)} años`
      : '∞ años';


  return (
    <div className="app">
      <h1>Calculadora de ahorro de vehículo eléctrico</h1>
      <div className="layout">
        <div className="top-row">
          <Slider label="Recorrido medio diario (Km)" unit="Km" min={0} max={300} value={value1} onChange={setValue1} />
        </div>
        <div className="middle-row">
          <div className="column">
            <h2>Combustión</h2>
            <Slider label="Precio del combustible" unit="€/litro" min={0} max={2} step={0.01} value={value2_1} onChange={setValue2_1} />
            <Slider label="Precio del vehículo" unit="€" min={0} max={100000} value={value3_1} onChange={setValue3_1} />
            <Slider label="Consumo" unit="litros/100Km" min={0} max={20} step={0.1} value={value4_1} onChange={setValue4_1} />
            <Slider label="Impuesto de matriculación" unit="€" min={0} max={1000} value={value5_1} onChange={setValue5_1} />
            <Slider label="Impuesto de circulación" unit="€/año" min={0} max={500} value={value6_1} onChange={setValue6_1} />
            <Slider label="Mantenimiento anual" unit="€/año" min={0} max={1000} value={value7_1} onChange={setValue7_1} />
            <Slider label="Seguro anual" unit="€/año" min={0} max={1500} value={value8_1} onChange={setValue8_1} />
            <Slider label="Parquímetros" unit="€/mes" min={0} max={300} value={value9_1} onChange={setValue9_1} />
            <Slider label="Otro gasto único" unit="€" min={0} max={2000} value={value10_1} onChange={setValue10_1} />
            <Slider label="Descuentos" unit="€" min={0} max={15000} value={value11_1} onChange={setValue11_1} />
          </div>
          <div className="column">
            <h2>Eléctrico</h2>
            <Slider label="Precio de la electricidad" unit="€/kWh" min={0} max={0.4} step={0.001} value={value2_2} onChange={setValue2_2} />
            <Slider label="Precio del vehículo" unit="€" min={0} max={100000} value={value3_2} onChange={setValue3_2} />
            <Slider label="Consumo" unit="kWh/100Km" min={0} max={40} value={value4_2} onChange={setValue4_2} />
            <Slider label="Impuesto de matriculación" unit="€" min={0} max={1000} value={value5_2} onChange={setValue5_2} />
            <Slider label="Impuesto de circulación" unit="€/año" min={0} max={500} value={value6_2} onChange={setValue6_2} />
            <Slider label="Mantenimiento anual" unit="€/año" min={0} max={1000} value={value7_2} onChange={setValue7_2} />
            <Slider label="Seguro anual" unit="€/año" min={0} max={1500} value={value8_2} onChange={setValue8_2} />
            <Slider label="Parquímetros" unit="€/mes" min={0} max={300} value={value9_2} onChange={setValue9_2} />
            <Slider label="Punto de recarga + instalación" unit="€" min={0} max={2000} value={value10_2} onChange={setValue10_2} />
            <Slider label="MOVES III + descuentos" unit="€" min={0} max={15000} value={value11_2} onChange={setValue11_2} />
          </div>
          <div className="column results">
            <div className="results-main">
              <div className="block">
                <h2>Combustión</h2>
                <div className="row">
                  <div>
                    <div className="result-label">Costes iniciales</div>
                    <div className="result-value">{formatNumber(totalValue1_1, 2)} €</div>
                  </div>
                  <div>
                    <div className="result-label">Costes anuales</div>
                    <div className="result-value">{formatNumber(totalValue2_1, 2)} €</div>
                  </div>
                </div>
              </div>
              <div className="block">
                <h2>Eléctrico</h2>
                <div className="row">
                  <div>
                    <div className="result-label">Costes iniciales</div>
                    <div className="result-value">{formatNumber(totalValue1_2, 2)} €</div>
                  </div>
                  <div>
                    <div className="result-label">Costes anuales</div>
                    <div className="result-value">{formatNumber(totalValue2_2, 2)} €</div>
                  </div>
                </div>
              </div>
              <div className="block final">
                <h2>Comparativa</h2>
                <div className="row">
                  <div>
                    <div className="result-label">Ahorro inicial</div>
                    <div className="result-value">{formatNumber(result1, 2)} €</div>
                  </div>
                  <div>
                    <div className="result-label">Ahorro anual</div>
                    <div className="result-value">{formatNumber(result2, 2)} €</div>
                  </div>
                  <div>
                    <div className="result-label">Años para amortizar</div>
                    {/* MODIFICACIÓN: Mostrar un mensaje diferente si el valor es negativo */}
                    <div className="result-value">
                      {amortizationMessage}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;