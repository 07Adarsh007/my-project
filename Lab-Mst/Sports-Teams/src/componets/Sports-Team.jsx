import React, { useState } from "react";

const initialPlayers = [
  { id: 1, name: "Messi", role: "Captain" },
  { id: 2, name: "David De gae", role: "Goalkeeper" },
  { id: 3, name: "Ramos", role: "Defender" },
  { id: 4, name: "Ronaldo", role: "Forward" },
];

function SportsTeam() {
  const [players, setPlayers] = useState(initialPlayers);
  const [search, setSearch] = useState("");
  const [newPlayer, setNewPlayer] = useState({ name: "", role: "" });

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddPlayer = (e) => {
    e.preventDefault();
    if (!newPlayer.name || !newPlayer.role) return;
    setPlayers([
      ...players,
      {
        id: players.length + 1,
        name: newPlayer.name,
        role: newPlayer.role,
      },
    ]);
    setNewPlayer({ name: "", role: "" });
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Sports Team Players</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", marginBottom: 10, padding: 5 }}
      />
      <ul>
        {filteredPlayers.map((player) => (
          <li key={player.id}>
            <strong>{player.name}</strong> - {player.role}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddPlayer} style={{ marginTop: 20 }}>
        <input
          type="text"
          placeholder="Player Name"
          value={newPlayer.name}
          onChange={(e) =>
            setNewPlayer({ ...newPlayer, name: e.target.value })
          }
          style={{ width: "48%", marginRight: "4%", padding: 5 }}
        />
        <input
          type="text"
          placeholder="Role"
          value={newPlayer.role}
          onChange={(e) =>
            setNewPlayer({ ...newPlayer, role: e.target.value })
          }
          style={{ width: "48%", padding: 5 }}
        />
        <button type="submit" style={{ width: "100%", marginTop: 10 }}>
          Add Player
        </button>
      </form>
    </div>
  );
}

export default SportsTeam;