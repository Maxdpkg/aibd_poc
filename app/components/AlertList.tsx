export default function AlertList({ alerts }: { alerts: { id: number; message: string; time: string }[] }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg h-48 overflow-y-auto">
      <h3 className="text-xl font-semibold mb-3">Alertes Récentes</h3>
      <ul className="space-y-2">
        {alerts.map((alert) => (
          <li key={alert.id} className="p-2 bg-red-100 rounded-lg shadow">
            <span className="font-bold">{alert.time} :</span> {alert.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
