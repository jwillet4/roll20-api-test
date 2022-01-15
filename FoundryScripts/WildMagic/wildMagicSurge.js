fetch('https://5e.tools/data/generated/gendata-tables.json')
    .then(response => response.json())
    .then(data => rollWildSurge(data));

function rollWildSurge(data) {
    const wildMagicTable = data.table.find(table => table.caption === "Wild Magic Surge");
    const roll = getD100Code();
    const effect = wildMagicTable.rows.find(row => row[0].includes(roll));
    chatMessage(`
        <h2>Wild Magic Surge</h2>
        <h4>Roll: ${roll} | Range: ${effect[0]}</h4>
        <p>${effect[1].replace(/{@[a-z]+\s/gm, '').replace(/(\|[a-z=\|]*)*}/gm, '')}</p>
    `);
}

const getD100Code = () => `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;

function chatMessage(message) {
    ChatMessage.create({
        user: game.user._id,
        speaker: ChatMessage.getSpeaker({ token: actor }),
        content: message
    });
}