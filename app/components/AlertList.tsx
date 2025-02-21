export default function AlertList({
  alerts,
}: {
  alerts: { id: number; message: string; time: string; type: string }[];
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg h-48 overflow-y-auto">
      <h3 className="text-xl font-semibold mb-3">Alertes Détection</h3>
      <ul className="space-y-2">
        {alerts.map((alert, index) => (
          <li key={index} className="p-3 bg-red-100 rounded-lg shadow">
            <p><span className="font-bold">{alert.time}</span> - {alert.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
