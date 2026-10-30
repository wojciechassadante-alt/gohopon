/**
 * Fotel pasażera z czujnikiem obecności (BLE / UWB) pod siedziskiem.
 * Zdjęcie z materiałów brandowych: E:\TK\hopon\materiały\siedzenie.png → public/seat-sensor.png
 */
const SEAT_IMAGE = '/seat-sensor.png'

export default function SeatSensor({ className = '' }) {
  return (
    <img
      src={SEAT_IMAGE}
      alt="Fotel pasażera z czujnikiem obecności montowanym pod siedziskiem"
      loading="lazy"
      className={`mx-auto h-auto w-full max-w-[12.5rem] sm:max-w-[14rem] ${className}`}
    />
  )
}
