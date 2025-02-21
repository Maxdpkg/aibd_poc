import { useEffect, useState } from "react";

interface Alert {
  type: string;
  time: string;
}

export default function AlertWebSocket() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws");

    socket.onmessage = (event) => {
      const newAlerts: Alert[] = JSON.parse(event.data);
      setAlerts((prevAlerts) => [...newAlerts, ...prevAlerts].slice(0, 5)); // Garde les 5 dernières alertes
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg h-48 overflow-y-auto">
      <h3 className="text-xl font-semibold mb-3">Alertes en Direct</h3>
      <ul className="space-y-2">
        {alerts.map((alert, index) => (
          <li key={index} className="p-2 bg-red-100 rounded-lg shadow">
            <span className="font-bold">{alert.time}</span> - {alert.type === "type1" ? "🚑 Mains levées" : "🛌 Allongé"}
          </li>
        ))}
      </ul>
    </div>
  );
}
